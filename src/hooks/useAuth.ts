/**
 * Authentication Hook
 * Provides authentication state and functions
 */

import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';
import { LoginRequest, UserProfile } from '../types/api.types';
import { toast } from 'sonner@2.0.3';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Try to get cached profile first
          const cachedProfile = authService.getCachedUserProfile();
          if (cachedProfile) {
            setUser(cachedProfile);
            setIsAuthenticated(true);
          }

          // Fetch fresh profile from API
          const profile = await authService.getUserProfile();
          setUser(profile);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      return response;
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    try {
      const updatedProfile = await authService.updateProfile(data);
      setUser(updatedProfile);
      toast.success('Profile updated successfully');
      return updatedProfile;
    } catch (error: any) {
      toast.error(error.message || 'Profile update failed');
      throw error;
    }
  }, []);

  // Change password
  const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
    try {
      await authService.changePassword(oldPassword, newPassword);
      toast.success('Password changed successfully');
    } catch (error: any) {
      toast.error(error.message || 'Password change failed');
      throw error;
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    changePassword,
  };
}
