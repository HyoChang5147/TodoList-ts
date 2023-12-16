import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../api/api";
import { v4 as uuidv4 } from "uuid";

import type { todosTypes } from "../types/todosTypes";

function Form() {
  const queryClient = useQueryClient();
  const [titleValue, setTitleValue] = useState("");
  const [contentsValue, setContentsValue] = useState("");

  const addTodoMutation = useMutation(
    (newTodo: todosTypes) => addTodo(newTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        setTitleValue("");
        setContentsValue("");
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titleValue || !contentsValue) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const newTodo: todosTypes = {
      id: uuidv4(),
      title: titleValue,
      contents: contentsValue,
      isDone: false,
    };

    addTodoMutation.mutate(newTodo);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentsValue(e.target.value);
  };

  return (
    <div>
      <h2>할 일 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={titleValue}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="contents">내용:</label>
          <textarea
            name="contents"
            id="contents"
            placeholder="Contents"
            value={contentsValue}
            onChange={handleContentsChange}
          />
        </div>
        <button type="submit">할 일 추가</button>
      </form>
    </div>
  );
}

export default Form;
