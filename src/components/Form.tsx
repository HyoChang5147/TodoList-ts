import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import type { todosTypes } from "../types/todosTypes";

interface FormProps {
  todos: todosTypes[];
  setTodosData: React.Dispatch<React.SetStateAction<todosTypes[]>>;
}

function Form({ todos, setTodosData }: FormProps) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const writeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const writeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTodo = {
        id: uuidv4(),
        title,
        contents,
        isDone: false,
      };
      await axios.post("http://localhost:4000/todos", newTodo);
      setTodosData((prevTodos: todosTypes[]) => [...prevTodos, newTodo]);
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
