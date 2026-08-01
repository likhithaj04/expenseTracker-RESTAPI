# Smart Expense Tracker API

A RESTful API built with **Node.js** and **Express.js** to manage personal expenses. The API supports creating, retrieving, filtering, calculating totals, and deleting expenses. Data is stored locally in a JSON file, and automated tests are included using Jest and Supertest.

---

## Features

* Add a new expense
* View all expenses
* Filter expenses by category
* Calculate total expenses

  * Overall total
  * Total by category
* Delete an expense
* Request validation using Zod
* Centralized error handling
* Automated API testing with Jest and Supertest

---

## Tech Stack

* Node.js
* Express.js
* Zod
* Jest
* Supertest
* Local JSON File Storage

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd expenseTracker-api
```

Install dependencies:

```bash
npm install
```

---

## Start the Server

Run:

```bash
npm start
```

The server runs on:

```text
http://localhost:8000
```

---

## Run Tests

Run:

```bash
npm test
```

---

## Environment Variables

No environment variables are required.

This project stores data locally in a JSON file and does not require any external database configuration.

---

## Data Storage

Expense data is stored locally in:

```text
src/expenses.json
```

No database setup is required.

---

## API Endpoints

| Method | Endpoint                       | Description                                |
| ------ | ------------------------------ | ------------------------------------------ |
| POST   | `/expense`                     | Add a new expense                          |
| GET    | `/expense`                     | Retrieve all expenses                      |
| GET    | `/expense?category=Food`       | Retrieve expenses filtered by category     |
| GET    | `/expense/total`               | Get total expenses across all categories   |
| GET    | `/expense/total?category=Food` | Get total expenses for a specific category |
| DELETE | `/expense/:id`                 | Delete an expense by its ID                |

---

## Sample Request

### Add Expense

**POST** `/expense`

```json
{
  "title": "Groceries",
  "amount": 1250,
  "category": "Food",
  "date": "2026-08-01"
}
```

---

## Sample Response

```json
{
  "success": true,
  "message": "Expense added successfully",
  "data": {
    "id": "0f756ac8-5e0a-4b04-beff-e393e0e567d5",
    "title": "Groceries",
    "amount": 1250,
    "category": "Food",
    "date": "2026-08-01"
  }
}
```

---

## Validation

Incoming requests are validated using **Zod** before reaching the controller layer.

### Required Fields

| Field    | Type   | Validation                   |
| -------- | ------ | ---------------------------- |
| title    | string | Required, non-empty          |
| amount   | number | Required, must be positive   |
| category | string | Required, non-empty          |
| date     | string | Required, format: YYYY-MM-DD |

---

## Project Structure

```text
your-repo/
├── README.md
├── AI_NOTES.md
├── package.json
├── src/
│   ├── app.js
│   ├── index.js
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── validations/
│   └── expenses.json
│
└── tests/
    └── expenses.test.js
```

---

## Notes

* IDs are generated using UUIDs.
* Expenses are persisted in a local JSON file.
* Error handling is centralized using Express middleware.
* Async route handlers are wrapped using a custom `wrapAsync` utility.
* Automated tests are implemented using Jest and Supertest.
