import request from "supertest";
import app from "./index.js";
import mongoose from "mongoose";

describe("Todos API", () => {
  test("GET /todos returns all todos", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("text");
    }
  });

  test("POST /todos creates a new todo", async () => {
    const res = await request(app).post("/todos").send({ text: "Test Todo" });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe("Test Todo");
    expect(res.body.completed).toBe(false);
    expect(res.body).toHaveProperty("id");
  });

  test("POST /todos with empty text returns 400", async () => {
    const res = await request(app).post("/todos").send({ text: "" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Todo 'text' is required.");
  });

  test("PUT /todos/:id edits a todo", async () => {
    // First, create a todo
    const postRes = await request(app)
      .post("/todos")
      .send({ text: "Editable Todo" });
    const todoId = postRes.body.id;

    // Edit the todo
    const res = await request(app)
      .put(`/todos/${todoId}`)
      .send({ text: "Updated", completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe("Updated");
    expect(res.body.completed).toBe(true);
  });

  test("PUT /todos/:id with invalid id returns 400", async () => {
    const res = await request(app)
      .put("/todos/abc")
      .send({ text: "Updated", completed: true });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid todo id.");
  });

  test("PUT /todos/:id with missing todo returns 404", async () => {
    // Use a valid but non-existent ObjectId
    const nonExistentId = "aaaaaaaaaaaaaaaaaaaaaaaa";
    const res = await request(app)
      .put(`/todos/${nonExistentId}`)
      .send({ text: "Updated", completed: true });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Todo not found.");
  });

  test("PUT /todos/:id with invalid completed returns 400", async () => {
    // First, create a todo
    const postRes = await request(app)
      .post("/todos")
      .send({ text: "Editable Todo" });
    const todoId = postRes.body.id;

    // Try to edit with invalid completed value
    const res = await request(app)
      .put(`/todos/${todoId}`)
      .send({ text: "Updated", completed: "notBoolean" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("'completed' must be true or false.");
  });

  test("DELETE /todos/:id deletes a todo", async () => {
    // First, create a todo
    const postRes = await request(app)
      .post("/todos")
      .send({ text: "Delete Me" });
    const todoId = postRes.body.id;

    // Delete the todo
    const res = await request(app).delete(`/todos/${todoId}`);
    expect(res.statusCode).toBe(204);

    // Check that it's deleted
    const getRes = await request(app).get("/todos");
    expect(getRes.body.find((todo) => todo.id === todoId)).toBeUndefined();
  });

  test("DELETE /todos/:id with invalid id returns 400", async () => {
    const res = await request(app).delete("/todos/abc");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Invalid todo id.");
  });

  test("DELETE /todos/:id with missing todo returns 404", async () => {
    const nonExistentId = "aaaaaaaaaaaaaaaaaaaaaaaa";
    const res = await request(app).delete(`/todos/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Todo not found.");
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
