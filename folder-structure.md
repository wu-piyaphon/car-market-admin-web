# Recommended Folder Structure for Schemas

## Overview

This document outlines the recommended folder structure for organizing validation schemas in the Good Car Market Admin Web application.

## Schema Organization Strategy

### 1. Global Schemas (`app/lib/schemas/`)

For shared schemas used across multiple features:

```
app/
├── lib/
│   ├── schemas/
│   │   ├── index.ts              # Export all common schemas
│   │   ├── common.ts             # Common validation patterns
│   │   ├── api.ts                # API response/request schemas
│   │   └── form.ts               # Common form validation schemas
│   └── utils.ts
```

### 2. Feature-specific Schemas (`app/features/{feature}/schemas/`)

For schemas specific to a particular feature:

```
app/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── schemas/
│   │   │   ├── index.ts          # Export all auth schemas
│   │   │   ├── login.ts          # Login form schema
│   │   │   ├── register.ts       # Registration schema
│   │   │   └── password.ts       # Password-related schemas
│   │   └── types/
│   ├── cars/
│   │   ├── components/
│   │   ├── schemas/
│   │   │   ├── index.ts          # Export all car schemas
│   │   │   ├── car-form.ts       # Car creation/editing
│   │   │   ├── filters.ts        # Car filtering schemas
│   │   │   └── search.ts         # Car search schemas
│   │   └── types/
│   ├── users/
│   │   ├── components/
│   │   ├── schemas/
│   │   │   ├── index.ts          # Export all user schemas
│   │   │   ├── profile.ts        # User profile schemas
│   │   │   └── admin.ts          # Admin user management
│   │   └── types/
│   └── dashboard/
│       ├── components/
│       ├── schemas/
│       │   ├── index.ts          # Export all dashboard schemas
│       │   └── analytics.ts      # Analytics/reporting schemas
│       └── types/
```

### 3. Route-specific Schemas (Optional)

For complex routes that need their own schemas:

```
app/
├── routes/
│   ├── dashboard/
│   │   ├── schemas/              # If dashboard routes need specific schemas
│   │   │   └── filters.ts
│   │   └── route-file.tsx
```

## Complete Proposed Structure

```
app/
├── components/
│   ├── form/
│   │   └── rhf-textfield.tsx
│   ├── layout/
│   └── ui/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   └── login-form.tsx
│   │   ├── schemas/              # NEW
│   │   │   ├── index.ts
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   │   └── password.ts
│   │   └── types/
│   ├── cars/                     # NEW FEATURE
│   │   ├── components/
│   │   ├── schemas/
│   │   ├── types/
│   │   └── hooks/
│   ├── users/                    # NEW FEATURE
│   │   ├── components/
│   │   ├── schemas/
│   │   ├── types/
│   │   └── hooks/
│   └── dashboard/                # NEW FEATURE
│       ├── components/
│       ├── schemas/
│       ├── types/
│       └── hooks/
├── hooks/
├── lib/
│   ├── schemas/                  # NEW - Global schemas
│   │   ├── index.ts
│   │   ├── common.ts
│   │   ├── api.ts
│   │   └── form.ts
│   └── utils.ts
├── routes/
└── utils/
```

## Benefits of This Structure

### 1. **Clear Separation of Concerns**

- Global schemas in `lib/schemas/` for reusable validation
- Feature-specific schemas within each feature folder
- Easy to locate and maintain

### 2. **Scalability**

- Each feature can grow independently
- New features follow the same pattern
- Easy to refactor and move schemas

### 3. **Type Safety**

- Schemas co-located with their related types
- Easy imports within features
- Clear relationship between schemas and components

### 4. **Developer Experience**

- Predictable file locations
- Consistent naming conventions
- Easy to onboard new developers

## Naming Conventions

### Files

- Use kebab-case for file names: `login-form.ts`, `car-search.ts`
- Use descriptive names that indicate purpose
- Always include an `index.ts` for clean imports

### Schemas

- Use camelCase for schema names: `loginSchema`, `carFormSchema`
- Include "Schema" suffix for clarity
- Group related schemas in the same file

### Exports

- Use named exports from individual files
- Re-export from `index.ts` files for clean imports
- Export both schema and inferred types

## API and TanStack Query Integration

### 1. API Layer Structure

For organizing API functions and TanStack Query hooks:

```
app/
├── api/
│   ├── client.ts                 # Axios/fetch client configuration
│   ├── endpoints.ts              # API endpoint constants
│   ├── types.ts                  # Common API types
│   └── auth/
│       ├── index.ts              # Export auth API functions
│       ├── auth.api.ts           # Auth API functions
│       └── auth.queries.ts       # TanStack Query hooks for auth
├── lib/
│   ├── react-query.ts            # React Query client configuration
│   ├── schemas/
│   └── utils.ts
├── features/
│   ├── auth/
│   │   ├── api/                  # Feature-specific API (optional)
│   │   │   ├── auth.api.ts       # Auth API functions
│   │   │   └── auth.queries.ts   # Auth Query hooks
│   │   ├── components/
│   │   ├── schemas/
│   │   └── types/
│   ├── cars/
│   │   ├── api/
│   │   │   ├── cars.api.ts       # Car API functions
│   │   │   └── cars.queries.ts   # Car Query hooks
│   │   ├── components/
│   │   ├── schemas/
│   │   └── types/
```

### 2. API Function Organization

**Global API Client (`app/api/client.ts`)**:

```typescript
// Base API client with interceptors, error handling
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 10000,
});
```

**Feature API Functions (`app/features/auth/api/auth.api.ts`)**:

```typescript
// Raw API functions - no React Query
export const authApi = {
  login: credentials => apiClient.post("/auth/login", credentials),
  logout: () => apiClient.post("/auth/logout"),
  getProfile: () => apiClient.get("/auth/profile"),
};
```

**TanStack Query Hooks (`app/features/auth/api/auth.queries.ts`)**:

```typescript
// React Query hooks with caching, error handling
export const useLogin = () =>
  useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      /* handle success */
    },
  });

export const useProfile = () =>
  useQuery({
    queryKey: ["auth", "profile"],
    queryFn: authApi.getProfile,
  });
```

### 3. Recommended Structure Options

#### Option A: Centralized API (Recommended for small-medium projects)

```
app/
├── api/
│   ├── client.ts                 # Base API client
│   ├── endpoints.ts              # API endpoints
│   ├── types.ts                  # Common API types
│   ├── auth.api.ts               # Auth API functions
│   ├── cars.api.ts               # Cars API functions
│   └── users.api.ts              # Users API functions
├── queries/
│   ├── auth.queries.ts           # Auth Query hooks
│   ├── cars.queries.ts           # Cars Query hooks
│   └── users.queries.ts          # Users Query hooks
├── lib/
│   ├── react-query.ts            # Query client setup
│   └── schemas/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── schemas/
│   │   └── types/
```

#### Option B: Feature-based API (Recommended for large projects)

```
app/
├── api/
│   ├── client.ts                 # Base API client
│   ├── endpoints.ts              # API endpoints
│   └── types.ts                  # Common API types
├── lib/
│   ├── react-query.ts            # Query client setup
│   └── schemas/
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   ├── index.ts          # Export auth API
│   │   │   ├── auth.api.ts       # Auth API functions
│   │   │   └── auth.queries.ts   # Auth Query hooks
│   │   ├── components/
│   │   ├── schemas/
│   │   └── types/
│   ├── cars/
│   │   ├── api/
│   │   │   ├── index.ts
│   │   │   ├── cars.api.ts
│   │   │   └── cars.queries.ts
│   │   ├── components/
│   │   ├── schemas/
│   │   └── types/
```

### 4. Benefits of This Structure

**API Layer Benefits:**

- Clear separation between API logic and React components
- Reusable API functions across different components
- Centralized error handling and request configuration
- Easy to mock for testing

**TanStack Query Benefits:**

- Automatic caching and background refetching
- Optimistic updates and error recovery
- Request deduplication
- Pagination and infinite queries support

**Folder Structure Benefits:**

- Co-located API functions with related features
- Consistent patterns across all features
- Easy to find and maintain API-related code
- Scalable as the application grows

### 5. Implementation Examples

**Query Client Setup (`app/lib/react-query.ts`)**:

```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});
```

**Feature API (`app/features/cars/api/cars.api.ts`)**:

```typescript
import { apiClient } from "~/api/client";
import type { Car, CreateCarData, UpdateCarData } from "../types";

export const carsApi = {
  getCars: params => apiClient.get<Car[]>("/cars", { params }),
  getCar: (id: string) => apiClient.get<Car>(`/cars/${id}`),
  createCar: (data: CreateCarData) => apiClient.post<Car>("/cars", data),
  updateCar: (id: string, data: UpdateCarData) =>
    apiClient.put<Car>(`/cars/${id}`, data),
  deleteCar: (id: string) => apiClient.delete(`/cars/${id}`),
};
```

**Query Hooks (`app/features/cars/api/cars.queries.ts`)**:

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carsApi } from "./cars.api";

export const useCars = params =>
  useQuery({
    queryKey: ["cars", params],
    queryFn: () => carsApi.getCars(params),
  });

export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carsApi.createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};
```

## Example Implementation

See the following files for detailed examples:

- `app/lib/schemas/common.ts` - Common validation patterns
- `app/features/auth/schemas/login.ts` - Login form schema
- `app/features/cars/schemas/car-form.ts` - Car management schema
- `app/api/client.ts` - API client configuration
- `app/features/auth/api/auth.queries.ts` - Auth TanStack Query hooks
- `app/features/cars/api/cars.queries.ts` - Cars TanStack Query hooks
