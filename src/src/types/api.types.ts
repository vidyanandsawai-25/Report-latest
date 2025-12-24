/**
 * TypeScript Type Definitions for API Responses
 * Maharashtra Water Billing System
 */

// ============================================
// Common Types
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  errors?: ApiError[];
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// ============================================
// Authentication & User Types
// ============================================

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
  expiresIn: number;
}

export interface UserProfile {
  userId: string;
  userName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  designation: string;
  department: string;
  zoneAccess: string[];
  permissions: string[];
  lastLogin: string;
  profileImage?: string;
}

export interface UserSession {
  sessionId: string;
  loginDate: string;
  loginTime: string;
  logoutDate?: string;
  logoutTime?: string;
  ipAddress: string;
  deviceInfo: string;
}

// ============================================
// Report Types
// ============================================

export interface ReportListItem {
  reportId: string;
  reportName: string;
  reportNameMr: string;
  reportType: string;
  category: string;
  description: string;
  descriptionMr: string;
  icon: string;
  color: string;
  isActive: boolean;
  requiredFilters: string[];
}

export interface ReportGenerationRequest {
  reportId: string;
  reportName: string;
  filters: ReportFilters;
  exportFormat?: 'excel' | 'pdf' | 'csv';
  userId: string;
}

export interface ReportFilters {
  zoneId?: string;
  wardId?: string;
  areaId?: string;
  billType?: string;
  connectionType?: string;
  fromDate?: string;
  toDate?: string;
  financialYear?: string;
  billingMonth?: string;
  accountantId?: string;
  meterReaderId?: string;
  paymentMode?: string;
  amountFrom?: number;
  amountTo?: number;
  status?: string;
  customFilters?: Record<string, any>;
}

export interface ReportData {
  reportId: string;
  reportName: string;
  generatedDate: string;
  generatedBy: string;
  filters: ReportFilters;
  columns: ReportColumn[];
  rows: any[];
  summary?: ReportSummary;
  metadata: ReportMetadata;
}

export interface ReportColumn {
  key: string;
  label: string;
  labelMr: string;
  dataType: 'string' | 'number' | 'date' | 'boolean';
  format?: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
}

export interface ReportSummary {
  totalRecords: number;
  totalAmount?: number;
  totalCollection?: number;
  totalPending?: number;
  aggregations?: Record<string, any>;
}

export interface ReportMetadata {
  executionTime: number;
  dataSource: string;
  lastUpdated: string;
  version: string;
}

// ============================================
// Collection Report Types
// ============================================

export interface CollectionReportData {
  collectionId: string;
  date: string;
  zoneId: string;
  zoneName: string;
  wardId: string;
  wardName: string;
  accountantId: string;
  accountantName: string;
  totalCollection: number;
  cashCollection: number;
  onlineCollection: number;
  chequeCollection: number;
  totalBills: number;
  paidBills: number;
  pendingBills: number;
}

export interface DayWiseCollectionData extends CollectionReportData {
  collectionTime: string;
  receiptNumber: string;
  consumerNumber: string;
  consumerName: string;
  billAmount: number;
  paidAmount: number;
  paymentMode: string;
}

export interface MonthlyCollectionData {
  month: string;
  year: number;
  zoneWiseCollection: {
    zoneId: string;
    zoneName: string;
    totalCollection: number;
    target: number;
    achievement: number;
  }[];
  totalCollection: number;
  totalTarget: number;
  overallAchievement: number;
}

// ============================================
// CRM Report Types
// ============================================

export interface TopDefaulterData {
  consumerId: string;
  consumerNumber: string;
  consumerName: string;
  address: string;
  mobileNumber: string;
  zoneId: string;
  zoneName: string;
  wardId: string;
  wardName: string;
  connectionType: string;
  totalOutstanding: number;
  oldestBillDate: string;
  billCount: number;
  lastPaymentDate?: string;
  status: string;
}

export interface PendingReadingData {
  consumerId: string;
  consumerNumber: string;
  consumerName: string;
  address: string;
  mobileNumber: string;
  zoneId: string;
  zoneName: string;
  wardId: string;
  wardName: string;
  meterReaderId: string;
  meterReaderName: string;
  lastReadingDate: string;
  daysPending: number;
  meterNumber: string;
  connectionType: string;
}

export interface ClosedConnectionData {
  consumerId: string;
  consumerNumber: string;
  consumerName: string;
  address: string;
  mobileNumber: string;
  zoneId: string;
  zoneName: string;
  wardId: string;
  wardName: string;
  connectionType: string;
  closureDate: string;
  closureReason: string;
  finalBillAmount: number;
  outstandingAmount: number;
  securityDeposit: number;
  refundStatus: string;
}

// ============================================
// Master Data Types
// ============================================

export interface Zone {
  zoneId: string;
  zoneCode: string;
  zoneName: string;
  zoneNameMr: string;
  isActive: boolean;
}

export interface Ward {
  wardId: string;
  wardCode: string;
  wardName: string;
  wardNameMr: string;
  zoneId: string;
  zoneName: string;
  isActive: boolean;
}

export interface Area {
  areaId: string;
  areaCode: string;
  areaName: string;
  areaNameMr: string;
  wardId: string;
  wardName: string;
  isActive: boolean;
}

export interface BillType {
  billTypeId: string;
  billTypeCode: string;
  billTypeName: string;
  billTypeNameMr: string;
  isActive: boolean;
}

export interface ConnectionType {
  connectionTypeId: string;
  connectionTypeCode: string;
  connectionTypeName: string;
  connectionTypeNameMr: string;
  isActive: boolean;
}

export interface PaymentMode {
  paymentModeId: string;
  paymentModeCode: string;
  paymentModeName: string;
  paymentModeNameMr: string;
  isActive: boolean;
}

export interface Accountant {
  accountantId: string;
  accountantCode: string;
  accountantName: string;
  accountantNameMr: string;
  mobileNumber: string;
  email: string;
  zoneId: string;
  zoneName: string;
  isActive: boolean;
}

export interface MeterReader {
  meterReaderId: string;
  meterReaderCode: string;
  meterReaderName: string;
  meterReaderNameMr: string;
  mobileNumber: string;
  zoneId: string;
  zoneName: string;
  wardId: string;
  wardName: string;
  isActive: boolean;
}

export interface FinancialYear {
  financialYearId: string;
  yearCode: string;
  yearName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isCurrent: boolean;
}

export interface BillingMonth {
  monthId: string;
  monthCode: string;
  monthName: string;
  monthNameMr: string;
  monthNumber: number;
  isActive: boolean;
}

// ============================================
// SMS Management Types
// ============================================

export interface SMSTemplate {
  templateId: string;
  templateCode: string;
  templateName: string;
  templateNameMr: string;
  templateText: string;
  templateTextMr: string;
  category: string;
  variables: string[];
  isActive: boolean;
}

export interface SendSMSRequest {
  templateId: string;
  recipients: SMSRecipient[];
  variables?: Record<string, string>;
  scheduledDate?: string;
  priority?: 'high' | 'normal' | 'low';
}

export interface SMSRecipient {
  recipientId: string;
  recipientName: string;
  mobileNumber: string;
  customVariables?: Record<string, string>;
}

export interface SMSHistory {
  smsId: string;
  templateId: string;
  templateName: string;
  recipientName: string;
  mobileNumber: string;
  messageText: string;
  sentDate: string;
  sentTime: string;
  deliveryStatus: 'sent' | 'delivered' | 'failed' | 'pending';
  deliveryTime?: string;
  failureReason?: string;
  cost: number;
  sentBy: string;
}

export interface SMSStatistics {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  totalPending: number;
  deliveryRate: number;
  totalCost: number;
  periodStart: string;
  periodEnd: string;
  categoryWiseStats: {
    category: string;
    count: number;
    deliveryRate: number;
  }[];
}

// ============================================
// Download Log Types
// ============================================

export interface DownloadLogEntry {
  logId: string;
  reportName: string;
  reportNameMr: string;
  reportType: string;
  downloadDate: string;
  downloadTime: string;
  fileFormat: string;
  fileSize: string;
  filePath: string;
  userId: string;
  userName: string;
  filters: ReportFilters;
  status: 'success' | 'failed';
}

// ============================================
// Dashboard & Analytics Types
// ============================================

export interface KPIData {
  label: string;
  labelMr: string;
  value: string | number;
  trend?: number;
  trendDirection?: 'up' | 'down';
  icon: string;
  color: string;
}

export interface CollectionSummary {
  today: number;
  thisWeek: number;
  thisMonth: number;
  thisYear: number;
  todayTarget: number;
  monthlyTarget: number;
  yearlyTarget: number;
  todayAchievement: number;
  monthlyAchievement: number;
  yearlyAchievement: number;
}

export interface ChartData {
  chartId: string;
  chartType: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  titleMr: string;
  data: any[];
  xAxisKey: string;
  yAxisKey: string;
  categories?: string[];
}

// ============================================
// AI & Search Types
// ============================================

export interface AISearchRequest {
  query: string;
  language: 'en' | 'mr';
  filters?: Record<string, any>;
  maxResults?: number;
}

export interface AISearchResult {
  resultId: string;
  resultType: 'report' | 'consumer' | 'document' | 'insight';
  title: string;
  description: string;
  relevanceScore: number;
  data: any;
  link?: string;
}

export interface AIInsight {
  insightId: string;
  insightType: 'anomaly' | 'trend' | 'prediction' | 'recommendation';
  title: string;
  titleMr: string;
  description: string;
  descriptionMr: string;
  severity: 'high' | 'medium' | 'low';
  confidence: number;
  data: any;
  actionItems?: string[];
  createdDate: string;
}

// ============================================
// Work Session Types
// ============================================

export interface WorkSummary {
  sessionDate: string;
  loginTime: string;
  logoutTime?: string;
  duration: number;
  downloadedReports: DownloadedReportSummary[];
  searchQueries: SearchQuery[];
  activitiesCount: number;
}

export interface DownloadedReportSummary {
  reportName: string;
  downloadTime: string;
  fileFormat: string;
  fileSize: string;
}

export interface SearchQuery {
  query: string;
  timestamp: string;
  resultsCount: number;
}
