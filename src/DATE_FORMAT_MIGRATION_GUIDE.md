# Date Format Migration Guide - dd/mm/yy Standard

## Overview
This guide documents the migration to the standardized dd/mm/yy date format throughout the Maharashtra Water Billing Portal, as per Indian government standards.

## New Date Formatting Utilities

Location: `/src/lib/utils/format.ts`

### Available Functions

#### 1. `formatDate(date, format)`
Primary date formatting function with multiple output formats.

```typescript
import { formatDate } from '@/src/lib/utils/format';

// Usage examples:
formatDate(new Date())                    // "22/12/24" (dd/mm/yy)
formatDate(new Date(), 'short')           // "22/12/24" (dd/mm/yy)
formatDate(new Date(), 'long')            // "22 Dec 24" (dd MMM yy)
formatDate(new Date(), 'full')            // "22 December 24" (dd Month yy)
formatDate(new Date(), 'ddmmyyyy')        // "22/12/2024" (dd/mm/yyyy)

// Works with string dates too:
formatDate('2024-12-22')                  // "22/12/24"
formatDate('2024-12-22', 'long')          // "22 Dec 24"
```

#### 2. `formatDateTime(date)`
Formats date and time together in dd/mm/yy HH:mm format.

```typescript
import { formatDateTime } from '@/src/lib/utils/format';

formatDateTime(new Date())  // "22/12/24 14:30"
```

#### 3. `formatDateForFileName(date)`
Formats date for file names without slashes (ddmmyy).

```typescript
import { formatDateForFileName } from '@/src/lib/utils/format';

formatDateForFileName(new Date())  // "221224"

// Usage in file downloads:
const fileName = `report_${formatDateForFileName()}.xlsx`;
// Results in: "report_221224.xlsx"
```

## Migration Patterns

### Pattern 1: Replace toLocaleDateString()

**Before:**
```typescript
new Date().toLocaleDateString('en-IN', { 
  day: '2-digit', 
  month: '2-digit', 
  year: 'numeric' 
})
```

**After:**
```typescript
import { formatDate } from '@/src/lib/utils/format';

formatDate(new Date())  // or formatDate(new Date(), 'short')
```

### Pattern 2: Replace toLocaleDateString() with month names

**Before:**
```typescript
new Date().toLocaleDateString('en-IN', { 
  day: '2-digit', 
  month: 'short', 
  year: 'numeric' 
})
```

**After:**
```typescript
import { formatDate } from '@/src/lib/utils/format';

formatDate(new Date(), 'long')  // "22 Dec 24"
```

### Pattern 3: File Download Dates

**Before:**
```typescript
const fileName = `report_${new Date().toISOString().split('T')[0]}.csv`;
// Results in: "report_2024-12-22.csv"
```

**After:**
```typescript
import { formatDateForFileName } from '@/src/lib/utils/format';

const fileName = `report_${formatDateForFileName()}.csv`;
// Results in: "report_221224.csv"
```

### Pattern 4: Date and Time Display

**Before:**
```typescript
new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN')
```

**After:**
```typescript
import { formatDateTime } from '@/src/lib/utils/format';

formatDateTime(new Date())  // "22/12/24 14:30"
```

## Component Updates Required

### High Priority Components

#### 1. Header.tsx
- Update date display in header
- Update daily report download file names

#### 2. DailyReportReminder.tsx
- Update date display in reminder component
- Update file download names

#### 3. Report Tables
- TopDefaultersTable.tsx
- PendingReadingTable.tsx
- ClosedConnectionTable.tsx
- Update "Generated on" dates

#### 4. FilterPanel.tsx
- Update date range displays

#### 5. ZoneWiseCollectionReport.tsx
- Update formatDate local function
- Update "Printed On" date

#### 6. DataEngine Components
- DataEngine.tsx
- DataEngine-clean.tsx
- DataEngine-enhanced.tsx
- Update export file names and generated dates

#### 7. DownloadLogModal.tsx
✅ Already Updated

#### 8. ReportResultsTable.tsx
- Update due dates display
- Update "Generated on" display

#### 9. AutoReportNotification.tsx
- Update current date display

#### 10. LastWorkSummaryPopup.tsx
- Update session date displays

### Medium Priority Components

#### 11. SMSManager.tsx
- Update timestamp displays

#### 12. CollectionInsightsCard.tsx
- Update date displays in insights

#### 13. Export Functions
- Update all CSV/Excel/PDF export file names

## Implementation Checklist

- [x] Create centralized date formatting utilities in `/src/lib/utils/format.ts`
- [x] Add formatDate() function with multiple format options
- [x] Add formatDateTime() function
- [x] Add formatDateForFileName() function
- [x] Update DownloadLogModal.tsx
- [ ] Update Header.tsx
- [ ] Update DailyReportReminder.tsx
- [ ] Update TopDefaultersTable.tsx
- [ ] Update PendingReadingTable.tsx
- [ ] Update ClosedConnectionTable.tsx
- [ ] Update FilterPanel.tsx
- [ ] Update ZoneWiseCollectionReport.tsx
- [ ] Update DataEngine.tsx
- [ ] Update DataEngine-clean.tsx
- [ ] Update DataEngine-enhanced.tsx
- [ ] Update ReportResultsTable.tsx
- [ ] Update AutoReportNotification.tsx
- [ ] Update LastWorkSummaryPopup.tsx
- [ ] Update SMSManager.tsx
- [ ] Update all export functions

## Testing Checklist

After migration, verify:

- [ ] All dates display in dd/mm/yy format (e.g., 22/12/24)
- [ ] Date ranges show correctly (e.g., 01/01/24 → 31/12/24)
- [ ] File downloads have correct date format in filename
- [ ] "Generated on" timestamps are correct
- [ ] Date filters work correctly
- [ ] Date comparisons in sorting work correctly
- [ ] Invalid dates show empty string (not error)
- [ ] Historical data displays correctly

## Browser Compatibility

The new formatDate utility uses native JavaScript Date methods and does not rely on Intl.DateTimeFormat, ensuring:
- ✅ Consistent formatting across all browsers
- ✅ No timezone issues
- ✅ Fast performance
- ✅ Predictable output

## Important Notes

1. **Import Path**: Always import from `/src/lib/utils/format`
   ```typescript
   import { formatDate, formatDateTime, formatDateForFileName } from '@/src/lib/utils/format';
   ```

2. **Invalid Dates**: The utility returns empty string for invalid dates instead of throwing errors

3. **Year Format**: By default uses 2-digit year (24). Use 'ddmmyyyy' format for 4-digit year (2024)

4. **File Names**: Always use `formatDateForFileName()` for file names (no slashes)

5. **Marathi Language**: For Marathi dates, you may need to create a separate utility function or add localization support

## Example: Complete Component Update

**Before:**
```typescript
export function MyComponent() {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  
  const handleExport = () => {
    const fileName = `report_${new Date().toISOString().split('T')[0]}.csv`;
    // ... export logic
  };
  
  return (
    <div>
      <p>Generated: {currentDate}</p>
      <button onClick={handleExport}>Export</button>
    </div>
  );
}
```

**After:**
```typescript
import { formatDate, formatDateForFileName } from '@/src/lib/utils/format';

export function MyComponent() {
  const currentDate = formatDate(new Date(), 'long'); // "22 Dec 24"
  
  const handleExport = () => {
    const fileName = `report_${formatDateForFileName()}.csv`; // "report_221224.csv"
    // ... export logic
  };
  
  return (
    <div>
      <p>Generated: {currentDate}</p>
      <button onClick={handleExport}>Export</button>
    </div>
  );
}
```

## Support

For questions or issues related to date formatting:
1. Check this guide first
2. Review the utility functions in `/src/lib/utils/format.ts`
3. Test with different date inputs to ensure correct output

## Version History

- **v1.0** (22/12/24): Initial implementation with dd/mm/yy standard
  - Created formatDate() with multiple format options
  - Created formatDateTime() for combined date/time
  - Created formatDateForFileName() for downloads
  - Updated DownloadLogModal.tsx
