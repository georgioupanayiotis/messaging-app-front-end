# 📩 Messaging App Front-End

A React-based messaging application with Material UI for a clean and responsive design. Supports authentication, messaging, localization (i18n), and data visualization. The data are stored on local storage and edited on local storage. On logout storage is removed.

## 🚀 Features
- ✅ User Authentication (Login/Register)
- ✅ Real-time Messaging (via API integration)
- ✅ Material UI for a modern UI
- ✅ React Router for navigation
- ✅ i18n (Internationalization) support
- ✅ Chart.js for analytics and data visualization

## 📦 Tech Stack
- Frontend: React 18, Material UI, React Router, Axios
- State Management: React Context API
- Localization: i18next
- Data Visualization: Chart.js
- Testing: Jest, React Testing Library

## 🛠 Prerequisites
Before you begin, ensure you have the following installed:

- ✅ Node.js (LTS version recommended) – [https://nodejs.org/](Download)
- ✅ Git – (https://git-scm.com/)[Download]
- ✅ A Code Editor (VS Code recommended) – (https://code.visualstudio.com/)[Download]

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app on [http://localhost:3000](http://localhost:3000) and view it in your browser.

### `npm test`

🧪 Running Tests

### `npm run test:coverage`

📖 For coverage reports you can check on the root directory ``messaging-app-front-end/coverage/lcov-report/index.html``
![Screenshot 2025-03-10 at 13 05 59](https://github.com/user-attachments/assets/4a70ee29-610b-40ba-884a-3c2cd6372dea)

## Components
The layout of the application is Clear, user-friendly layout and responsive. 

### Log In
Users should be able to enter a username and password to access the application.

### Register
Users should be able to create an account by providing at least:
- Username
- Password
- Valid email

### Dashboard
After a successful login, the user should be redirected to a Dashboard that includes:
- A list of the last 5 messages the user received.
- A summary of the most frequent users they chat with.
- A visual distribution (e.g., chart) of total messages per user.
- - ***Bonus Pagination on messages***

### Profile
The application should display the user’s information provided during registration. Added valiation username required, username length < 4 and email validation.

### Inbox
Users should have access to an inbox where they can:
- View all received messages.
- Send new messages to other users within the organization.
- ***Bonus Delete Message - opens dialogue to ensure deletion***
### Bonus
- Additionally I have added theme selection dark 🌘 and light☀️ 
- Language selection English 🇺🇸 and French 🇫🇷
