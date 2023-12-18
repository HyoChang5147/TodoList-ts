import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../api/api";
import { v4 as uuidv4 } from "uuid";
import * as St from "../styled-component/StForm";

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
    <St.FormContainer>
      <St.Title>할 일 작성</St.Title>
      <form onSubmit={handleSubmit}>
        <St.FormGroup>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="제목을 입력해 주세요!"
            value={titleValue}
            onChange={handleTitleChange}
          />
        </St.FormGroup>
        <St.FormGroup>
          <label htmlFor="contents">내용</label>
          <textarea
            name="contents"
            id="contents"
            placeholder="내용을 입력해 주세요!"
            value={contentsValue}
            onChange={handleContentsChange}
          />
        </St.FormGroup>
        <St.SubmitButton type="submit">할 일 추가</St.SubmitButton>
      </form>
    </St.FormContainer>
  );
}

export default Form;
