import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // ✅ Update user state
    },
    resetState: (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      },
      // loginUser: (state, action) => {
      //   state.isAuthenticated = true;
      //   state.user = action.payload.user;
      // },
      // setAuthenticated: (state, action) => {
      //   state.isAuthenticated = action.payload;
      // },
      // logoutUser: (state) => {
      //   state.isAuthenticated = false;
      //   state.user = null;
      // },
  },
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state)=>{
        state.isLoading = true;
    }).addCase(registerUser.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = action.payload;
    } ).addCase(registerUser.rejected,(state,action)=>{
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
    }).addCase(loginUser.pending, (state)=>{
      state.isLoading = true;
  }).addCase(loginUser.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.isAuthenticated = action.payload.success ? true : false;
      state.user = action.payload.success ? action.payload.user : null;
      console.log('User:', state.user);
      console.log('IsAuthenticated:', state.isAuthenticated);
      
      // Store token in localStorage if login is successful
      if (action.payload.success && action.payload.token) {
        localStorage.setItem('token', action.payload.token);
        console.log('Token stored in localStorage');
      }
  } ).addCase(loginUser.rejected,(state,action)=>{
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
  }).addCase(checkAuth.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(checkAuth.fulfilled, (state, action) => {
    state.isLoading = false;
    state.user = action.payload.success ? action.payload.user : null;
    state.isAuthenticated = action.payload.success;
  })
  .addCase(checkAuth.rejected, (state, action) => {
    state.isLoading = false;
    state.user = null;
    state.isAuthenticated = false;
  }).addCase(logoutUser.pending, (state)=>{
    state.isLoading = true;
  }).addCase(logoutUser.fulfilled,(state,action)=>{
    state.isLoading = false;
    state.isAuthenticated = false;
    state.user = null;
    
    // Remove token from localStorage on logout
    localStorage.removeItem('token');
    console.log('Token removed from localStorage');
  })
  }
});

export const { setUser ,resetState} = authSlice.actions;
export default authSlice.reducer;
