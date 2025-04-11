# 📄 Product Requirements Document (PRD)

## 🧠 Project Overview

**Open Fintech** is a modular, scalable, and secure open-source backend built for powering modern financial applications. It provides real-time financial services including:

- Dynamic credit scoring
- Gamified savings and investment plans
- Instant payment splitting
- Comprehensive transaction analytics

The platform is designed for fintech startups, independent developers, and contributors who want to integrate or build financial capabilities easily and transparently.

---

## 🚀 Core Features

### 1. 🔢 Dynamic Credit Scoring

- Real-time credit evaluation based on:
  - Transaction history
  - Debt and savings behavior
  - Optional social reputation (with consent)
- Lightweight, rule-based scoring (with potential for ML-based pipelines)

---

### 2. 🎯 Gamified Saving & Investment Plans

- Users can:
  - Set custom savings goals
  - Join fixed or pooled investment plans
  - Earn rewards, badges, or returns for reaching milestones

---

### 3. ⚡ Instant Payment Splitting

- Real-time bill splitting between users:
  - Equal or custom splits
  - “Pay for me” with reminders
- Integrated wallet and transaction system for settlements

---

### 4. 👤 User Account Management

- Sign-up, login, and logout
- JWT authentication
- Role-based access (admin, user, etc.)
- Basic profile management (KYC-ready)

---

### 5. 📊 Transaction History & Analytics

- Log and categorize all user transactions
- Generate monthly reports and trends
- Export data in CSV or JSON
- Optional AI-powered insights

---

### 6. 🔐 Data Encryption & Security

- Passwords securely hashed using bcrypt
- JWT-based authentication with refresh tokens
- AES encryption for sensitive data (e.g., bank details)
- TLS (HTTPS) for all data in transit
- Database-level encryption for data at rest
- In the event of a data breach, encrypted data remains secure unless decrypted with the key
- Secure route protection and role-based access control
- Rate limiting, CORS, and optional 2FA/device verification

---

## 🧰 Tech Stack

| Layer                | Technology                             |
| -------------------- | -------------------------------------- |
| **Backend**          | Node.js, Express.js                    |
| **Database**         | PostgreSQL (default), MySQL (optional) |
| **ORM**              | Sequelize                              |
| **Authentication**   | JWT + bcrypt                           |
| **Caching**          | Redis                                  |
| **Scoring Logic**    | Rule-based scoring (ML-ready)          |
| **Testing**          | Jest + Supertest                       |
| **Documentation**    | Swagger, Markdown                      |
| **CI/CD**            | GitHub Actions                         |
| **Containerization** | Docker (optional)                      |

---

## 🛠️ Development Roadmap

1. Define Entity Relationship Diagram (ERD)
2. Create modular folder structure:
   - `auth/`
   - `users/`
   - `wallets/`
   - `transactions/`
   - `savings/`
   - `investments/`
   - `scoring/`
   - `splitting/`
3. Build authentication and user profile modules
4. Implement wallets and basic transactions
5. Set up Swagger for API documentation
6. Open source the repo with clear contribution guidelines

---

## 🧑‍💻 Contribution

This is an open-source project under the **GNU General Public License (GPL)**.

Contributions are welcome via pull requests. Please read the `CONTRIBUTING.md` file before making changes.

License: [GPL License](https://www.gnu.org/licenses/gpl-3.0.en.html)

---
