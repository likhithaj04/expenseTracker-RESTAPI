
## 1. Which parts of the code were AI-generated vs. written by me

**Written by me:**

* Overall project setup and folder structure.
* Implementation of all REST API endpoints (add, retrieve, filter, total, delete, and monthly summary).
* JSON file storage logic using the Node.js `fs` module.
* Business logic for filtering, calculating totals, and manipulating expense data.
* Route definitions and controller implementation.
* structured for reusable `wrapAsync` and centralized error-handling middleware.
* designed the Zod validation schema.

**AI-assisted:**

* Assisted in setting up Jest and Supertest and provided examples of API test cases.
* Reviewed the README and suggested improvements to make it clearer and easier to follow.

---

## 2. AI suggestions I decided not to use

* I chose not to refactor repeated JSON file operations into a separate service layer because the project is small, and keeping the logic in the controllers made it easier to read for this assignment.
* I chose not to add a database, since the assignment explicitly allowed local JSON storage.
* I chose not to implement additional optional features beyond the monthly summary endpoint to keep the submission focused and complete.
