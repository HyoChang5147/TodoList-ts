import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Form from "./components/Form";
import TodoListCard from "./components/TodoListCard";
import type { todosTypes } from "./types/todosTypes";

function App() {
  const [todosData, setTodosData] = useState<todosTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<todosTypes[]>(
          "http://localhost:4000/todos"
        );
        setTodosData(data);
      } catch (error) {
        alert("데이터를 가져오는 중 오류가 발생했습니다: " + error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Form todos={todosData} setTodosData={setTodosData} />
      <TodoListCard
        todos={todosData}
        setTodosData={setTodosData}
        listIsDone={false}
      />
      <TodoListCard
        todos={todosData}
        setTodosData={setTodosData}
        listIsDone={true}
      />
    </div>
  );
}

export default App;
