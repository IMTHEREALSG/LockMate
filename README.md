# Password Manager

A secure and feature-rich password manager web application built with **HTML**, **CSS**, **Tailwind CSS**, **Express.js**, and **MongoDB**. This application ensures robust security for user data through encryption and provides a seamless interface for managing passwords efficiently. The frontend is deployed on **Vercel**, and the backend is deployed on **Render**.

---

## Key Features

- **AES Encryption:** All passwords are securely encrypted using the **AES** algorithm, implemented with the **crypto-js** library.
- **Secure Authentication with Cookie-based JWT**: User authentication is protected using JWT tokens stored in secure cookies. This ensures session persistence and provides secure, stateless user sessions.
- **Secure Authentication:** User signup and login are protected with JWT. Passwords are hashed and salted using the **bcrypt** library for enhanced security.
- **Input Validation:** Prevent SQL injection attacks with input validation powered by **Zod**.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
- **HTTPS Communication:** Ensures encrypted data transmission between client and server.
- **Advanced Security Practices:** Features sanitized queries, rigorous input validation, and other best practices for security.

---

## Deployment

- **Frontend:** Hosted on [Vercel](https://vercel.com/)
- **Backend:** Hosted on [Render](https://render.com/)
- **Live Application:** [Password Manager](https://lockmate-3.vercel.app/)

---

## Technologies Used

### Frontend
- HTML
- CSS
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- bcrypt (Password Hashing and Salting)
- crypto-js (AES Encryption)
- Zod (Input Validation)

### Deployment
- **Frontend:** Vercel
- **Backend:** Render

---

## Getting Started

### Prerequisites
- Node.js and npm installed
- Access to a MongoDB instance (local or cloud-based)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/password-manager.git
   cd password-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following content:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the application:
   - **Frontend:** Navigate to the Vercel deployment link.
   - **Backend:** Navigate to the Render deployment link.

---

## Future Enhancements

- **Biometric Authentication:** Integrate fingerprint or facial recognition for added security.
- **Browser Extension:** Develop an extension for seamless password autofill.
- **Two-Factor Authentication (2FA):** Strengthen account security with 2FA.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature description'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.



