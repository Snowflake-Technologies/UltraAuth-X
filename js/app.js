
console.log("🚀 UltraAuth X Initialized");

/* ==========================================================
   LOCAL STORAGE KEYS
========================================================== */

const STORAGE = {
    USERS: "ultra_users",
    CURRENT_USER: "ultra_current_user",
    THEME: "ultra_theme",
    REMEMBER: "ultra_remember",
    LOGIN_HISTORY: "ultra_login_history"
};

/* ==========================================================
   ELEMENTS
========================================================== */

const views = document.querySelectorAll(".form-view");

const loginView = document.getElementById("loginView");
const registerView = document.getElementById("registerView");
const verifyView = document.getElementById("verifyView");

const forgotView = document.getElementById("forgotView");
const resetCodeView = document.getElementById("resetCodeView");
const newPasswordView = document.getElementById("newPasswordView");

const dashboard = document.getElementById("dashboard");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const verifyForm = document.getElementById("verifyForm");

const forgotForm = document.getElementById("forgotForm");
const resetCodeForm = document.getElementById("resetCodeForm");
const newPasswordForm = document.getElementById("newPasswordForm");

const themeToggle = document.getElementById("themeToggle");

const passwordFields = document.querySelectorAll(
    ".password-toggle"
);

/* ==========================================================
   GLOBAL STATE
========================================================== */

let pendingVerificationUser = null;
let pendingResetEmail = null;

let verificationCode = null;
let resetCode = null;

let loginAttempts = 0;
let lockUntil = null;

/* ==========================================================
   HELPERS
========================================================== */

function getUsers() {
    return JSON.parse(
        localStorage.getItem(STORAGE.USERS)
    ) || [];
}

function saveUsers(users) {
    localStorage.setItem(
        STORAGE.USERS,
        JSON.stringify(users)
    );
}

function getCurrentUser() {
    return JSON.parse(
        localStorage.getItem(STORAGE.CURRENT_USER)
    );
}

function setCurrentUser(user) {
    localStorage.setItem(
        STORAGE.CURRENT_USER,
        JSON.stringify(user)
    );
}

function generateCode() {
    return Math.floor(
        1000 + Math.random() * 9000
    ).toString();
}

function showView(view) {

    views.forEach(v => {
        v.classList.remove("active");
    });

    dashboard.classList.remove("active");

    view.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

function hashPassword(password) {

    return btoa(
        password.split("")
            .reverse()
            .join("")
    );

}

/* ==========================================================
   TOAST SYSTEM
========================================================== */

function toast(message, type = "info") {

    const container =
        document.querySelector(".toast-container");

    const el = document.createElement("div");

    el.className = "toast";

    if (type === "success") {
        message = "🎉 " + message;
    }

    if (type === "error") {
        message = "⚠️ " + message;
    }

    el.innerText = message;

    container.appendChild(el);

    setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "translateY(-20px)";
    }, 2500);

    setTimeout(() => {
        el.remove();
    }, 3000);

}

/* ==========================================================
   THEME SYSTEM
========================================================== */

function loadTheme() {

    const theme =
        localStorage.getItem(STORAGE.THEME);

    if (theme === "dark") {

        document.body.classList.add("dark");

        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';

    }

}

loadTheme();

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        STORAGE.THEME,
        dark ? "dark" : "light"
    );

    themeToggle.innerHTML =
        dark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

});

/* ==========================================================
   PASSWORD TOGGLE
========================================================== */

passwordFields.forEach(icon => {

    icon.addEventListener("click", () => {

        const input =
            icon.parentElement.querySelector("input");

        if (!input) return;

        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {

            input.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    });

});

/* ==========================================================
   PASSWORD STRENGTH
========================================================== */

const regPassword =
    document.getElementById("regPassword");

const strengthFill =
    document.querySelector(".strength-fill");

const strengthText =
    document.querySelector(".strength-text");

if (regPassword) {

    regPassword.addEventListener("input", () => {

        const value = regPassword.value;

        let score = 0;

        if (value.length >= 8) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        const width = score * 25;

        strengthFill.style.width =
            width + "%";

        if (score <= 1) {

            strengthFill.style.background = "#ef4444";
            strengthText.innerText = "Weak";

        } else if (score <= 2) {

            strengthFill.style.background = "#f59e0b";
            strengthText.innerText = "Medium";

        } else {

            strengthFill.style.background = "#22c55e";
            strengthText.innerText = "Strong";

        }

    });

}

/* ==========================================================
   REGISTER
========================================================== */

registerForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    const username =
        document.getElementById("regUsername").value.trim();

    const email =
        document.getElementById("regEmail").value.trim();

    const password =
        document.getElementById("regPassword").value;

    const confirm =
        document.getElementById("confirmPassword").value;

    if (password !== confirm) {

        toast("Passwords do not match", "error");
        return;

    }

    const users = getUsers();

    if (users.find(u => u.email === email)) {

        toast("Email already registered", "error");
        return;

    }

    verificationCode =
        generateCode();

    console.log(
        "📧 Verification Code:",
        verificationCode
    );

    pendingVerificationUser = {
        username,
        email,
        password: hashPassword(password),
        verified: false,
        created: new Date().toISOString()
    };

    toast(
        `Verification code: ${verificationCode}`,
        "success"
    );

    showView(verifyView);

});

/* ==========================================================
   VERIFY EMAIL
========================================================== */

verifyForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    const code =
        document.getElementById("verifyCode").value;

    if (code !== verificationCode) {

        toast("Incorrect code", "error");
        return;

    }

    pendingVerificationUser.verified = true;

    const users = getUsers();

    users.push(
        pendingVerificationUser
    );

    saveUsers(users);

    confettiExplosion();

    toast(
        "Account verified successfully!",
        "success"
    );

    setTimeout(() => {

        showView(loginView);

    }, 1500);

});

/* ==========================================================
   LOGIN
========================================================== */

loginForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    if (lockUntil && Date.now() < lockUntil) {

        toast(
            "Too many attempts. Wait 30 seconds.",
            "error"
        );

        return;
    }

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const users = getUsers();

    const user = users.find(
        u =>
            u.email === email &&
            u.password === hashPassword(password)
    );

    if (!user) {

        loginAttempts++;

        if (loginAttempts >= 5) {

            lockUntil =
                Date.now() + 30000;

            toast(
                "Rate limit activated",
                "error"
            );
        }

        toast("Invalid credentials", "error");

        return;
    }

    loginAttempts = 0;

    user.lastLogin =
        new Date().toLocaleString();

    setCurrentUser(user);

    saveLoginHistory(user.email);

    rememberMe(email);

    loadDashboard();

    toast(
        "Welcome back!",
        "success"
    );

});

/* ==========================================================
   DASHBOARD
========================================================== */

function loadDashboard() {

    const user =
        getCurrentUser();

    if (!user) return;

    document
        .getElementById("dashboardName")
        .innerText =
        `Welcome ${user.username} 👋`;

    document
        .getElementById("dashboardEmail")
        .innerText =
        user.email;

    views.forEach(v =>
        v.classList.remove("active")
    );

    dashboard.classList.add("active");

}

/* ==========================================================
   LOGOUT
========================================================== */

document
    .getElementById("logoutBtn")
    ?.addEventListener("click", () => {

        dashboard.classList.remove("active");

        localStorage.removeItem(
            STORAGE.CURRENT_USER
        );

        showView(loginView);

        toast("Logged out", "success");

    });

/* ==========================================================
   REMEMBER ME
========================================================== */

function rememberMe(email) {

    const remember =
        document.getElementById("rememberMe");

    if (!remember) return;

    if (remember.checked) {

        localStorage.setItem(
            STORAGE.REMEMBER,
            email
        );

    } else {

        localStorage.removeItem(
            STORAGE.REMEMBER
        );

    }

}

(function () {

    const saved =
        localStorage.getItem(
            STORAGE.REMEMBER
        );

    if (saved) {

        const input =
            document.getElementById(
                "loginEmail"
            );

        if (input) {
            input.value = saved;
        }

    }

})();

/* ==========================================================
   LOGIN HISTORY
========================================================== */

function saveLoginHistory(email) {

    let history =
        JSON.parse(
            localStorage.getItem(
                STORAGE.LOGIN_HISTORY
            )
        ) || [];

    history.push({
        email,
        time: new Date().toLocaleString()
    });

    localStorage.setItem(
        STORAGE.LOGIN_HISTORY,
        JSON.stringify(history)
    );

}

/* ==========================================================
   FORGOT PASSWORD
========================================================== */

document
    .getElementById("forgotLink")
    ?.addEventListener("click", (e) => {

        e.preventDefault();

        showView(forgotView);

    });

forgotForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    const email =
        document.getElementById(
            "forgotEmail"
        ).value;

    const users = getUsers();

    const user =
        users.find(
            u => u.email === email
        );

    if (!user) {

        toast("Email not found", "error");
        return;
    }

    pendingResetEmail = email;

    resetCode =
        generateCode();

    console.log(
        "🔑 Reset Code:",
        resetCode
    );

    toast(
        `Reset code: ${resetCode}`,
        "success"
    );

    showView(resetCodeView);

});

resetCodeForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    const code =
        document.getElementById(
            "resetCode"
        ).value;

    if (code !== resetCode) {

        toast(
            "Invalid reset code",
            "error"
        );

        return;
    }

    showView(newPasswordView);

});

newPasswordForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    const newPass =
        document.getElementById(
            "newPassword"
        ).value;

    const users = getUsers();

    const user =
        users.find(
            u => u.email === pendingResetEmail
        );

    user.password =
        hashPassword(newPass);

    saveUsers(users);

    toast(
        "Password updated",
        "success"
    );

    showView(loginView);

});

/* ==========================================================
   SOCIAL LOGIN
========================================================== */

document
    .querySelectorAll(".social-btn")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            const provider =
                btn.dataset.provider;

            btn.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {

                btn.innerHTML =
                    provider;

                toast(
                    `Logged in with ${provider}`,
                    "success"
                );

            }, 1500);

        });

    });

/* ==========================================================
   REAL-TIME VALIDATION
========================================================== */

document
    .querySelectorAll("input[type='email']")
    .forEach(input => {

        input.addEventListener("input", () => {

            const valid =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(input.value);

            const icon =
                input.parentElement
                    .querySelector(".validation-icon");

            if (icon) {

                icon.style.opacity =
                    valid ? 1 : 0;

            }

        });

    });

/* ==========================================================
   CONFETTI
========================================================== */

function confettiExplosion() {

    for (let i = 0; i < 120; i++) {

        const confetti =
            document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-20px";

        confetti.style.width = "8px";
        confetti.style.height = "8px";

        confetti.style.background =
            `hsl(${Math.random() * 360},
        100%,50%)`;

        document.body.appendChild(
            confetti
        );

        confetti.animate([
            {
                transform:
                    "translateY(0) rotate(0deg)"
            },
            {
                transform:
                    `translateY(100vh)
             rotate(720deg)`
            }
        ], {
            duration:
                2500 + Math.random() * 2000
        });

        setTimeout(() => {
            confetti.remove();
        }, 4500);

    }

}

/* ==========================================================
   PARTICLES
========================================================== */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

for (let i = 0; i < 80; i++) {

    particles.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        r: Math.random() * 3 + 1,

        vx: (Math.random() - .5) * .8,
        vy: (Math.random() - .5) * .8

    });

}

let mouse = { x: 0, y: 0 };

window.addEventListener(
    "mousemove",
    e => {

        mouse.x = e.clientX;
        mouse.y = e.clientY;

    });

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;

        const dx =
            mouse.x - p.x;

        const dy =
            mouse.y - p.y;

        const dist =
            Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {

            p.x -= dx * .01;
            p.y -= dy * .01;

        }

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.r,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,255,255,.6)";

        ctx.fill();

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();

/* ==========================================================
   KEYBOARD SHORTCUTS
========================================================== */

document.addEventListener(
    "keydown",
    e => {

        if (e.key === "Escape") {

            showView(loginView);

        }

    });

/* ==========================================================
   SESSION TIMEOUT
========================================================== */

setTimeout(() => {

    if (getCurrentUser()) {

        toast(
            "⏰ Session expires soon"
        );

    }

}, 1000 * 60 * 20);

/* ==========================================================
   AUTO LOGIN
========================================================== */

if (getCurrentUser()) {

    loadDashboard();

}

console.log(
    "🔥 UltraAuth X Fully Loaded"
);
