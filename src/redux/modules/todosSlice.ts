import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await jsonServerAPI.get<todosTypes[]>("/todos");
      return data;
    } catch (error) {
      return rejectWithValue(
        "데이터를 가져오는 중 오류가 발생했습니다: " + (error as Error).message
      );
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (newTodo: todosTypes, { rejectWithValue }) => {
    try {
      await jsonServerAPI.post("/todos", newTodo);
    } catch (error) {
      return rejectWithValue("할 일 추가 실패: " + (error as Error).message);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id: string, { rejectWithValue }) => {
    try {
      await jsonServerAPI.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue("할 일 삭제 실패: " + (error as Error).message);
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const { todosData } = (getState() as RootState).todos;
      const todoToUpdate = todosData.find((todo: todosTypes) => todo.id === id);
      if (!todoToUpdate) {
        return rejectWithValue("할 일을 찾을 수 없습니다!");
      }

      const updatedTodo = { ...todoToUpdate, isDone: !todoToUpdate.isDone };
      await jsonServerAPI.put(`/todos/${id}`, updatedTodo);
      return updatedTodo;
    } catch (error) {
      return rejectWithValue("할 일을 업데이트하는 중 오류가 발생했습니다.");
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todosData = action.payload;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todosData = state.todosData.filter(
          (todo) => todo.id !== action.payload
        );
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todosData = state.todosData.map((todo: todosTypes) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectTodosData = (state: RootState) => state.todos.todosData;
export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;

export default todosSlice.reducer;
