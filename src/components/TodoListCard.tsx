import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodos, removeTodo, switchTodo } from "../api/api";

import type { todosTypes } from "../types/todosTypes";

function TodoListCard() {
  const queryClient = useQueryClient();

  const {
    data: todosData,
    isLoading,
    isError,
  } = useQuery<todosTypes[], Error>("todos", getTodos);

  const removeTodoMutation = useMutation((id: string) => removeTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const switchTodoMutation = useMutation(
    (payload: { id: string; isDone: boolean }) => switchTodo(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const handleRemoveTodo = (id: string) => {
    removeTodoMutation.mutate(id);
  };

  const handleSwitchTodo = (id: string, isDone: boolean) => {
    switchTodoMutation.mutate({ id, isDone: !isDone });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !todosData) {
    return <div>할 일 목록을 불러오는 중에 오류가 발생했습니다!</div>;
  }

  const completedTodos = todosData.filter((todo) => todo.isDone);
  const incompleteTodos = todosData.filter((todo) => !todo.isDone);

  return (
    <div>
      <div>
        <h2>할 일 목록🔥</h2>
        <ul>
          {incompleteTodos.map((todo) => (
            <div key={todo.id}>
              <h4>{todo.title}</h4>
              <p>{todo.contents}</p>
              <button onClick={() => handleSwitchTodo(todo.id, todo.isDone)}>
                완료
              </button>
              <button onClick={() => handleRemoveTodo(todo.id)}>삭제</button>
            </div>
          ))}
        </ul>
      </div>
      <div>
        <h2>완료 목록!✨</h2>
        <ul>
          {completedTodos.map((todo) => (
            <div key={todo.id}>
              <h4>{todo.title}</h4>
              <p>{todo.contents}</p>
              <button onClick={() => handleSwitchTodo(todo.id, todo.isDone)}>
                다시하기
              </button>
              <button onClick={() => handleRemoveTodo(todo.id)}>삭제</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoListCard;
