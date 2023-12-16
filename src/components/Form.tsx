import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../api/api";
import { v4 as uuidv4 } from "uuid";

import type { todosTypes } from "../types/todosTypes";

function Form() {
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(
    (newTodo: todosTypes) => addTodo(newTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const contents = formData.get("contents") as string;

    if (title && contents) {
      const newTodo: todosTypes = {
        id: uuidv4(),
        title,
        contents,
        isDone: false,
      };

      addTodoMutation.mutate(newTodo);
    }
  };

  return (
    <div>
      <h2>할 일 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input type="text" name="title" id="title" placeholder="Title" />
        </div>
        <div>
          <label htmlFor="contents">내용:</label>
          <textarea name="contents" id="contents" placeholder="Contents" />
        </div>
        <button type="submit">할 일 추가</button>
      </form>
    </div>
  );
}

export default Form;
