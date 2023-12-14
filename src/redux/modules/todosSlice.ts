import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jsonServerAPI from "../../api/api";

import type { RootState } from "../config/configStore";
import type { todosTypes } from "../../types/todosTypes";

interface TodosState {
  todosData: todosTypes[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todosData: [],
  loading: false,
  error: null,
};

// 데이터 가져오기
export const fetchTodos = () => async (dispatch: any) => {
  dispatch(fetchTodosStart());
  try {
    const { data } = await jsonServerAPI.get<todosTypes[]>("/todos");
    dispatch(fetchTodosSuccess(data));
  } catch (error) {
    dispatch(
      fetchTodosFailure(
        "데이터를 가져오는 중 오류가 발생했습니다: " + (error as Error).message
      )
    );
  }
};

// 데이터 넣기
export const addTodo = (newTodo: todosTypes) => async (dispatch: any) => {
  dispatch(addTodoStart());
  try {
    await jsonServerAPI.post("/todos", newTodo);
    dispatch(addTodoSuccess());
  } catch (error) {
    dispatch(addTodoFailure("할 일 추가 실패: " + (error as Error).message));
  }
};

// 데이터 삭제
export const removeTodo = (id: string) => async (dispatch: any) => {
  dispatch(removeTodoStart());
  try {
    await jsonServerAPI.delete(`/todos/${id}`);
    dispatch(removeTodoSuccess(id));
  } catch (error) {
    dispatch(removeTodoFailure("할 일 삭제 실패: " + (error as Error).message));
  }
};

// 데이터 업데이트
export const toggleTodo =
  (id: string) => async (dispatch: any, getState: any) => {
    dispatch(toggleTodoStart());
    try {
      const { todosData } = getState().todos;
      const todoToUpdate = todosData.find((todo: todosTypes) => todo.id === id);
      if (!todoToUpdate) {
        dispatch(toggleTodoFailure("할 일을 찾을 수 없습니다!"));
        return;
      }

      const updatedTodo = { ...todoToUpdate, isDone: !todoToUpdate.isDone };
      await jsonServerAPI.put(`/todos/${id}`, updatedTodo);

      dispatch(toggleTodoSuccess(updatedTodo));
    } catch (error) {
      dispatch(
        toggleTodoFailure("할 일을 업데이트하는 중 오류가 발생했습니다.")
      );
    }
  };

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action: PayloadAction<todosTypes[]>) => {
      state.loading = false;
      state.todosData = action.payload;
      state.error = null;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTodoSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    addTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeTodoSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = null;
      state.todosData = state.todosData.filter(
        (todo) => todo.id !== action.payload
      );
    },
    removeTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    toggleTodoSuccess: (state, action: PayloadAction<todosTypes>) => {
      state.loading = false;
      state.error = null;
      state.todosData = state.todosData.map((todo: todosTypes) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    toggleTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoStart,
  addTodoSuccess,
  addTodoFailure,
  removeTodoStart,
  removeTodoSuccess,
  removeTodoFailure,
  toggleTodoStart,
  toggleTodoSuccess,
  toggleTodoFailure,
} = todosSlice.actions;

export const selectTodosData = (state: RootState) => state.todos.todosData;
export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;

export default todosSlice.reducer;
