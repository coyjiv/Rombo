import { LoginValues, User } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk<User>(
  "user/fetchById",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return response.json() as any;
  }
);
export const login = createAsyncThunk<Promise<any>>(
  "user/login",
  async (formData : LoginValues) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.json() as any;
  }
);
