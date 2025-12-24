/**
 * Master Data Hook
 * Provides master data (zones, wards, etc.) with caching
 */

import { useState, useEffect, useCallback } from 'react';
import { masterService } from '../services/master.service';
import {
  Zone,
  Ward,
  BillType,
  ConnectionType,
  PaymentMode,
  Accountant,
  MeterReader,
  FinancialYear,
  BillingMonth,
} from '../types/api.types';
import { toast } from 'sonner@2.0.3';

export function useMasterData() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [billTypes, setBillTypes] = useState<BillType[]>([]);
  const [connectionTypes, setConnectionTypes] = useState<ConnectionType[]>([]);
  const [paymentModes, setPaymentModes] = useState<PaymentMode[]>([]);
  const [financialYears, setFinancialYears] = useState<FinancialYear[]>([]);
  const [billingMonths, setBillingMonths] = useState<BillingMonth[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load all master data on mount
   */
  useEffect(() => {
    loadAllMasterData();
  }, []);

  /**
   * Load all master data
   */
  const loadAllMasterData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [
        zonesData,
        wardsData,
        billTypesData,
        connectionTypesData,
        paymentModesData,
        financialYearsData,
        billingMonthsData,
      ] = await Promise.all([
        masterService.getZones(),
        masterService.getWards(),
        masterService.getBillTypes(),
        masterService.getConnectionTypes(),
        masterService.getPaymentModes(),
        masterService.getFinancialYears(),
        masterService.getBillingMonths(),
      ]);

      setZones(zonesData);
      setWards(wardsData);
      setBillTypes(billTypesData);
      setConnectionTypes(connectionTypesData);
      setPaymentModes(paymentModesData);
      setFinancialYears(financialYearsData);
      setBillingMonths(billingMonthsData);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to load master data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get wards by zone ID
   */
  const getWardsByZone = useCallback(
    async (zoneId: string): Promise<Ward[]> => {
      try {
        const data = await masterService.getWardsByZone(zoneId);
        return data;
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch wards');
        return [];
      }
    },
    []
  );

  /**
   * Refresh master data cache
   */
  const refreshMasterData = useCallback(async () => {
    masterService.clearCache();
    await loadAllMasterData();
    toast.success('Master data refreshed');
  }, [loadAllMasterData]);

  return {
    zones,
    wards,
    billTypes,
    connectionTypes,
    paymentModes,
    financialYears,
    billingMonths,
    isLoading,
    error,
    getWardsByZone,
    refreshMasterData,
  };
}

/**
 * Hook for Accountants
 */
export function useAccountants() {
  const [accountants, setAccountants] = useState<Accountant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAccountants();
  }, []);

  const loadAccountants = async () => {
    setIsLoading(true);
    try {
      const data = await masterService.getAccountants();
      setAccountants(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load accountants');
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountantsByZone = useCallback(async (zoneId: string) => {
    try {
      const data = await masterService.getAccountantsByZone(zoneId);
      return data;
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch accountants');
      return [];
    }
  }, []);

  return {
    accountants,
    isLoading,
    getAccountantsByZone,
  };
}

/**
 * Hook for Meter Readers
 */
export function useMeterReaders() {
  const [meterReaders, setMeterReaders] = useState<MeterReader[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMeterReaders();
  }, []);

  const loadMeterReaders = async () => {
    setIsLoading(true);
    try {
      const data = await masterService.getMeterReaders();
      setMeterReaders(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load meter readers');
    } finally {
      setIsLoading(false);
    }
  };

  const getMeterReadersByZone = useCallback(async (zoneId: string) => {
    try {
      const data = await masterService.getMeterReadersByZone(zoneId);
      return data;
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch meter readers');
      return [];
    }
  }, []);

  const getMeterReadersByWard = useCallback(async (wardId: string) => {
    try {
      const data = await masterService.getMeterReadersByWard(wardId);
      return data;
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch meter readers');
      return [];
    }
  }, []);

  return {
    meterReaders,
    isLoading,
    getMeterReadersByZone,
    getMeterReadersByWard,
  };
}
