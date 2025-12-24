/**
 * API Service Layer
 * Centralized API handling with axios, interceptors, and error handling
 * Maharashtra Water Billing System
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG, getEnvironmentConfig } from '../config/api.config';
import { ApiResponse, ApiError } from '../types/api.types';

/**
 * Create axios instance with default configuration
 */
const createApiInstance = (): AxiosInstance => {
  const config = getEnvironmentConfig();
  
  const instance = axios.create({
    baseURL: config.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Request interceptor - Add auth token
  instance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add correlation ID for tracking
      config.headers['X-Correlation-ID'] = generateCorrelationId();
      
      // Log request in development
      if (process.env.NEXT_PUBLIC_ENV === 'development') {
        console.log('API Request:', {
          url: config.url,
          method: config.method,
          data: config.data,
        });
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - Handle errors and token refresh
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // Log response in development
      if (process.env.NEXT_PUBLIC_ENV === 'development') {
        console.log('API Response:', {
          url: response.config.url,
          status: response.status,
          data: response.data,
        });
      }
      
      return response;
    },
    async (error: AxiosError<ApiResponse>) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized - Token expired
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            const response = await axios.post(
              `${getEnvironmentConfig().BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN}`,
              { refreshToken }
            );

            const { accessToken } = response.data.data;
            setAuthToken(accessToken);

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return instance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh token failed - logout user
          handleLogout();
          return Promise.reject(refreshError);
        }
      }

      // Handle other errors
      return Promise.reject(handleApiError(error));
    }
  );

  return instance;
};

/**
 * API instance
 */
export const apiClient = createApiInstance();

/**
 * Generic GET request
 */
export async function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.get<ApiResponse<T>>(url, config);
  return response.data;
}

/**
 * Generic POST request
 */
export async function post<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.post<ApiResponse<T>>(url, data, config);
  return response.data;
}

/**
 * Generic PUT request
 */
export async function put<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.put<ApiResponse<T>>(url, data, config);
  return response.data;
}

/**
 * Generic PATCH request
 */
export async function patch<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
  return response.data;
}

/**
 * Generic DELETE request
 */
export async function del<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.delete<ApiResponse<T>>(url, config);
  return response.data;
}

/**
 * Download file (Excel, PDF, etc.)
 */
export async function downloadFile(
  url: string,
  fileName: string,
  config?: AxiosRequestConfig
): Promise<void> {
  const response = await apiClient.get(url, {
    ...config,
    responseType: 'blob',
  });

  const blob = new Blob([response.data]);
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}

/**
 * Upload file
 */
export async function uploadFile<T = any>(
  url: string,
  file: File,
  additionalData?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const formData = new FormData();
  formData.append('file', file);

  if (additionalData) {
    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key]);
    });
  }

  const response = await apiClient.post<ApiResponse<T>>(url, formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

/**
 * Retry logic for failed requests
 */
export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries: number = API_CONFIG.RETRY.MAX_RETRIES,
  retryDelay: number = API_CONFIG.RETRY.RETRY_DELAY
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay * (i + 1)));
      }
    }
  }

  throw lastError!;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get auth token from storage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}

/**
 * Set auth token to storage
 */
function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('authToken', token);
}

/**
 * Get refresh token from storage
 */
function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

/**
 * Handle logout - clear tokens and redirect
 */
function handleLogout(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.clear();
  
  // Redirect to login page
  window.location.href = '/login';
}

/**
 * Generate correlation ID for request tracking
 */
function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Handle API errors and format them
 */
function handleApiError(error: AxiosError<ApiResponse>): ApiError {
  if (error.response) {
    // Server responded with error
    const { data, status } = error.response;
    
    return {
      code: data?.errors?.[0]?.code || `HTTP_${status}`,
      message: data?.message || error.message,
      field: data?.errors?.[0]?.field,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      code: 'NETWORK_ERROR',
      message: 'Unable to connect to the server. Please check your internet connection.',
    };
  } else {
    // Error in request setup
    return {
      code: 'REQUEST_ERROR',
      message: error.message || 'An unexpected error occurred.',
    };
  }
}

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams();
  
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => query.append(key, item.toString()));
      } else {
        query.append(key, value.toString());
      }
    }
  });

  return query.toString();
}

/**
 * Export auth token management functions for external use
 */
export const authTokenManager = {
  getToken: getAuthToken,
  setToken: setAuthToken,
  getRefreshToken,
  clearTokens: handleLogout,
};
