import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import authService from '../../services/authService';
import { getToken } from '../../services/api';
import type { User, LoginRequest, RegisterRequest, ApiError } from '../../types';

// =============================================================================
// Types
// =============================================================================

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// =============================================================================
// Initial State - Check for existing token
// =============================================================================

const existingToken = getToken();

const initialState: AuthState = {
  user: null,
  token: existingToken,
  isAuthenticated: !!existingToken,
  loading: false,
  error: null,
};

// =============================================================================
// Async Thunks
// =============================================================================

/**
 * Login user with email and password
 */
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Login failed. Please try again.'
    );
  }
});

/**
 * Register a new user
 */
export const registerUser = createAsyncThunk<
  { user: User; token: string },
  RegisterRequest,
  { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.register(credentials);
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    return rejectWithValue(
      axiosError.response?.data?.message || 'Registration failed. Please try again.'
    );
  }
});

// =============================================================================
// Slice
// =============================================================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // For restoring session from token (if needed)
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // Don't auto-login after registration, let them go to login page
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export const { logout, clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
