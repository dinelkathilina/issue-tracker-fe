import api, { setToken, removeToken } from './api';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types';

/**
 * Authentication service for login, register, and logout operations.
 */

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/users/login', credentials);
    
    // Store token on successful login
    if (response.data.success && response.data.data.token) {
      setToken(response.data.data.token);
    }
    
    return response.data;
  },

  /**
   * Register a new user
   */
  async register(credentials: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/users/register', credentials);
    return response.data;
  },

  /**
   * Logout - clear stored token
   */
  logout(): void {
    removeToken();
  },
};

export default authService;
