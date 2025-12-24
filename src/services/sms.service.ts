/**
 * SMS Management Service
 * Handles SMS template management, sending, and history tracking
 */

import { API_CONFIG } from '../config/api.config';
import { get, post, put, buildQueryString } from './api.service';
import {
  SMSTemplate,
  SendSMSRequest,
  SMSHistory,
  SMSStatistics,
  PaginatedResponse,
} from '../types/api.types';

class SMSService {
  /**
   * Get all SMS templates
   */
  async getSMSTemplates(category?: string): Promise<SMSTemplate[]> {
    const queryString = category ? `?category=${category}` : '';
    const response = await get<SMSTemplate[]>(
      `${API_CONFIG.ENDPOINTS.SMS.GET_SMS_TEMPLATES}${queryString}`
    );
    return response.data;
  }

  /**
   * Send single SMS
   */
  async sendSMS(request: SendSMSRequest): Promise<void> {
    await post(API_CONFIG.ENDPOINTS.SMS.SEND_SMS, request);
  }

  /**
   * Send bulk SMS
   */
  async sendBulkSMS(request: SendSMSRequest): Promise<{ successCount: number; failureCount: number }> {
    const response = await post<{ successCount: number; failureCount: number }>(
      API_CONFIG.ENDPOINTS.SMS.SEND_BULK_SMS,
      request
    );
    return response.data;
  }

  /**
   * Get SMS history with pagination
   */
  async getSMSHistory(
    pageNumber: number = 1,
    pageSize: number = 20,
    filters?: {
      fromDate?: string;
      toDate?: string;
      deliveryStatus?: string;
      templateId?: string;
    }
  ): Promise<PaginatedResponse<SMSHistory>> {
    const queryParams = {
      pageNumber,
      pageSize,
      ...filters,
    };
    
    const queryString = buildQueryString(queryParams);
    const response = await get<PaginatedResponse<SMSHistory>>(
      `${API_CONFIG.ENDPOINTS.SMS.GET_SMS_HISTORY}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get SMS statistics
   */
  async getSMSStatistics(
    fromDate?: string,
    toDate?: string
  ): Promise<SMSStatistics> {
    const queryParams = { fromDate, toDate };
    const queryString = buildQueryString(queryParams);
    const response = await get<SMSStatistics>(
      `${API_CONFIG.ENDPOINTS.SMS.GET_SMS_STATS}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get delivery status for a specific SMS
   */
  async getDeliveryStatus(smsId: string): Promise<SMSHistory> {
    const response = await get<SMSHistory>(
      `${API_CONFIG.ENDPOINTS.SMS.GET_DELIVERY_STATUS}/${smsId}`
    );
    return response.data;
  }

  /**
   * Update SMS template
   */
  async updateTemplate(
    templateId: string,
    data: Partial<SMSTemplate>
  ): Promise<SMSTemplate> {
    const response = await put<SMSTemplate>(
      `${API_CONFIG.ENDPOINTS.SMS.UPDATE_TEMPLATE}/${templateId}`,
      data
    );
    return response.data;
  }

  /**
   * Get SMS balance
   */
  async getSMSBalance(): Promise<{ balance: number; lastUpdated: string }> {
    const response = await get<{ balance: number; lastUpdated: string }>(
      API_CONFIG.ENDPOINTS.SMS.GET_BALANCE
    );
    return response.data;
  }
}

export const smsService = new SMSService();
