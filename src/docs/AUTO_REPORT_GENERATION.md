# 🤖 Auto Report Generation Feature

## Overview
The Maharashtra Water Billing Dashboard now includes an intelligent **Auto Report Generation** system that learns from user behavior and automatically generates daily reports based on usage patterns.

---

## 🎯 Key Features

### 1. **Smart Pattern Detection**
- Automatically tracks all report generations (searches and exports)
- Detects when users generate the same report consistently (3+ days)
- Identifies daily patterns across different report types

### 2. **Auto-Generation on App Close**
- When closing the app, checks for daily report patterns
- Automatically generates reports that haven't been created today
- Shows a beautiful notification with report details

### 3. **Bilingual Support**
- Full support for English and Marathi languages
- Language selector in header (🌐 dropdown)
- All notifications and messages adapt to selected language

### 4. **Report Tracking History**
- Stores last 30 days of report generation history
- Tracks report type, name, filters, and timestamps
- Uses browser localStorage for persistence

---

## 📊 How It Works

### Pattern Detection Algorithm

```
1. User generates reports normally (Search/Export)
   ↓
2. System tracks each generation with metadata
   ↓
3. After 3+ consecutive/near-consecutive days:
   → Pattern detected for that report type
   ↓
4. On next app load or close:
   → If pattern exists AND report not generated today
   → Auto-generate the report
   ↓
5. Show notification to user with report details
```

### Report History Storage

Each report generation saves:
```typescript
{
  reportType: 'engine' | 'collection' | 'crm',
  reportName: string,
  filters: object,
  timestamp: number,
  date: 'YYYY-MM-DD'
}
```

---

## 🚀 Usage

### For End Users

#### Enabling Auto-Generation:
1. **Generate the same report for 3+ days**
   - Example: Generate "Mutation Report" on Monday, Tuesday, Wednesday
   
2. **Pattern is automatically detected**
   - No manual configuration needed
   - System learns from your behavior

3. **Auto-generation triggers on:**
   - App startup (if pattern exists and report not generated today)
   - App close (using beforeunload event)

#### Viewing Auto-Generated Reports:
When a report is auto-generated, you'll see:
- ✅ **Green success notification** with checkmark animation
- 📄 **Report name and type** displayed
- 📅 **Generation date and time**
- 💾 **"Download Now" button** to access the report
- 🌐 **Message in your selected language** (English/Marathi)

### Language Selection:
1. Click the **Languages dropdown** in the header (🌐 icon)
2. Select **English** or **मराठी**
3. All auto-report notifications will use selected language

---

## 🔧 Technical Details

### Components

#### 1. **AutoReportNotification.tsx**
Beautiful modal dialog that shows when reports are auto-generated:
- Green gradient header with animated checkmark
- Report details with type badge
- Generation date/time
- Download and Close action buttons
- Smooth animations and transitions

#### 2. **reportTracking.ts** (Utility)
Core tracking and pattern detection logic:

**Functions:**
- `saveReportToHistory()` - Saves report generation
- `getReportHistory()` - Retrieves all history
- `detectDailyPattern()` - Finds recurring patterns
- `wasGeneratedToday()` - Checks if already generated
- `getLastReportConfig()` - Gets most recent config
- `clearOldHistory()` - Maintenance cleanup

### State Management

#### App.tsx State:
```typescript
const [autoReportNotification, setAutoReportNotification] = useState({
  isOpen: boolean,
  reportName: string,
  reportType: string
});

const [language, setLanguage] = useState<'en' | 'mr'>('en');
```

### Event Listeners

#### beforeunload Event:
Triggers when user closes browser/tab:
```typescript
window.addEventListener('beforeunload', handleBeforeUnload);
```

Checks for patterns and auto-generates if needed.

---

## 📱 UI/UX Design

### Notification Design:
- **Colors**: Green gradient (#10B981 → #059669)
- **Icons**: CheckCircle2, Download, Calendar from lucide-react
- **Animations**: 
  - Scale and rotate entrance for checkmark
  - Slide-in for content
  - Shimmer effect on header
- **Responsive**: Works on mobile and desktop

### Header Language Selector:
- **Position**: Top right, next to Zone selector
- **Icon**: Languages (🌐)
- **Options**: English | मराठी
- **Style**: Matches dashboard gradient theme

---

## 🎨 Styling

### Color Scheme:
- **Success**: Green (#10B981, #059669)
- **Info**: Blue (#005AA7, #00C6FF)
- **Background**: White/95 with backdrop blur
- **Text**: Gray-900 (primary), Gray-600 (secondary)

### Typography:
- Follows Maharashtra dashboard standards
- Uses system default fonts for Marathi
- Responsive text sizing (xs, sm, base)

---

## 🔐 Data Privacy & Storage

### LocalStorage Usage:
- Key: `'maharashtra_water_report_history'`
- Max retention: 30 days
- Automatic cleanup of old entries
- No sensitive data stored (only report metadata)

### Data Stored:
✅ Report types and names  
✅ Generation timestamps  
✅ Filter configurations (non-sensitive)  
❌ No user credentials  
❌ No personal information  
❌ No actual report data

---

## 🧪 Testing the Feature

### Test Scenario 1: Pattern Detection
```
Day 1: Generate "Mutation Report" → Export
Day 2: Generate "Mutation Report" → Export  
Day 3: Generate "Mutation Report" → Export
Day 4: Open app → See auto-generation notification ✅
```

### Test Scenario 2: Language Switching
```
1. Set language to Marathi in header
2. Generate reports for 3 days
3. Day 4: Open app
4. See notification in Marathi ✅
```

### Test Scenario 3: Multiple Report Types
```
- Pattern A: "Mutation Report" (CRM section)
- Pattern B: "Connection Report" (Engine section)
- Both auto-generate independently ✅
```

---

## ⚙️ Configuration

### Customizing Pattern Threshold:
In `/utils/reportTracking.ts`:
```typescript
const PATTERN_THRESHOLD = 3; // Change to 2, 4, 5, etc.
```

### Adjusting History Retention:
```typescript
const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
// Change 30 to desired number of days
```

---

## 🐛 Troubleshooting

### Issue: Notifications Not Showing
**Solution**: 
- Check localStorage is enabled
- Ensure 3+ days of report generation
- Verify browser supports beforeunload

### Issue: Wrong Language in Notification
**Solution**:
- Check language selector in header
- Refresh page after language change
- Clear browser cache if needed

### Issue: Pattern Not Detected
**Solution**:
- Generate same report 3+ consecutive days
- Ensure report name matches exactly
- Check browser console for errors

---

## 📈 Future Enhancements

### Planned Features:
- [ ] Email notifications for auto-generated reports
- [ ] Custom scheduling (weekly, monthly patterns)
- [ ] Pattern analytics dashboard
- [ ] Export pattern history
- [ ] Multi-user pattern sharing
- [ ] Cloud storage integration
- [ ] Advanced filtering options

### Suggested Improvements:
- [ ] Machine learning for smarter pattern detection
- [ ] Predictive generation before user needs
- [ ] Integration with mobile app
- [ ] Push notifications
- [ ] Report generation queue

---

## 📚 Related Documentation

- [Main Dashboard Guidelines](/guidelines/Guidelines.md)
- [Component Architecture](/components/README.md)
- [State Management](/docs/STATE_MANAGEMENT.md)
- [Bilingual Support](/docs/BILINGUAL_GUIDE.md)

---

## 💡 Tips & Best Practices

### For Users:
1. ✅ Generate reports at the same time daily for consistent patterns
2. ✅ Use the Export button to track generation history
3. ✅ Set your preferred language before generating reports
4. ✅ Check notifications on app startup

### For Developers:
1. ✅ Always test with localStorage cleared
2. ✅ Verify pattern detection logic with console logs
3. ✅ Test bilingual content thoroughly
4. ✅ Handle edge cases (no history, corrupted data)
5. ✅ Keep notification animations performant

---

## 📞 Support

For issues or questions about Auto Report Generation:
- **Email**: support@maharashtra-water.gov.in
- **Helpline**: 1800-123-4567
- **GitHub**: [Report an issue]

---

## 🎓 Example Code

### Manually Trigger Auto-Generation:
```typescript
import { detectDailyPattern, saveReportToHistory } from './utils/reportTracking';

// Check for patterns
const pattern = detectDailyPattern();

if (pattern) {
  console.log('Pattern found:', pattern.reportName);
  
  // Show notification
  setAutoReportNotification({
    isOpen: true,
    reportName: pattern.reportName,
    reportType: pattern.reportType
  });
}
```

### Save Custom Report:
```typescript
saveReportToHistory(
  'crm',                    // Report type
  'Mutation Report',        // Report name
  { zone: 'A', date: '...' } // Custom filters
);
```

---

**Last Updated**: November 10, 2025  
**Version**: 1.0.0  
**Author**: Maharashtra Water Management Team
