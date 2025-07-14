//obsolete
// import mongoose from "mongoose";

// export function validateTodoId(todoId) {
//   return mongoose.Types.ObjectId.isValid(todoId);
// }

// export function checkIfIdExist(todos, todoId) {
//   const exists = todos.some((todo) => todo.id === todoId);
//   if (!exists) {
//     return false;
//   }
//   return true;
// }

// export function validateTodoText(todoText) {
//   if (typeof todoText !== "string" || todoText.trim() === "") {
//     return false;
//   }
//   return true;
// }

// export function validateTodoComplete(todoCompleted) {
//   if (typeof todoCompleted !== "boolean") {
//     return false;
//   }
//   return true;
// }
