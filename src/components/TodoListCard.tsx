import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodos, removeTodo, switchTodo } from "../api/api";
import * as St from "../styled-component/StTodoListCard";

import type { todosTypes } from "../types/todosTypes";

function TodoListCard() {
  const queryClient = useQueryClient();

  const {
    data: todosData,
    isLoading,
    isError,
  } = useQuery<todosTypes[], Error>("todos", getTodos, {
    staleTime: 300000,
    retry: 3,
  });

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
    const confirmDelete = window.confirm("정말로 이 할 일을 삭제하시겠습니까?");
    if (confirmDelete) {
      removeTodoMutation.mutate(id);
    }
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
    <St.Container>
      <St.TodoSection>
        <St.TodoTitle>할 일 목록🔥</St.TodoTitle>
        <St.StyledList>
          {incompleteTodos.map((todo) => (
            <St.TodoItem key={todo.id}>
              <St.TodoHeader>{todo.title}</St.TodoHeader>
              <St.TodoContent>{todo.contents}</St.TodoContent>
              <St.Button onClick={() => handleSwitchTodo(todo.id, todo.isDone)}>
                완료
              </St.Button>
              <St.Button onClick={() => handleRemoveTodo(todo.id)}>
                삭제
              </St.Button>
            </St.TodoItem>
          ))}
        </St.StyledList>
      </St.TodoSection>
      <St.TodoSection>
        <St.TodoTitle>완료 목록!✨</St.TodoTitle>
        <St.StyledList>
          {completedTodos.map((todo) => (
            <St.TodoItem key={todo.id}>
              <St.TodoHeader>{todo.title}</St.TodoHeader>
              <St.TodoContent>{todo.contents}</St.TodoContent>
              <St.Button onClick={() => handleSwitchTodo(todo.id, todo.isDone)}>
                다시하기
              </St.Button>
              <St.Button onClick={() => handleRemoveTodo(todo.id)}>
                삭제
              </St.Button>
            </St.TodoItem>
          ))}
        </St.StyledList>
      </St.TodoSection>
    </St.Container>
  );
}

export default TodoListCard;
