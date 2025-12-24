/**
 * Reports Hook
 * Provides report data fetching and management
 */

import { useState, useEffect, useCallback } from 'react';
import { reportsService } from '../services/reports.service';
import {
  ReportListItem,
  ReportData,
  ReportFilters,
  TopDefaulterData,
  PendingReadingData,
  ClosedConnectionData,
  PaginatedResponse,
} from '../types/api.types';
import { toast } from 'sonner@2.0.3';

export function useReports() {
  const [reportList, setReportList] = useState<ReportListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch report list
   */
  const fetchReportList = useCallback(async (category?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reportsService.getReportList(category);
      setReportList(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch report list';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Generate report
   */
  const generateReport = useCallback(
    async (reportId: string, reportName: string, filters: ReportFilters) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await reportsService.generateReport({
          reportId,
          reportName,
          filters,
          userId: '', // This should come from auth context
        });
        toast.success('Report generated successfully!');
        return data;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to generate report';
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Export report
   */
  const exportReport = useCallback(
    async (
      reportId: string,
      format: 'excel' | 'pdf' | 'csv',
      filters?: ReportFilters,
      fileName?: string
    ) => {
      setIsLoading(true);
      try {
        await reportsService.exportReport(reportId, format, filters, fileName);
        toast.success(`Report exported as ${format.toUpperCase()} successfully!`);
      } catch (err: any) {
        toast.error(err.message || 'Failed to export report');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    reportList,
    isLoading,
    error,
    fetchReportList,
    generateReport,
    exportReport,
  };
}

/**
 * Hook for Top Defaulters Report
 */
export function useTopDefaulters() {
  const [data, setData] = useState<TopDefaulterData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopDefaulters = useCallback(
    async (filters: ReportFilters, pageNumber: number = 1, pageSize: number = 50) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await reportsService.getTopDefaulters(filters, pageNumber, pageSize);
        setData(response.items);
        setTotalCount(response.totalCount);
        return response;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch top defaulters';
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    data,
    totalCount,
    isLoading,
    error,
    fetchTopDefaulters,
  };
}

/**
 * Hook for Pending Reading Report
 */
export function usePendingReading() {
  const [data, setData] = useState<PendingReadingData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPendingReading = useCallback(
    async (filters: ReportFilters, pageNumber: number = 1, pageSize: number = 50) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await reportsService.getPendingReading(filters, pageNumber, pageSize);
        setData(response.items);
        setTotalCount(response.totalCount);
        return response;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch pending reading list';
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    data,
    totalCount,
    isLoading,
    error,
    fetchPendingReading,
  };
}

/**
 * Hook for Closed Connection Report
 */
export function useClosedConnections() {
  const [data, setData] = useState<ClosedConnectionData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClosedConnections = useCallback(
    async (filters: ReportFilters, pageNumber: number = 1, pageSize: number = 50) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await reportsService.getClosedConnections(filters, pageNumber, pageSize);
        setData(response.items);
        setTotalCount(response.totalCount);
        return response;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to fetch closed connections';
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    data,
    totalCount,
    isLoading,
    error,
    fetchClosedConnections,
  };
}

/**
 * Hook for Collection Reports
 */
export function useCollectionReports() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDayWiseCollection = useCallback(async (filters: ReportFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reportsService.getDayWiseCollection(filters);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch day-wise collection';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMonthlyCollection = useCallback(async (filters: ReportFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reportsService.getMonthlyCollection(filters);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch monthly collection';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCollectionDetails = useCallback(async (filters: ReportFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reportsService.getCollectionDetails(filters);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch collection details';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAccountantReport = useCallback(async (filters: ReportFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reportsService.getAccountantReport(filters);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch accountant report';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchDayWiseCollection,
    fetchMonthlyCollection,
    fetchCollectionDetails,
    fetchAccountantReport,
  };
}
