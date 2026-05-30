# 🚀 UltraAuth X

<div align="center">

# ✨ UltraAuth X

### Next Generation Authentication Experience

A modern, glassmorphic authentication system built with pure HTML, CSS, and JavaScript.

Featuring beautiful gradients, dark mode, social login UI, password recovery, email verification, interactive particles, and a sleek user experience inspired by modern SaaS applications.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Friendly-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## 🌟 Overview

UltraAuth X is a complete frontend authentication system designed to demonstrate modern web development techniques and UI/UX design principles.

Built entirely with vanilla technologies, UltraAuth X provides a polished authentication experience without relying on frameworks or heavy dependencies.

Whether you're learning frontend development, building a portfolio, or looking for inspiration for your next project, UltraAuth X showcases how powerful pure HTML, CSS, and JavaScript can be.

---

# 📸 Screenshots

## ☀️ Light Mode Login

![Light Mode](screenshots/light-mode.png)

---

## 🌙 Dark Mode Login

![Dark Mode](screenshots/dark-mode.png)

---

## 🔑 Forgot Password Flow

![Forgot Password](screenshots/forgot-password.png)

---

# ✨ Features

## 🔐 Authentication

* User Registration
* User Login
* Email Verification (OTP System)
* Forgot Password Workflow
* Password Reset Functionality
* Remember Me Support
* Session Persistence
* Auto Login

---

## 🌐 Social Login UI

Beautiful animated login buttons for:

* Google
* GitHub
* Facebook
* Apple

Includes:

* Loading States
* Hover Animations
* Micro-interactions
* Toast Notifications

---

## 🎨 Modern UI/UX

* Glassmorphism Design
* Animated Gradient Backgrounds
* Floating Particle Effects
* Smooth Page Transitions
* Responsive Layout
* Modern SaaS Styling
* Interactive Buttons
* Custom Toast Notifications

---

## 🌙 Theme System

* Dark Mode
* Light Mode
* Theme Persistence
* Animated Theme Toggle
* Dynamic Gradient Backgrounds

---

## 🔒 Security Features

* Password Strength Meter
* Password Visibility Toggle
* Real-Time Validation
* Login Rate Limiting
* Session Timeout Warning
* Account Security Status

---

## ⚡ Dashboard Features

* User Welcome Screen
* Profile Information
* Security Overview
* Verification Status
* Account Statistics
* Quick Actions
* Logout Functionality

---

# 🛠 Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript
* LocalStorage API
* Font Awesome

No Frameworks.

No jQuery.

No Build Tools.

No Dependencies.

---

# 📁 Project Structure

```text
UltraAuth-X/
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
├── screenshots/
│   ├── light-mode.png
│   ├── dark-mode.png
│   └── forgot-password.png
│
├── .gitignore
├── LICENSE
├── README.md
└── index.html
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/Snowflake-Technologies/UltraAuth-X.git
```

## 2. Open Project

```bash
cd UltraAuth-X
```

Open:

```text
index.html
```

in your browser.

That's it.

No installation required.

---

# 🚀 Local Development

### VS Code Live Server

Install the **Live Server** extension.

Then:

```text
Right Click → index.html → Open with Live Server
```

---

### Python Server

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

---

### Node.js Server

```bash
npx serve .
```

---

# 🔧 Configuration

User data is stored in LocalStorage.

Stored values include:

```text
ultra_users
ultra_current_user
ultra_theme
ultra_remember
ultra_login_history
```

Reset everything:

```javascript
localStorage.clear();
```

---

# 📧 Verification Codes

Verification and password reset codes are generated locally.

Open:

```text
F12 → Console
```

Example:

```text
📧 Verification Code: 4821
🔑 Password Reset Code: 7319
```

---

# 🌐 Real OAuth Setup

The included social login buttons are UI demonstrations by default.

To enable real authentication with Google, GitHub, Facebook, or Apple, follow the steps below.

---

## GitHub OAuth

### Create OAuth App

Go to:

[https://github.com/settings/developers](https://github.com/settings/developers)

Click:

```text
New OAuth App
```

Example:

```text
Application Name:
UltraAuth X

Homepage URL:
http://localhost:3000

Callback URL:
http://localhost:3000/auth/github/callback
```

GitHub provides:

```text
Client ID
Client Secret
```

---

### OAuth URL

```javascript
const clientId = "YOUR_CLIENT_ID";

window.location.href =
`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`;
```

---

## Google OAuth

### Create Project

Go to:

[https://console.cloud.google.com](https://console.cloud.google.com)

Create:

```text
OAuth 2.0 Client ID
```

Enable:

```text
Google Identity Services
```

---

### Add Script

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

---

### Initialize

```javascript
google.accounts.id.initialize({
    client_id: "YOUR_CLIENT_ID",
    callback: handleCredentialResponse
});
```

---

## Facebook OAuth

Create application:

[https://developers.facebook.com](https://developers.facebook.com)

Add:

```text
Facebook Login
```

Obtain:

```text
App ID
App Secret
```

---

## Apple Sign In

Requires:

* Apple Developer Account
* Service ID
* Sign In With Apple Key

Portal:

[https://developer.apple.com](https://developer.apple.com)

---

# ⭐ Recommended OAuth Solution

Instead of manually implementing every provider, use:

### Supabase Auth

[https://supabase.com](https://supabase.com)

Example:

```javascript
await supabase.auth.signInWithOAuth({
    provider: 'github'
});
```

or

```javascript
await supabase.auth.signInWithOAuth({
    provider: 'google'
});
```

---

### Firebase Authentication

[https://firebase.google.com](https://firebase.google.com)

Supports:

* Google
* GitHub
* Facebook
* Apple

with minimal setup.

---

# 🚀 Deployment

Deploy instantly on:

* GitHub Pages
* Netlify
* Vercel
* Cloudflare Pages
* Firebase Hosting

No build process required.

---

## GitHub Pages

1. Push repository
2. Open Settings
3. Navigate to Pages
4. Select:

```text
Deploy from Branch
```

5. Choose:

```text
main
```

6. Save

Your site will be live in a few minutes.

---

# ⚠️ Production Notice

This project uses LocalStorage for demonstration purposes.

For production applications, implement:

* Backend Authentication
* Database Storage
* Password Hashing (bcrypt / Argon2)
* JWT Authentication
* CSRF Protection
* Rate Limiting
* OAuth Providers
* Email Services

---

# 🤝 Contributing

Contributions, ideas, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

# ⭐ Support

If you like this project:

⭐ Star the repository

🍴 Fork the repository

🚀 Share it with others

---

# 📜 License

Licensed under the MIT License.

See the LICENSE file for details.

---

<div align="center">

## 💜 UltraAuth X

### Authentication doesn't have to be boring.

Modern • Beautiful • Interactive • Fast

Built with pure HTML, CSS & JavaScript ✨

</div>

### Before you commit:

Create a folder named:

```text
screenshots/
```

and rename your images to:

```text
screenshots/light-mode.png
screenshots/dark-mode.png
screenshots/forgot-password.png
```

Then commit and push them. The README above will display them automatically on GitHub.
