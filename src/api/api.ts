import axios from "axios";

import type { todosTypes } from "../types/todosTypes";

const SERVER_URI = "http://localhost:4000";

const getTodos = async (): Promise<todosTypes[]> => {
  const response = await axios.get<todosTypes[]>(`${SERVER_URI}/todos`);
  return response.data;
};

const addTodo = async (newTodo: todosTypes): Promise<void> => {
  await axios.post(`${SERVER_URI}/todos`, newTodo);
};

const removeTodo = async (id: string): Promise<void> => {
  await axios.delete(`${SERVER_URI}/todos/${id}`);
};

const switchTodo = async (payload: {
  id: string;
  isDone: boolean;
}): Promise<void> => {
  await axios.patch(`${SERVER_URI}/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

export { getTodos, addTodo, removeTodo, switchTodo };
