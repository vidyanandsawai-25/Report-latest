/**
 * Authentication Service
 * Handles user authentication, login, logout, and session management
 */

import { API_CONFIG } from '../config/api.config';
import { get, post, authTokenManager } from './api.service';
import {
  LoginRequest,
  LoginResponse,
  UserProfile,
  UserSession,
  ApiResponse,
} from '../types/api.types';

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await post<LoginResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.success && response.data) {
      // Store tokens
      authTokenManager.setToken(response.data.accessToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userProfile', JSON.stringify(response.data.user));
      }
    }

    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authTokenManager.clearTokens();
    }
  }

  /**
   * Get current user profile
   */
  async getUserProfile(): Promise<UserProfile> {
    const response = await get<UserProfile>(
      API_CONFIG.ENDPOINTS.AUTH.GET_USER_PROFILE
    );
    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await post<UserProfile>(
      API_CONFIG.ENDPOINTS.AUTH.UPDATE_PROFILE,
      data
    );
    return response.data;
  }

  /**
   * Change password
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await post(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    });
  }

  /**
   * Get user sessions
   */
  async getUserSessions(): Promise<UserSession[]> {
    const response = await get<UserSession[]>(
      API_CONFIG.ENDPOINTS.AUTH.GET_USER_SESSIONS
    );
    return response.data;
  }

  /**
   * Get last login information
   */
  async getLastLogin(): Promise<UserSession> {
    const response = await get<UserSession>(
      API_CONFIG.ENDPOINTS.AUTH.GET_LAST_LOGIN
    );
    return response.data;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!authTokenManager.getToken();
  }

  /**
   * Get cached user profile from localStorage
   */
  getCachedUserProfile(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    
    const cached = localStorage.getItem('userProfile');
    return cached ? JSON.parse(cached) : null;
  }

  /**
   * Refresh auth token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = authTokenManager.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await post<{ accessToken: string }>(
      API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );

    authTokenManager.setToken(response.data.accessToken);
    return response.data.accessToken;
  }
}

export const authService = new AuthService();
