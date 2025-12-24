/**
 * Reports Service
 * Handles all report generation, fetching, and export operations
 */

import { API_CONFIG } from '../config/api.config';
import { get, post, downloadFile, buildQueryString } from './api.service';
import {
  ReportListItem,
  ReportGenerationRequest,
  ReportData,
  ReportFilters,
  TopDefaulterData,
  PendingReadingData,
  ClosedConnectionData,
  CollectionReportData,
  DayWiseCollectionData,
  MonthlyCollectionData,
  PaginatedResponse,
  DownloadLogEntry,
} from '../types/api.types';

class ReportsService {
  // ============================================
  // General Report Operations
  // ============================================

  /**
   * Get list of available reports
   */
  async getReportList(category?: string): Promise<ReportListItem[]> {
    const queryString = category ? `?category=${category}` : '';
    const response = await get<ReportListItem[]>(
      `${API_CONFIG.ENDPOINTS.REPORTS.GET_REPORT_LIST}${queryString}`
    );
    return response.data;
  }

  /**
   * Generate report with filters
   */
  async generateReport(request: ReportGenerationRequest): Promise<ReportData> {
    const response = await post<ReportData>(
      API_CONFIG.ENDPOINTS.REPORTS.GENERATE_REPORT,
      request
    );
    return response.data;
  }

  /**
   * Get report data by ID
   */
  async getReportData(reportId: string, filters?: ReportFilters): Promise<ReportData> {
    const queryString = filters ? `?${buildQueryString(filters)}` : '';
    const response = await get<ReportData>(
      `${API_CONFIG.ENDPOINTS.REPORTS.GET_REPORT_DATA}/${reportId}${queryString}`
    );
    return response.data;
  }

  /**
   * Export report to file
   */
  async exportReport(
    reportId: string,
    format: 'excel' | 'pdf' | 'csv',
    filters?: ReportFilters,
    fileName?: string
  ): Promise<void> {
    const queryParams = {
      format,
      ...filters,
    };
    
    const queryString = buildQueryString(queryParams);
    const defaultFileName = `Report_${reportId}_${Date.now()}.${format === 'excel' ? 'xlsx' : format}`;
    
    await downloadFile(
      `${API_CONFIG.ENDPOINTS.REPORTS.EXPORT_REPORT}/${reportId}?${queryString}`,
      fileName || defaultFileName
    );
  }

  /**
   * Get report generation history
   */
  async getReportHistory(
    pageNumber: number = 1,
    pageSize: number = 20,
    filters?: Partial<ReportFilters>
  ): Promise<PaginatedResponse<DownloadLogEntry>> {
    const queryParams = {
      pageNumber,
      pageSize,
      ...filters,
    };
    
    const queryString = buildQueryString(queryParams);
    const response = await get<PaginatedResponse<DownloadLogEntry>>(
      `${API_CONFIG.ENDPOINTS.REPORTS.GET_REPORT_HISTORY}?${queryString}`
    );
    return response.data;
  }

  // ============================================
  // Collection Reports
  // ============================================

  /**
   * Get day-wise collection report
   */
  async getDayWiseCollection(filters: ReportFilters): Promise<DayWiseCollectionData[]> {
    const queryString = buildQueryString(filters);
    const response = await get<DayWiseCollectionData[]>(
      `${API_CONFIG.ENDPOINTS.REPORTS.DAY_WISE_COLLECTION}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get monthly collection report
   */
  async getMonthlyCollection(filters: ReportFilters): Promise<MonthlyCollectionData> {
    const queryString = buildQueryString(filters);
    const response = await get<MonthlyCollectionData>(
      `${API_CONFIG.ENDPOINTS.REPORTS.MONTHLY_COLLECTION}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get collection details
   */
  async getCollectionDetails(filters: ReportFilters): Promise<CollectionReportData[]> {
    const queryString = buildQueryString(filters);
    const response = await get<CollectionReportData[]>(
      `${API_CONFIG.ENDPOINTS.REPORTS.COLLECTION_DETAILS}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get accountant report
   */
  async getAccountantReport(filters: ReportFilters): Promise<CollectionReportData[]> {
    const queryString = buildQueryString(filters);
    const response = await get<CollectionReportData[]>(
      `${API_CONFIG.ENDPOINTS.REPORTS.ACCOUNTANT_REPORT}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get zone-wise collection report
   */
  async getZoneWiseCollection(filters: ReportFilters): Promise<CollectionReportData[]> {
    const queryString = buildQueryString(filters);
    const response = await get<CollectionReportData[]>(
      `${API_CONFIG.ENDPOINTS.REPORTS.ZONE_WISE_COLLECTION}?${queryString}`
    );
    return response.data;
  }

  // ============================================
  // CRM Reports
  // ============================================

  /**
   * Get top defaulters report
   */
  async getTopDefaulters(
    filters: ReportFilters,
    pageNumber: number = 1,
    pageSize: number = 50
  ): Promise<PaginatedResponse<TopDefaulterData>> {
    const queryParams = {
      ...filters,
      pageNumber,
      pageSize,
    };
    
    const queryString = buildQueryString(queryParams);
    const response = await get<PaginatedResponse<TopDefaulterData>>(
      `${API_CONFIG.ENDPOINTS.REPORTS.TOP_DEFAULTERS}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get pending reading list
   */
  async getPendingReading(
    filters: ReportFilters,
    pageNumber: number = 1,
    pageSize: number = 50
  ): Promise<PaginatedResponse<PendingReadingData>> {
    const queryParams = {
      ...filters,
      pageNumber,
      pageSize,
    };
    
    const queryString = buildQueryString(queryParams);
    const response = await get<PaginatedResponse<PendingReadingData>>(
      `${API_CONFIG.ENDPOINTS.REPORTS.PENDING_READING}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get closed connection list
   */
  async getClosedConnections(
    filters: ReportFilters,
    pageNumber: number = 1,
    pageSize: number = 50
  ): Promise<PaginatedResponse<ClosedConnectionData>> {
    const queryParams = {
      ...filters,
      pageNumber,
      pageSize,
    };
    
    const queryString = buildQueryString(queryParams);
    const response = await get<PaginatedResponse<ClosedConnectionData>>(
      `${API_CONFIG.ENDPOINTS.REPORTS.CLOSED_CONNECTION}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get mutation report
   */
  async getMutationReport(filters: ReportFilters): Promise<any[]> {
    const queryString = buildQueryString(filters);
    const response = await get<any[]>(
      `${API_CONFIG.ENDPOINTS.REPORTS.MUTATION_REPORT}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get alteration report
   */
  async getAlterationReport(filters: ReportFilters): Promise<any[]> {
    const queryString = buildQueryString(filters);
    const response = await get<any[]>(
      `${API_CONFIG.ENDPOINTS.REPORTS.ALTERATION_REPORT}?${queryString}`
    );
    return response.data;
  }

  // ============================================
  // Quick Reports
  // ============================================

  /**
   * Get reading summary
   */
  async getReadingSummary(filters: ReportFilters): Promise<any> {
    const queryString = buildQueryString(filters);
    const response = await get(
      `${API_CONFIG.ENDPOINTS.REPORTS.READING_SUMMARY}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get connection seal report
   */
  async getConnectionSeal(filters: ReportFilters): Promise<any> {
    const queryString = buildQueryString(filters);
    const response = await get(
      `${API_CONFIG.ENDPOINTS.REPORTS.CONNECTION_SEAL}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get payment mode report
   */
  async getPaymentMode(filters: ReportFilters): Promise<any> {
    const queryString = buildQueryString(filters);
    const response = await get(
      `${API_CONFIG.ENDPOINTS.REPORTS.PAYMENT_MODE}?${queryString}`
    );
    return response.data;
  }

  /**
   * Get revenue summary
   */
  async getRevenueSummary(filters: ReportFilters): Promise<any> {
    const queryString = buildQueryString(filters);
    const response = await get(
      `${API_CONFIG.ENDPOINTS.REPORTS.REVENUE_SUMMARY}?${queryString}`
    );
    return response.data;
  }

  // ============================================
  // Daily Reports
  // ============================================

  /**
   * Get daily reports
   */
  async getDailyReports(date?: string): Promise<any[]> {
    const queryString = date ? `?date=${date}` : '';
    const response = await get(
      `${API_CONFIG.ENDPOINTS.REPORTS.GET_DAILY_REPORTS}${queryString}`
    );
    return response.data;
  }

  /**
   * Download daily report
   */
  async downloadDailyReport(
    reportId: string,
    date: string,
    format: 'excel' | 'pdf' = 'excel'
  ): Promise<void> {
    const fileName = `Daily_Report_${reportId}_${date}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
    
    await downloadFile(
      `${API_CONFIG.ENDPOINTS.REPORTS.DOWNLOAD_DAILY_REPORT}/${reportId}?date=${date}&format=${format}`,
      fileName
    );
  }

  /**
   * Auto-generate report (for daily pattern)
   */
  async autoGenerateReport(
    reportType: string,
    reportName: string,
    filters: ReportFilters
  ): Promise<void> {
    await post(API_CONFIG.ENDPOINTS.REPORTS.AUTO_GENERATE_REPORT, {
      reportType,
      reportName,
      filters,
    });
  }
}

export const reportsService = new ReportsService();
