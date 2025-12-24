/**
 * API Configuration for Maharashtra Water Billing System
 * 
 * This file contains all API endpoint configurations for the .NET microservices backend.
 * Update the base URLs based on your environment (development, staging, production).
 */

export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.mahawaterbilling.gov.in',
  
  // Microservice endpoints
  ENDPOINTS: {
    // Authentication & User Management
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REFRESH_TOKEN: '/api/auth/refresh',
      GET_USER_PROFILE: '/api/auth/profile',
      UPDATE_PROFILE: '/api/auth/profile/update',
      CHANGE_PASSWORD: '/api/auth/password/change',
      GET_USER_SESSIONS: '/api/auth/sessions',
      GET_LAST_LOGIN: '/api/auth/last-login',
    },

    // Reports Management
    REPORTS: {
      // Report Engine
      GET_REPORT_LIST: '/api/reports/list',
      GENERATE_REPORT: '/api/reports/generate',
      GET_REPORT_DATA: '/api/reports/data',
      EXPORT_REPORT: '/api/reports/export',
      GET_REPORT_HISTORY: '/api/reports/history',
      
      // Collection Reports
      DAY_WISE_COLLECTION: '/api/reports/collection/day-wise',
      MONTHLY_COLLECTION: '/api/reports/collection/monthly',
      COLLECTION_DETAILS: '/api/reports/collection/details',
      ACCOUNTANT_REPORT: '/api/reports/collection/accountant',
      ZONE_WISE_COLLECTION: '/api/reports/collection/zone-wise',
      
      // CRM Reports
      TOP_DEFAULTERS: '/api/reports/crm/top-defaulters',
      PENDING_READING: '/api/reports/crm/pending-reading',
      CLOSED_CONNECTION: '/api/reports/crm/closed-connection',
      MUTATION_REPORT: '/api/reports/crm/mutation',
      ALTERATION_REPORT: '/api/reports/crm/alteration',
      
      // Quick Reports
      READING_SUMMARY: '/api/reports/quick/reading-summary',
      CONNECTION_SEAL: '/api/reports/quick/connection-seal',
      PAYMENT_MODE: '/api/reports/quick/payment-mode',
      REVENUE_SUMMARY: '/api/reports/quick/revenue-summary',
      
      // Daily Reports
      GET_DAILY_REPORTS: '/api/reports/daily',
      DOWNLOAD_DAILY_REPORT: '/api/reports/daily/download',
      AUTO_GENERATE_REPORT: '/api/reports/daily/auto-generate',
    },

    // Master Data
    MASTER: {
      GET_ZONES: '/api/master/zones',
      GET_WARDS: '/api/master/wards',
      GET_WARDS_BY_ZONE: '/api/master/wards/by-zone',
      GET_AREAS: '/api/master/areas',
      GET_BILL_TYPES: '/api/master/bill-types',
      GET_CONNECTION_TYPES: '/api/master/connection-types',
      GET_PAYMENT_MODES: '/api/master/payment-modes',
      GET_ACCOUNTANTS: '/api/master/accountants',
      GET_METER_READERS: '/api/master/meter-readers',
      GET_FINANCIAL_YEARS: '/api/master/financial-years',
      GET_BILLING_MONTHS: '/api/master/billing-months',
    },

    // SMS Management
    SMS: {
      GET_SMS_TEMPLATES: '/api/sms/templates',
      SEND_SMS: '/api/sms/send',
      SEND_BULK_SMS: '/api/sms/send-bulk',
      GET_SMS_HISTORY: '/api/sms/history',
      GET_SMS_STATS: '/api/sms/statistics',
      GET_DELIVERY_STATUS: '/api/sms/delivery-status',
      UPDATE_TEMPLATE: '/api/sms/template/update',
      GET_BALANCE: '/api/sms/balance',
    },

    // AI & Search
    AI: {
      SEARCH: '/api/ai/search',
      GET_INSIGHTS: '/api/ai/insights',
      ANALYZE_REPORT: '/api/ai/analyze',
      GET_SUGGESTIONS: '/api/ai/suggestions',
      NATURAL_LANGUAGE_QUERY: '/api/ai/nlp-query',
    },

    // Download Log
    DOWNLOAD: {
      GET_LOG: '/api/download/log',
      GET_LOG_FILTERS: '/api/download/log/filters',
      REDOWNLOAD: '/api/download/redownload',
      DELETE_LOG_ENTRY: '/api/download/log/delete',
    },

    // Dashboard & Analytics
    DASHBOARD: {
      GET_KPI_DATA: '/api/dashboard/kpi',
      GET_COLLECTION_SUMMARY: '/api/dashboard/collection-summary',
      GET_CHARTS_DATA: '/api/dashboard/charts',
      GET_NOTIFICATIONS: '/api/dashboard/notifications',
      GET_RECENT_ACTIVITIES: '/api/dashboard/recent-activities',
    },

    // Work Session Management
    SESSION: {
      GET_WORK_SUMMARY: '/api/session/work-summary',
      GET_DOWNLOADED_REPORTS: '/api/session/downloaded-reports',
      GET_SEARCH_HISTORY: '/api/session/search-history',
      GET_SESSION_BY_DATE: '/api/session/by-date',
    },
  },

  // Request timeout (in milliseconds)
  TIMEOUT: 30000,

  // Retry configuration
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
  },

  // File upload limits
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ['.xlsx', '.xls', '.csv', '.pdf'],
  },
};

/**
 * Environment-specific configurations
 */
export const getEnvironmentConfig = () => {
  const env = process.env.NEXT_PUBLIC_ENV || 'development';
  
  const configs = {
    development: {
      BASE_URL: 'http://localhost:5000',
      DEBUG: true,
    },
    staging: {
      BASE_URL: 'https://staging-api.mahawaterbilling.gov.in',
      DEBUG: true,
    },
    production: {
      BASE_URL: 'https://api.mahawaterbilling.gov.in',
      DEBUG: false,
    },
  };

  return configs[env as keyof typeof configs] || configs.development;
};
