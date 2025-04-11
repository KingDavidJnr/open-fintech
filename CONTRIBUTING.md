# 🤝 Contributing to Open Fintech

First off, thank you for considering contributing to **Open Fintech**! We welcome all contributions — from code to documentation, bug reports, and suggestions.

This document outlines how to contribute to this project effectively.

---

## 🛠️ Getting Started

### 1. Fork the Repository

Click the **Fork** button on the top right of the [repo](https://github.com/KingDavidJnr/open-fintech) and clone it to your machine:

```bash
git clone https://github.com/KingDavidJnr/open-fintech
cd open-fintech
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project:

```bash
cp .env.example .env
```

Fill in the required fields like `DATABASE_URL`, `JWT_SECRET`, etc.

---

## 📦 Project Structure

```bash
open-fintech/
├── auth/
├── users/
├── wallets/
├── transactions/
├── savings/
├── investments/
├── scoring/
├── splitting/
├── config/
├── middleware/
├── utils/
├── tests/
└── docs/
```

Each module contains `controllers/`, `services/`, `models/`, and `routes/`.

---

## 🔍 How to Contribute

### 🐛 Reporting Bugs

1. Use the [Issues](https://github.com/KingDavidJnr/open-fintech/issues) tab.
2. Provide:
   - A clear and descriptive title
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Logs or screenshots (if applicable)

---

### 🧠 Suggesting Features

1. Check if the feature already exists or is being discussed.
2. If not, create a new issue titled: `[Feature] Your suggestion`.
3. Include:
   - Problem the feature solves
   - Proposed solution
   - Potential drawbacks (if any)

---

### 🔧 Code Contributions

1. Create a new branch:

```bash
git checkout -b feat/short-description
```

2. Follow our coding conventions.
3. Write or update tests where necessary.
4. Run linter and tests before committing.

```bash
npm run lint
npm test
```

5. Commit using [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(wallet): add transaction summary endpoint"
```

6. Push to your fork and create a Pull Request against `pull-requests` branch.

---

## 📐 Code Style & Standards

- Use **ESLint** with our preconfigured rules
- Follow project folder conventions
- Keep functions pure and modular
- Use TypeScript types (when applicable)

---

## 🧪 Testing

We use **Jest** + **Supertest** for testing.

```bash
npm run test
```

Include both unit and integration tests in the `tests/` folder. Each module has its own test subfolder.

---

## 🔐 Security & Encryption

Any code that handles:

- Sensitive user information
- Cryptographic operations
- Authentication/Authorization

Must be carefully reviewed and tested. Do **not** hardcode secrets — use environment variables.

---

## 🔏 License

By contributing, you agree that your contributions will be licensed under the [GNU General Public License (GPL)](https://www.gnu.org/licenses/gpl-3.0.en.html).

---

## 🧑‍💻 Community & Support

Have questions or want to connect? Start a discussion or join our future Discord server (coming soon).

Thank you for being a part of Open Fintech! 🌍🚀

```