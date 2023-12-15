import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../redux/modules/todosSlice";
import { useAppDispatch } from "../redux/hooks";

import type { todosTypes } from "../types/todosTypes";

function Form() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const writeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const writeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!title || !contents) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      const newTodo: todosTypes = {
        id: uuidv4(),
        title,
        contents,
        isDone: false,
      };

      dispatch(addTodo(newTodo));
      setTitle("");
      setContents("");
    } catch (error) {
      alert("할 일 추가 실패: " + error);
    }
  };

  return (
    <div>
      <h2>할 일 작성</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input type="text" value={title} onChange={writeTitle} />
        </label>
        <br />
        <label>
          내용:
          <textarea value={contents} onChange={writeContents} />
        </label>
        <br />
        <button type="submit">할 일 추가</button>
      </form>
    </div>
  );
}

export default Form;
