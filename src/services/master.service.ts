/**
 * Master Data Service
 * Handles fetching master data like zones, wards, bill types, etc.
 */

import { API_CONFIG } from '../config/api.config';
import { get } from './api.service';
import {
  Zone,
  Ward,
  Area,
  BillType,
  ConnectionType,
  PaymentMode,
  Accountant,
  MeterReader,
  FinancialYear,
  BillingMonth,
} from '../types/api.types';

class MasterService {
  // Cache for master data to avoid repeated API calls
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  /**
   * Get cached data or fetch from API
   */
  private async getCachedOrFetch<T>(
    cacheKey: string,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const cached = this.cache.get(cacheKey);
    const now = Date.now();

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      return cached.data as T;
    }

    const data = await fetchFn();
    this.cache.set(cacheKey, { data, timestamp: now });
    return data;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear specific cache entry
   */
  clearCacheEntry(key: string): void {
    this.cache.delete(key);
  }

  // ============================================
  // Zone Management
  // ============================================

  /**
   * Get all zones
   */
  async getZones(): Promise<Zone[]> {
    return this.getCachedOrFetch('zones', async () => {
      const response = await get<Zone[]>(API_CONFIG.ENDPOINTS.MASTER.GET_ZONES);
      return response.data;
    });
  }

  // ============================================
  // Ward Management
  // ============================================

  /**
   * Get all wards
   */
  async getWards(): Promise<Ward[]> {
    return this.getCachedOrFetch('wards', async () => {
      const response = await get<Ward[]>(API_CONFIG.ENDPOINTS.MASTER.GET_WARDS);
      return response.data;
    });
  }

  /**
   * Get wards by zone ID
   */
  async getWardsByZone(zoneId: string): Promise<Ward[]> {
    const cacheKey = `wards_zone_${zoneId}`;
    return this.getCachedOrFetch(cacheKey, async () => {
      const response = await get<Ward[]>(
        `${API_CONFIG.ENDPOINTS.MASTER.GET_WARDS_BY_ZONE}/${zoneId}`
      );
      return response.data;
    });
  }

  // ============================================
  // Area Management
  // ============================================

  /**
   * Get all areas
   */
  async getAreas(): Promise<Area[]> {
    return this.getCachedOrFetch('areas', async () => {
      const response = await get<Area[]>(API_CONFIG.ENDPOINTS.MASTER.GET_AREAS);
      return response.data;
    });
  }

  /**
   * Get areas by ward ID
   */
  async getAreasByWard(wardId: string): Promise<Area[]> {
    const cacheKey = `areas_ward_${wardId}`;
    return this.getCachedOrFetch(cacheKey, async () => {
      const response = await get<Area[]>(
        `${API_CONFIG.ENDPOINTS.MASTER.GET_AREAS}?wardId=${wardId}`
      );
      return response.data;
    });
  }

  // ============================================
  // Bill Types
  // ============================================

  /**
   * Get all bill types
   */
  async getBillTypes(): Promise<BillType[]> {
    return this.getCachedOrFetch('billTypes', async () => {
      const response = await get<BillType[]>(
        API_CONFIG.ENDPOINTS.MASTER.GET_BILL_TYPES
      );
      return response.data;
    });
  }

  // ============================================
  // Connection Types
  // ============================================

  /**
   * Get all connection types
   */
  async getConnectionTypes(): Promise<ConnectionType[]> {
    return this.getCachedOrFetch('connectionTypes', async () => {
      const response = await get<ConnectionType[]>(
        API_CONFIG.ENDPOINTS.MASTER.GET_CONNECTION_TYPES
      );
      return response.data;
    });
  }

  // ============================================
  // Payment Modes
  // ============================================

  /**
   * Get all payment modes
   */
  async getPaymentModes(): Promise<PaymentMode[]> {
    return this.getCachedOrFetch('paymentModes', async () => {
      const response = await get<PaymentMode[]>(
        API_CONFIG.ENDPOINTS.MASTER.GET_PAYMENT_MODES
      );
      return response.data;
    });
  }

  // ============================================
  // Accountants
  // ============================================

  /**
   * Get all accountants
   */
  async getAccountants(): Promise<Accountant[]> {
    return this.getCachedOrFetch('accountants', async () => {
      const response = await get<Accountant[]>(
        API_CONFIG.ENDPOINTS.MASTER.GET_ACCOUNTANTS
      );
      return response.data;
    });
  }

  /**
   * Get accountants by zone ID
   */
  async getAccountantsByZone(zoneId: string): Promise<Accountant[]> {
    const cacheKey = `accountants_zone_${zoneId}`;
    return this.getCachedOrFetch(cacheKey, async () => {
      const response = await get<Accountant[]>(
        `${API_CONFIG.ENDPOINTS.MASTER.GET_ACCOUNTANTS}?zoneId=${zoneId}`
      );
      return response.data;
    });
  }

  // ============================================
  // Meter Readers
  // ============================================

  /**
   * Get all meter readers
   */
  async getMeterReaders(): Promise<MeterReader[]> {
    return this.getCachedOrFetch('meterReaders', async () => {
      const response = await get<MeterReader[]>(
        API_CONFIG.ENDPOINTS.MASTER.GET_METER_READERS
      );
      return response.data;
    });
  }

  /**
   * Get meter readers by zone ID
   */
  async getMeterReadersByZone(zoneId: string): Promise<MeterReader[]> {
    const cacheKey = `meterReaders_zone_${zoneId}`;
    return this.getCachedOrFetch(cacheKey, async () => {
      const response = await get<MeterReader[]>(
        `${API_CONFIG.ENDPOINTS.MASTER.GET_METER_READERS}?zoneId=${zoneId}`
      );
      return response.data;
    });
  }

  /**
   * Get meter readers by ward ID
   */
  async getMeterReadersByWard(wardId: string): Promise<MeterReader[]> {
    const cacheKey = `meterReaders_ward_${wardId}`;
    return this.getCachedOrFetch(cacheKey, async () => {
      const response = await get<MeterReader[]>(
        `${API_CONFIG.ENDPOINTS.MASTER.GET_METER_READERS}?wardId=${wardId}`
      );
      return response.data;
    });
  }

  // ============================================
  // Financial Years
  // ============================================

  /**
   * Get all financial years
   */
  async getFinancialYears(): Promise<FinancialYear[]> {
    return this.getCachedOrFetch('financialYears', async () => {
      const response = await get<FinancialYear[]>(
        API_CONFIG.ENDPOINTS.MASTER.GET_FINANCIAL_YEARS
      );
      return response.data;
    });
  }

  /**
   * Get current financial year
   */
  async getCurrentFinancialYear(): Promise<FinancialYear | null> {
    const years = await this.getFinancialYears();
    return years.find((year) => year.isCurrent) || null;
  }

  // ============================================
  // Billing Months
  // ============================================

  /**
   * Get all billing months
   */
  async getBillingMonths(): Promise<BillingMonth[]> {
    return this.getCachedOrFetch('billingMonths', async () => {
      const response = await get<BillingMonth[]>(
        API_CONFIG.ENDPOINTS.MASTER.GET_BILLING_MONTHS
      );
      return response.data;
    });
  }

  // ============================================
  // Batch Operations
  // ============================================

  /**
   * Preload all master data (useful on app initialization)
   */
  async preloadAllMasterData(): Promise<void> {
    await Promise.all([
      this.getZones(),
      this.getWards(),
      this.getBillTypes(),
      this.getConnectionTypes(),
      this.getPaymentModes(),
      this.getFinancialYears(),
      this.getBillingMonths(),
    ]);
  }
}

export const masterService = new MasterService();
