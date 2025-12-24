# API Contract Document
## Maharashtra Water Billing System - Frontend ↔ Backend Integration

---

## 📋 Document Overview

This document defines the complete API contract between the Next.js frontend and .NET microservices backend. All endpoints, request/response formats, and data types are specified here.

**Version**: 1.0.0  
**Last Updated**: December 3, 2024  
**Status**: Production Ready

---

## 🔐 Authentication APIs

### 1. User Login

**Endpoint**: `POST /api/auth/login`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "username": "string (required, min: 3, max: 50)",
  "password": "string (required, min: 8)",
  "rememberMe": "boolean (optional, default: false)"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "accessToken": "string (JWT token)",
    "refreshToken": "string",
    "expiresIn": 3600,
    "user": {
      "userId": "string",
      "userName": "string",
      "fullName": "string",
      "email": "string",
      "phoneNumber": "string",
      "role": "string",
      "designation": "string",
      "department": "string",
      "zoneAccess": ["string"],
      "permissions": ["string"],
      "lastLogin": "ISO 8601 datetime",
      "profileImage": "string (URL, optional)"
    }
  },
  "message": "Login successful",
  "timestamp": "ISO 8601 datetime"
}
```

**Error Responses**:
- **400 Bad Request**: Invalid credentials format
- **401 Unauthorized**: Invalid username/password
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

---

### 2. Refresh Token

**Endpoint**: `POST /api/auth/refresh`

**Request Body**:
```json
{
  "refreshToken": "string (required)"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "accessToken": "string (new JWT token)"
  },
  "message": "Token refreshed successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 3. Get User Profile

**Endpoint**: `GET /api/auth/profile`

**Request Headers**:
```
Authorization: Bearer {accessToken}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "userId": "string",
    "userName": "string",
    "fullName": "string",
    "email": "string",
    "phoneNumber": "string",
    "role": "string",
    "designation": "string",
    "department": "string",
    "zoneAccess": ["string"],
    "permissions": ["string"],
    "lastLogin": "ISO 8601 datetime",
    "profileImage": "string (URL, optional)"
  },
  "message": "Profile retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 4. Logout

**Endpoint**: `POST /api/auth/logout`

**Request Headers**:
```
Authorization: Bearer {accessToken}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": null,
  "message": "Logout successful",
  "timestamp": "ISO 8601 datetime"
}
```

---

## 🗂️ Master Data APIs

### 1. Get Zones

**Endpoint**: `GET /api/master/zones`

**Request Headers**:
```
Authorization: Bearer {accessToken}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "zoneId": "string",
      "zoneCode": "string",
      "zoneName": "string",
      "zoneNameMr": "string (Marathi name)",
      "isActive": true
    }
  ],
  "message": "Zones retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

**Example Data**:
```json
{
  "success": true,
  "data": [
    {
      "zoneId": "ZONE_A",
      "zoneCode": "ZA",
      "zoneName": "Zone A - Central",
      "zoneNameMr": "झोन अ - मध्यवर्ती",
      "isActive": true
    },
    {
      "zoneId": "ZONE_B",
      "zoneCode": "ZB",
      "zoneName": "Zone B - East",
      "zoneNameMr": "झोन ब - पूर्व",
      "isActive": true
    }
  ],
  "message": "Zones retrieved successfully",
  "timestamp": "2024-12-03T10:30:00Z"
}
```

---

### 2. Get Wards

**Endpoint**: `GET /api/master/wards`

**Query Parameters** (optional):
- `zoneId`: Filter by zone ID

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "wardId": "string",
      "wardCode": "string",
      "wardName": "string",
      "wardNameMr": "string",
      "zoneId": "string",
      "zoneName": "string",
      "isActive": true
    }
  ],
  "message": "Wards retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 3. Get Wards by Zone

**Endpoint**: `GET /api/master/wards/by-zone/{zoneId}`

**Path Parameters**:
- `zoneId`: Zone ID (required)

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "wardId": "WARD_01",
      "wardCode": "W01",
      "wardName": "Ward 1",
      "wardNameMr": "प्रभाग १",
      "zoneId": "ZONE_A",
      "zoneName": "Zone A",
      "isActive": true
    }
  ],
  "message": "Wards retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 4. Get Bill Types

**Endpoint**: `GET /api/master/bill-types`

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "billTypeId": "BT001",
      "billTypeCode": "NORMAL",
      "billTypeName": "Normal Bill",
      "billTypeNameMr": "सामान्य बिल",
      "isActive": true
    },
    {
      "billTypeId": "BT002",
      "billTypeCode": "SUPPLEMENTARY",
      "billTypeName": "Supplementary Bill",
      "billTypeNameMr": "पूरक बिल",
      "isActive": true
    }
  ],
  "message": "Bill types retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 5. Get Connection Types

**Endpoint**: `GET /api/master/connection-types`

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "connectionTypeId": "CT001",
      "connectionTypeCode": "RESIDENTIAL",
      "connectionTypeName": "Residential",
      "connectionTypeNameMr": "निवासी",
      "isActive": true
    },
    {
      "connectionTypeId": "CT002",
      "connectionTypeCode": "COMMERCIAL",
      "connectionTypeName": "Commercial",
      "connectionTypeNameMr": "व्यावसायिक",
      "isActive": true
    }
  ],
  "message": "Connection types retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 6. Get Financial Years

**Endpoint**: `GET /api/master/financial-years`

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "financialYearId": "FY2024",
      "yearCode": "2024-25",
      "yearName": "2024-2025",
      "startDate": "2024-04-01T00:00:00Z",
      "endDate": "2025-03-31T23:59:59Z",
      "isActive": true,
      "isCurrent": true
    }
  ],
  "message": "Financial years retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

## 📊 Reports APIs

### 1. Get Report List

**Endpoint**: `GET /api/reports/list`

**Query Parameters** (optional):
- `category`: Filter by category (engine, collection, crm, quick)

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "reportId": "RPT001",
      "reportName": "Top Defaulters Report",
      "reportNameMr": "शीर्ष थकबाकीदार अहवाल",
      "reportType": "crm",
      "category": "CRM Reports",
      "description": "List of consumers with highest outstanding amounts",
      "descriptionMr": "सर्वाधिक थकबाकी असलेल्या ग्राहकांची यादी",
      "icon": "users",
      "color": "#FF6B6B",
      "isActive": true,
      "requiredFilters": ["zoneId", "wardId"]
    }
  ],
  "message": "Report list retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 2. Generate Report

**Endpoint**: `POST /api/reports/generate`

**Request Body**:
```json
{
  "reportId": "string (required)",
  "reportName": "string (required)",
  "filters": {
    "zoneId": "string (optional)",
    "wardId": "string (optional)",
    "areaId": "string (optional)",
    "billType": "string (optional)",
    "connectionType": "string (optional)",
    "fromDate": "ISO 8601 date (optional)",
    "toDate": "ISO 8601 date (optional)",
    "financialYear": "string (optional)",
    "billingMonth": "string (optional)",
    "accountantId": "string (optional)",
    "meterReaderId": "string (optional)",
    "paymentMode": "string (optional)",
    "amountFrom": "number (optional)",
    "amountTo": "number (optional)",
    "status": "string (optional)",
    "customFilters": {}
  },
  "exportFormat": "excel | pdf | csv (optional)",
  "userId": "string (required)"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "reportId": "string",
    "reportName": "string",
    "generatedDate": "ISO 8601 datetime",
    "generatedBy": "string (user name)",
    "filters": { },
    "columns": [
      {
        "key": "consumerNumber",
        "label": "Consumer Number",
        "labelMr": "ग्राहक क्रमांक",
        "dataType": "string",
        "format": null,
        "width": 150,
        "sortable": true,
        "filterable": true
      }
    ],
    "rows": [ ],
    "summary": {
      "totalRecords": 150,
      "totalAmount": 5000000.00,
      "aggregations": { }
    },
    "metadata": {
      "executionTime": 1250,
      "dataSource": "SQL Server",
      "lastUpdated": "ISO 8601 datetime",
      "version": "1.0.0"
    }
  },
  "message": "Report generated successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 3. Get Top Defaulters

**Endpoint**: `GET /api/reports/crm/top-defaulters`

**Query Parameters**:
- `zoneId`: Zone ID (optional)
- `wardId`: Ward ID (optional)
- `amountFrom`: Minimum amount (optional)
- `amountTo`: Maximum amount (optional)
- `pageNumber`: Page number (default: 1)
- `pageSize`: Page size (default: 50, max: 100)

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "consumerId": "CON001",
        "consumerNumber": "WB123456",
        "consumerName": "John Doe",
        "address": "123 Main Street, Mumbai",
        "mobileNumber": "9876543210",
        "zoneId": "ZONE_A",
        "zoneName": "Zone A",
        "wardId": "WARD_01",
        "wardName": "Ward 1",
        "connectionType": "Residential",
        "totalOutstanding": 15000.50,
        "oldestBillDate": "2023-01-15T00:00:00Z",
        "billCount": 12,
        "lastPaymentDate": "2024-06-20T00:00:00Z",
        "status": "Active"
      }
    ],
    "totalCount": 150,
    "pageNumber": 1,
    "pageSize": 50,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "message": "Top defaulters retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 4. Export Report

**Endpoint**: `GET /api/reports/export/{reportId}`

**Query Parameters**:
- `format`: excel | pdf | csv (required)
- All filter parameters from generate report

**Success Response (200)**:
- **Content-Type**: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (Excel)
- **Content-Type**: `application/pdf` (PDF)
- **Content-Type**: `text/csv` (CSV)
- **Content-Disposition**: `attachment; filename="Report_20241203.xlsx"`

Binary file data in response body.

---

### 5. Get Day-Wise Collection

**Endpoint**: `GET /api/reports/collection/day-wise`

**Query Parameters**:
- `zoneId`: Zone ID (optional)
- `wardId`: Ward ID (optional)
- `fromDate`: Start date (required)
- `toDate`: End date (required)
- `accountantId`: Accountant ID (optional)

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "collectionId": "COL001",
      "date": "2024-12-01",
      "collectionTime": "10:30:00",
      "zoneId": "ZONE_A",
      "zoneName": "Zone A",
      "wardId": "WARD_01",
      "wardName": "Ward 1",
      "accountantId": "ACC001",
      "accountantName": "Rajesh Kumar",
      "receiptNumber": "REC123456",
      "consumerNumber": "WB123456",
      "consumerName": "John Doe",
      "billAmount": 2500.00,
      "paidAmount": 2500.00,
      "paymentMode": "Cash",
      "totalCollection": 2500.00
    }
  ],
  "message": "Day-wise collection retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

## 💬 SMS APIs

### 1. Get SMS Templates

**Endpoint**: `GET /api/sms/templates`

**Query Parameters** (optional):
- `category`: Filter by category

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "templateId": "TMPL001",
      "templateCode": "BILL_REMINDER",
      "templateName": "Bill Payment Reminder",
      "templateNameMr": "बिल भरण्याची आठवण",
      "templateText": "Dear {NAME}, your water bill of Rs. {AMOUNT} is due. Pay before {DUE_DATE} to avoid penalties.",
      "templateTextMr": "प्रिय {NAME}, तुमचे रु. {AMOUNT} चे पाणी बिल देय आहे. दंड टाळण्यासाठी {DUE_DATE} पूर्वी भरा.",
      "category": "Bill Reminder",
      "variables": ["NAME", "AMOUNT", "DUE_DATE"],
      "isActive": true
    }
  ],
  "message": "SMS templates retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 2. Send Bulk SMS

**Endpoint**: `POST /api/sms/send-bulk`

**Request Body**:
```json
{
  "templateId": "string (required)",
  "recipients": [
    {
      "recipientId": "string",
      "recipientName": "string",
      "mobileNumber": "string (10 digits)",
      "customVariables": {
        "NAME": "John Doe",
        "AMOUNT": "2500",
        "DUE_DATE": "31-Dec-2024"
      }
    }
  ],
  "variables": {},
  "scheduledDate": "ISO 8601 datetime (optional)",
  "priority": "high | normal | low (default: normal)"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "successCount": 45,
    "failureCount": 5
  },
  "message": "SMS sent successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

### 3. Get SMS History

**Endpoint**: `GET /api/sms/history`

**Query Parameters**:
- `fromDate`: Start date (optional)
- `toDate`: End date (optional)
- `deliveryStatus`: sent | delivered | failed | pending (optional)
- `pageNumber`: Page number (default: 1)
- `pageSize`: Page size (default: 20)

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "smsId": "SMS001",
        "templateId": "TMPL001",
        "templateName": "Bill Reminder",
        "recipientName": "John Doe",
        "mobileNumber": "9876543210",
        "messageText": "Dear John Doe, your water bill...",
        "sentDate": "2024-12-01",
        "sentTime": "10:30:00",
        "deliveryStatus": "delivered",
        "deliveryTime": "2024-12-01T10:31:00Z",
        "failureReason": null,
        "cost": 0.50,
        "sentBy": "Admin User"
      }
    ],
    "totalCount": 500,
    "pageNumber": 1,
    "pageSize": 20,
    "totalPages": 25,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "message": "SMS history retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

## 📈 Dashboard APIs

### 1. Get KPI Data

**Endpoint**: `GET /api/dashboard/kpi`

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "label": "Total Collection Today",
      "labelMr": "आजचे एकूण संकलन",
      "value": "₹12,50,000",
      "trend": 15.5,
      "trendDirection": "up",
      "icon": "trending-up",
      "color": "#10B981"
    },
    {
      "label": "Pending Bills",
      "labelMr": "प्रलंबित बिले",
      "value": "2,350",
      "trend": -5.2,
      "trendDirection": "down",
      "icon": "file-text",
      "color": "#F59E0B"
    }
  ],
  "message": "KPI data retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

## 🔄 Session Management APIs

### 1. Get Work Summary

**Endpoint**: `GET /api/session/work-summary`

**Query Parameters** (optional):
- `date`: Specific date (format: YYYY-MM-DD)

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "sessionDate": "2024-12-03",
    "loginTime": "09:00:00",
    "logoutTime": "18:00:00",
    "duration": 32400,
    "downloadedReports": [
      {
        "reportName": "Top Defaulters",
        "downloadTime": "10:45:00",
        "fileFormat": "Excel",
        "fileSize": "1.2 MB"
      }
    ],
    "searchQueries": [
      {
        "query": "defaulters report 2024",
        "timestamp": "10:42:00",
        "resultsCount": 35
      }
    ],
    "activitiesCount": 25
  },
  "message": "Work summary retrieved successfully",
  "timestamp": "ISO 8601 datetime"
}
```

---

## ⚠️ Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "data": null,
  "message": "Error description",
  "timestamp": "ISO 8601 datetime",
  "errors": [
    {
      "code": "ERROR_CODE",
      "message": "Detailed error message",
      "field": "fieldName (optional)"
    }
  ]
}
```

### Standard Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Data conflict (duplicate) |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily down |

---

## 📝 Notes for Backend Developers

### 1. Date/Time Format
- Always use **ISO 8601 format**: `2024-12-03T10:30:00Z`
- Include timezone information
- Store in UTC, convert to IST in frontend

### 2. Pagination
- Default `pageSize`: 50
- Maximum `pageSize`: 100
- Always return `totalCount`, `totalPages`, `hasNextPage`, `hasPreviousPage`

### 3. Bilingual Support
- Provide both English and Marathi text
- Use `*Mr` suffix for Marathi fields (e.g., `zoneNameMr`)

### 4. Authentication
- JWT tokens expire after 1 hour
- Refresh tokens valid for 7 days
- Include user permissions in token payload

### 5. File Export
- Excel: Use OpenXML format (.xlsx)
- PDF: A4 size, portrait orientation
- CSV: UTF-8 encoding with BOM

### 6. Performance
- Response time < 2 seconds for listing APIs
- Response time < 5 seconds for report generation
- Response time < 10 seconds for export APIs
- Implement caching for master data

---

**Contract Version**: 1.0.0  
**Approved By**: Technical Team  
**Date**: December 3, 2024
