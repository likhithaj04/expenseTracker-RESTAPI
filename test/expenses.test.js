import request from 'supertest'
import app from '../src/app.js'


describe("Expense API", () => {

describe("Expense API",()=>{
    test("GET /expense should return all expenses",async()=>{
const response=await request(app).get("/expense");
expect(response.status).toBe(200)
expect(response.body.success).toBe(true)
expect(Array.isArray(response.body.data)).toBe(true)

if (response.body.data.length > 0) {
      expect(response.body.data[0]).toHaveProperty("id");
      expect(response.body.data[0]).toHaveProperty("title");
      expect(response.body.data[0]).toHaveProperty("amount");
      expect(response.body.data[0]).toHaveProperty("category");
      expect(response.body.data[0]).toHaveProperty("date");
    }
    })

    test("should return expenses filtered by category", async () => {
    const response = await request(app)
      .get("/expense")
      .query({ category: "Food" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Expenses retrieved successfully");
    expect(Array.isArray(response.body.data)).toBe(true);

    response.body.data.forEach((expense) => {
      expect(expense.category).toBe("Food");
    });
  });

  test("should return overall total expenses", async () => {
  const response = await request(app)
    .get("/expense/total");

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("Total expense fetched successfully");

  expect(typeof response.body.data).toBe("number");
});

test("should return total expenses for a category", async () => {
  const response = await request(app)
    .get("/expense/total")
    .query({ category: "Food" });

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);

  expect(typeof response.body.data).toBe("number");
});
})


describe("POST /expense", () => {
  test("should add a new expense successfully", async () => {
    const expense = {
      title: "sketch pencils",
      amount: 150,
      category: "stationary",
      date: "2026-08-01",
    };

    const response = await request(app)
      .post("/expense")
      .send(expense);

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe("success");

    expect(response.body.data.title).toBe(expense.title);
    expect(response.body.data.amount).toBe(expense.amount);
    expect(response.body.data.category).toBe(expense.category);
    expect(response.body.data.date).toBe(expense.date);
  });
});

test("DELETE /expense/:id should delete an expense", async () => {
  const createResponse = await request(app)
    .post("/expense")
    .send({
      title: "Delete Test",
      amount: 100,
      category: "Testing",
      date: "2026-08-01",
    });

  const id = createResponse.body.data.id;

  const deleteResponse = await request(app)
    .delete(`/expense/${id}`);

  expect(deleteResponse.statusCode).toBe(200);
  expect(deleteResponse.body.success).toBe(true);
  expect(deleteResponse.body.message).toBe("Expense Deleted Successfully");
});

test("GET /expense/monthly should return monthly summary", async () => {
  const response = await request(app)
    .get("/expense/monthly")
    .query({ month: "2026-08" });

  expect(response.statusCode).toBe(200);
  expect(response.body.success).toBe(true);
  expect(response.body.message).toBe("Monthly summary retrieved successfully");

  expect(response.body.data.month).toBe("2026-08");
  expect(typeof response.body.data.totalExpenses).toBe("number");
  expect(typeof response.body.data.numberOfExpenses).toBe("number");

  expect(response.body.data.highestExpense).toHaveProperty("title");
  expect(response.body.data.highestExpense).toHaveProperty("amount");
  expect(response.body.data.highestExpense).toHaveProperty("category");

  expect(response.body.data.lowestExpense).toHaveProperty("title");
  expect(response.body.data.lowestExpense).toHaveProperty("amount");
  expect(response.body.data.lowestExpense).toHaveProperty("category");
});
})