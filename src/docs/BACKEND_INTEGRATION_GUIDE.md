# Backend Integration Guide
## Maharashtra Water Billing System - Frontend (.NET Microservices)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [API Structure](#api-structure)
4. [Authentication Flow](#authentication-flow)
5. [Data Models](#data-models)
6. [API Endpoints](#api-endpoints)
7. [Integration Steps](#integration-steps)
8. [Error Handling](#error-handling)
9. [Testing](#testing)
10. [Deployment](#deployment)

---

## 🎯 Overview

This frontend application is designed to integrate seamlessly with .NET microservices backend. All static/mock data has been removed and replaced with API service layers ready for backend integration.

### Technology Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: .NET Core Microservices (Your Implementation)
- **Communication**: REST APIs with JWT Authentication
- **State Management**: React Hooks + Context API

---

## 🏗️ Architecture

### Frontend Structure
```
/
├── config/
│   └── api.config.ts           # API endpoints configuration
├── types/
│   └── api.types.ts            # TypeScript interfaces
├── services/
│   ├── api.service.ts          # Base API client (Axios)
│   ├── auth.service.ts         # Authentication service
│   ├── reports.service.ts      # Reports service
│   ├── master.service.ts       # Master data service
│   └── sms.service.ts          # SMS service
├── hooks/
│   ├── useAuth.ts              # Authentication hook
│   ├── useReports.ts           # Reports hooks
│   └── useMasterData.ts        # Master data hooks
└── components/                  # UI Components
```

### Backend Expected Structure
```
.NET Microservices
├── API Gateway (Authentication, Rate Limiting)
├── Auth Microservice
├── Reports Microservice
├── Master Data Microservice
├── SMS Microservice
├── Dashboard Microservice
└── Session Management Microservice
```

---

## 🔌 API Structure

### Base Configuration

**File**: `/config/api.config.ts`

Update the base URL based on your environment:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.mahawaterbilling.gov.in',
  // ... other configurations
};
```

### API Response Format

All backend APIs should follow this standard response format:

```json
{
  "success": true,
  "data": { /* actual data */ },
  "message": "Operation successful",
  "timestamp": "2024-12-03T10:30:00Z",
  "errors": []
}
```

**Error Response**:
```json
{
  "success": false,
  "data": null,
  "message": "Operation failed",
  "timestamp": "2024-12-03T10:30:00Z",
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Zone ID is required",
      "field": "zoneId"
    }
  ]
}
```

---

## 🔐 Authentication Flow

### 1. Login Request

**Endpoint**: `POST /api/auth/login`

**Request**:
```json
{
  "username": "rajesh.kumar",
  "password": "SecurePassword123!",
  "rememberMe": true
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600,
    "user": {
      "userId": "USR001",
      "userName": "rajesh.kumar",
      "fullName": "Rajesh Kumar",
      "email": "rajesh.kumar@mahawaterbilling.gov.in",
      "role": "Admin",
      "designation": "Senior Officer",
      "department": "Water Billing",
      "zoneAccess": ["ZONE_A", "ZONE_B"],
      "permissions": ["VIEW_REPORTS", "GENERATE_REPORTS", "SEND_SMS"],
      "lastLogin": "2024-12-02T15:30:00Z"
    }
  },
  "message": "Login successful",
  "timestamp": "2024-12-03T10:30:00Z"
}
```

### 2. Token Management

**JWT Token Structure**:
- Stored in `localStorage` and `sessionStorage`
- Sent in `Authorization` header: `Bearer {token}`
- Auto-refresh before expiry

**Refresh Token Endpoint**: `POST /api/auth/refresh`

**Request**:
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token_here"
  },
  "message": "Token refreshed successfully"
}
```

### 3. Request Interceptor

The frontend automatically adds authentication headers:

```typescript
config.headers.Authorization = `Bearer ${token}`;
config.headers['X-Correlation-ID'] = generateCorrelationId();
```

---

## 📊 Data Models

### UserProfile
```csharp
public class UserProfile
{
    public string UserId { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Role { get; set; }
    public string Designation { get; set; }
    public string Department { get; set; }
    public List<string> ZoneAccess { get; set; }
    public List<string> Permissions { get; set; }
    public DateTime LastLogin { get; set; }
    public string ProfileImage { get; set; }
}
```

### ReportFilters
```csharp
public class ReportFilters
{
    public string ZoneId { get; set; }
    public string WardId { get; set; }
    public string AreaId { get; set; }
    public string BillType { get; set; }
    public string ConnectionType { get; set; }
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public string FinancialYear { get; set; }
    public string BillingMonth { get; set; }
    public string AccountantId { get; set; }
    public string MeterReaderId { get; set; }
    public string PaymentMode { get; set; }
    public decimal? AmountFrom { get; set; }
    public decimal? AmountTo { get; set; }
    public string Status { get; set; }
    public Dictionary<string, object> CustomFilters { get; set; }
}
```

### TopDefaulterData
```csharp
public class TopDefaulterData
{
    public string ConsumerId { get; set; }
    public string ConsumerNumber { get; set; }
    public string ConsumerName { get; set; }
    public string Address { get; set; }
    public string MobileNumber { get; set; }
    public string ZoneId { get; set; }
    public string ZoneName { get; set; }
    public string WardId { get; set; }
    public string WardName { get; set; }
    public string ConnectionType { get; set; }
    public decimal TotalOutstanding { get; set; }
    public DateTime OldestBillDate { get; set; }
    public int BillCount { get; set; }
    public DateTime? LastPaymentDate { get; set; }
    public string Status { get; set; }
}
```

### PaginatedResponse
```csharp
public class PaginatedResponse<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public bool HasNextPage { get; set; }
    public bool HasPreviousPage { get; set; }
}
```

---

## 🌐 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/profile` | Get user profile |
| POST | `/api/auth/profile/update` | Update profile |
| POST | `/api/auth/password/change` | Change password |
| GET | `/api/auth/sessions` | Get user sessions |
| GET | `/api/auth/last-login` | Get last login info |

### Reports Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/list` | Get report list |
| POST | `/api/reports/generate` | Generate report |
| GET | `/api/reports/data/{reportId}` | Get report data |
| GET | `/api/reports/export/{reportId}` | Export report |
| GET | `/api/reports/history` | Get report history |

**Collection Reports**:
- GET `/api/reports/collection/day-wise`
- GET `/api/reports/collection/monthly`
- GET `/api/reports/collection/details`
- GET `/api/reports/collection/accountant`
- GET `/api/reports/collection/zone-wise`

**CRM Reports**:
- GET `/api/reports/crm/top-defaulters`
- GET `/api/reports/crm/pending-reading`
- GET `/api/reports/crm/closed-connection`
- GET `/api/reports/crm/mutation`
- GET `/api/reports/crm/alteration`

**Quick Reports**:
- GET `/api/reports/quick/reading-summary`
- GET `/api/reports/quick/connection-seal`
- GET `/api/reports/quick/payment-mode`
- GET `/api/reports/quick/revenue-summary`

### Master Data Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/master/zones` | Get all zones |
| GET | `/api/master/wards` | Get all wards |
| GET | `/api/master/wards/by-zone/{zoneId}` | Get wards by zone |
| GET | `/api/master/areas` | Get all areas |
| GET | `/api/master/bill-types` | Get bill types |
| GET | `/api/master/connection-types` | Get connection types |
| GET | `/api/master/payment-modes` | Get payment modes |
| GET | `/api/master/accountants` | Get accountants |
| GET | `/api/master/meter-readers` | Get meter readers |
| GET | `/api/master/financial-years` | Get financial years |
| GET | `/api/master/billing-months` | Get billing months |

### SMS Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sms/templates` | Get SMS templates |
| POST | `/api/sms/send` | Send single SMS |
| POST | `/api/sms/send-bulk` | Send bulk SMS |
| GET | `/api/sms/history` | Get SMS history |
| GET | `/api/sms/statistics` | Get SMS statistics |
| GET | `/api/sms/delivery-status/{smsId}` | Get delivery status |
| PUT | `/api/sms/template/update/{templateId}` | Update template |
| GET | `/api/sms/balance` | Get SMS balance |

### Dashboard Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/kpi` | Get KPI data |
| GET | `/api/dashboard/collection-summary` | Get collection summary |
| GET | `/api/dashboard/charts` | Get charts data |
| GET | `/api/dashboard/notifications` | Get notifications |
| GET | `/api/dashboard/recent-activities` | Get recent activities |

### Session Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/session/work-summary` | Get work summary |
| GET | `/api/session/downloaded-reports` | Get downloaded reports |
| GET | `/api/session/search-history` | Get search history |
| GET | `/api/session/by-date?date={date}` | Get session by date |

---

## 🔧 Integration Steps

### Step 1: Environment Configuration

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update the environment variables:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-gateway.com
NEXT_PUBLIC_ENV=production
```

### Step 2: Install Dependencies

```bash
npm install axios
# or
yarn add axios
```

### Step 3: Test API Connection

Create a test endpoint in your backend:

**GET** `/api/health/check`
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-12-03T10:30:00Z",
    "version": "1.0.0"
  },
  "message": "Service is running"
}
```

Test from frontend:
```typescript
import { get } from './services/api.service';

const testConnection = async () => {
  try {
    const response = await get('/api/health/check');
    console.log('Connection successful:', response);
  } catch (error) {
    console.error('Connection failed:', error);
  }
};
```

### Step 4: Implement Authentication

1. Create login page
2. Use `useAuth` hook
3. Implement protected routes
4. Handle token refresh

Example:
```typescript
import { useAuth } from './hooks/useAuth';

function LoginPage() {
  const { login, isLoading } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Redirect to dashboard
    } catch (error) {
      // Handle error
    }
  };

  return (
    // Login form
  );
}
```

### Step 5: Integrate Components

Update each component to use the hooks:

**Before** (Static Data):
```typescript
const data = [
  { id: 1, name: 'Static Data' },
  // ...
];
```

**After** (API Integration):
```typescript
import { useTopDefaulters } from './hooks/useReports';

function TopDefaultersTable() {
  const { data, isLoading, fetchTopDefaulters } = useTopDefaulters();

  useEffect(() => {
    fetchTopDefaulters(filters);
  }, [filters]);

  if (isLoading) return <LoadingSpinner />;

  return (
    // Render table with data
  );
}
```

### Step 6: Handle Errors

All hooks include error handling. Display errors to users:

```typescript
const { data, error, isLoading } = useTopDefaulters();

if (error) {
  return <ErrorMessage message={error} />;
}
```

---

## ⚠️ Error Handling

### Frontend Error Handling

The API service automatically handles common errors:

1. **401 Unauthorized**: Auto-refresh token or logout
2. **Network Errors**: Show connectivity message
3. **Validation Errors**: Display field-specific errors
4. **Server Errors**: Show generic error message

### Backend Error Codes

Implement these standard error codes:

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Data conflict |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily down |

---

## 🧪 Testing

### API Testing Checklist

- [ ] Authentication flow (login, logout, refresh)
- [ ] All master data endpoints
- [ ] Report generation with filters
- [ ] Report export (Excel, PDF, CSV)
- [ ] SMS sending and history
- [ ] Pagination for large datasets
- [ ] Error responses
- [ ] Token expiry and refresh
- [ ] CORS configuration
- [ ] Rate limiting

### Testing Tools

1. **Postman/Insomnia**: Test individual endpoints
2. **Swagger/OpenAPI**: API documentation
3. **Jest**: Unit testing frontend services
4. **React Testing Library**: Component testing

---

## 🚀 Deployment

### Pre-Deployment Checklist

- [ ] Update `.env.production` with production API URL
- [ ] Enable HTTPS for all API calls
- [ ] Configure CORS on backend
- [ ] Set up API rate limiting
- [ ] Enable request/response logging
- [ ] Set up error monitoring (Sentry)
- [ ] Configure CDN for static assets
- [ ] Enable gzip compression
- [ ] Set up SSL certificates
- [ ] Configure firewall rules

### Build for Production

```bash
npm run build
# or
yarn build
```

### Environment Variables

Ensure these are set in production:

```env
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_API_BASE_URL=https://api.mahawaterbilling.gov.in
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_LOG_API_REQUESTS=false
```

---

## 📝 API Documentation Template

Create comprehensive API documentation using Swagger/OpenAPI:

```yaml
openapi: 3.0.0
info:
  title: Maharashtra Water Billing API
  version: 1.0.0
  description: Backend API for Water Billing System

servers:
  - url: https://api.mahawaterbilling.gov.in
    description: Production server
  - url: https://staging-api.mahawaterbilling.gov.in
    description: Staging server

paths:
  /api/auth/login:
    post:
      summary: User login
      tags:
        - Authentication
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LoginResponse'
```

---

## 🔒 Security Best Practices

1. **Never commit secrets** to version control
2. **Use HTTPS** for all API calls
3. **Implement CSRF protection**
4. **Validate all inputs** on backend
5. **Use prepared statements** for database queries
6. **Implement rate limiting**
7. **Log security events**
8. **Regular security audits**
9. **Keep dependencies updated**
10. **Implement proper CORS policies**

---

## 📞 Support

For backend integration support:
- **Technical Lead**: [Your Name]
- **Email**: technical@mahawaterbilling.gov.in
- **Documentation**: https://docs.mahawaterbilling.gov.in

---

## 📄 License

Maharashtra Water Billing System - Government of Maharashtra
Confidential and Proprietary

---

**Last Updated**: December 3, 2024
**Version**: 1.0.0
