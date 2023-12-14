import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  selectTodosData,
  removeTodo,
  toggleTodo,
} from "../redux/modules/todosSlice";
import { AppDispatch } from "../redux/config/configStore";

import type { todosTypes } from "../types/todosTypes";

function TodoListCard() {
  const dispatch: AppDispatch = useDispatch();
  const todosData: todosTypes[] = useSelector(selectTodosData);
  const [todos, setTodosData] = useState(todosData);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    setTodosData(todosData);
  }, [todosData]);

  const clickRemoveButtonHandler = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "정말로 이 할 일을 삭제하시겠습니까?"
      );
      if (!confirmDelete) {
        return;
      }

      await dispatch(removeTodo(id));
    } catch (error) {
      alert("할 일을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  const clickToggleButtonHandler = async (id: string) => {
    try {
      await dispatch(toggleTodo(id));
    } catch (error) {
      alert("할 일을 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  const completedTodos = todosData.filter((todo) => todo.isDone);
  const incompleteTodos = todosData.filter((todo) => !todo.isDone);

  return (
    <div>
      {todos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>할 일 목록🔥</h2>
          <ul>
            {incompleteTodos.map((todo: todosTypes) => (
              <div key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.contents}</p>
                <button onClick={() => clickToggleButtonHandler(todo.id)}>
                  완료
                </button>
                <button onClick={() => clickRemoveButtonHandler(todo.id)}>
                  삭제
                </button>
              </div>
            ))}
          </ul>
          <h2>완료 목록!✨</h2>
          <ul>
            {completedTodos.map((todo: todosTypes) => (
              <div key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.contents}</p>
                <button onClick={() => clickToggleButtonHandler(todo.id)}>
                  다시하기
                </button>
                <button onClick={() => clickRemoveButtonHandler(todo.id)}>
                  삭제
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoListCard;
