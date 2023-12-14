import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../redux/modules/todosSlice";

function Form() {
  const dispatch = useDispatch();

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
      const newTodo = {
        id: uuidv4(),
        title,
        contents,
        isDone: false,
      };
      addTodo(newTodo)(dispatch);
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
