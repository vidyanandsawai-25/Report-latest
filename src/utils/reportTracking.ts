// Utility functions for tracking and detecting daily report patterns

export interface ReportHistory {
  reportType: string;
  reportName: string;
  filters: any;
  timestamp: number;
  date: string;
}

const STORAGE_KEY = 'maharashtra_water_report_history';
const PATTERN_THRESHOLD = 3; // Number of consecutive days to detect a pattern

// Save report generation to history
export function saveReportToHistory(
  reportType: string,
  reportName: string,
  filters: any
): void {
  try {
    const history = getReportHistory();
    const today = new Date().toISOString().split('T')[0];
    
    const newEntry: ReportHistory = {
      reportType,
      reportName,
      filters,
      timestamp: Date.now(),
      date: today,
    };
    
    history.push(newEntry);
    
    // Keep only last 30 days of history
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const filteredHistory = history.filter(
      (entry) => entry.timestamp > thirtyDaysAgo
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
  } catch (error) {
    console.error('Error saving report history:', error);
  }
}

// Get all report history
export function getReportHistory(): ReportHistory[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading report history:', error);
    return [];
  }
}

// Detect if user has a daily pattern for a specific report
export function detectDailyPattern(): ReportHistory | null {
  try {
    const history = getReportHistory();
    if (history.length < PATTERN_THRESHOLD) {
      return null;
    }
    
    // Group reports by type and name
    const reportGroups = new Map<string, ReportHistory[]>();
    
    history.forEach((entry) => {
      const key = `${entry.reportType}-${entry.reportName}`;
      if (!reportGroups.has(key)) {
        reportGroups.set(key, []);
      }
      reportGroups.get(key)!.push(entry);
    });
    
    // Check each group for daily pattern
    for (const [_, reports] of reportGroups) {
      if (reports.length < PATTERN_THRESHOLD) continue;
      
      // Sort by date
      reports.sort((a, b) => b.timestamp - a.timestamp);
      
      // Check if generated on consecutive or near-consecutive days
      const uniqueDates = new Set(reports.slice(0, 7).map((r) => r.date));
      
      if (uniqueDates.size >= PATTERN_THRESHOLD) {
        // Pattern detected - return the most recent report config
        return reports[0];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error detecting pattern:', error);
    return null;
  }
}

// Check if report was already generated today
export function wasGeneratedToday(reportType: string, reportName: string): boolean {
  try {
    const history = getReportHistory();
    const today = new Date().toISOString().split('T')[0];
    
    return history.some(
      (entry) =>
        entry.date === today &&
        entry.reportType === reportType &&
        entry.reportName === reportName
    );
  } catch (error) {
    console.error('Error checking today generation:', error);
    return false;
  }
}

// Get the most recent report configuration for auto-generation
export function getLastReportConfig(reportType: string): ReportHistory | null {
  try {
    const history = getReportHistory();
    const filtered = history.filter((entry) => entry.reportType === reportType);
    
    if (filtered.length === 0) return null;
    
    // Return most recent
    filtered.sort((a, b) => b.timestamp - a.timestamp);
    return filtered[0];
  } catch (error) {
    console.error('Error getting last report config:', error);
    return null;
  }
}

// Clear old history (for maintenance)
export function clearOldHistory(): void {
  try {
    const history = getReportHistory();
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const filtered = history.filter((entry) => entry.timestamp > sevenDaysAgo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error clearing old history:', error);
  }
}
