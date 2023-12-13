import React from "react";
import axios from "axios";

import type { todosTypes } from "../types/todosTypes";

interface TodoListCardProps {
  todos: todosTypes[];
  setTodosData: React.Dispatch<React.SetStateAction<todosTypes[]>>;
  listIsDone: boolean;
}

const TodoListCard: React.FC<TodoListCardProps> = ({
  todos,
  setTodosData,
  listIsDone,
}) => {
  const clickRemoveButtonHandler = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/todos/${id}`);

      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodosData(updatedTodos);
    } catch (error) {
      alert("할 일을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  const clickToggleButtonHandler = async (id: number) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) {
        alert("할 일을 찾을 수 없습니다!");
        return;
      }

      const updatedTodo = { ...todoToUpdate, isDone: !todoToUpdate.isDone };
      await axios.put(`http://localhost:4000/todos/${id}`, updatedTodo);

      const updatedTodos = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      setTodosData(updatedTodos);
    } catch (error) {
      alert("할 일을 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <h2>{listIsDone ? "이미 한 일입니다!✨" : "할 일 목록🔥"}</h2>
      <div>
        {todos
          .filter((todo) => todo.isDone === listIsDone)
          .map((todo) => (
            <div key={todo.id}>
              <div>{todo.title}</div>
              <div>{todo.contents}</div>
              <div>
                <button onClick={() => clickRemoveButtonHandler(todo.id)}>
                  삭제
                </button>
                <button onClick={() => clickToggleButtonHandler(todo.id)}>
                  {todo.isDone ? "복습하기!" : "완료!!"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default TodoListCard;
