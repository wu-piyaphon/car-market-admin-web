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

### 3. Query vs Mutation Organization

```
app/features/auth/api/
├── auth.api.ts           # Raw API functions
├── auth.queries.ts       # Query hooks (GET operations)
└── auth.mutations.ts     # Mutation hooks (POST/PUT/DELETE)
```

### 3. Recommended Structure Options

#### Feature-based API (Recommended for large projects)

```
app/
├── api/
│   ├── client.ts                 # Base API client
│   ├── endpoints.ts              # API endpoints
│   └── types.ts                  # Common API types
├── lib/
│   ├── query-client.ts            # Query client setup
│   └── schemas/
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   ├── index.ts          # Export auth API
│   │   │   ├── auth.api.ts       # Auth API functions
│   │   │   ├── auth.queries.ts   # Auth Query hooks
│   │   │   └── auth.mutations.ts # Auth Mutation hooks
│   │   ├── components/
│   │   ├── schemas/
│   │   └── types/
│   ├── cars/
│   │   ├── api/
│   │   │   ├── index.ts
│   │   │   ├── cars.api.ts
│   │   │   ├── cars.queries.ts
│   │   │   └── cars.mutations.ts
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { carsApi } from "./cars.api";

export const useCars = params =>
  useQuery({
    queryKey: ["cars", params],
    queryFn: () => carsApi.getCars(params),
  });

export const useCar = (id: string) =>
  useQuery({
    queryKey: ["cars", id],
    queryFn: () => carsApi.getCar(id),
    enabled: !!id,
  });
```

**Mutation Hooks (`app/features/cars/api/cars.mutations.ts`)**:

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carsApi } from "./cars.api";

export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carsApi.createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};

export const useUpdateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => carsApi.updateCar(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["cars", id] });
    },
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carsApi.deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};
```

### 6. Mutation Best Practices

**Error Handling:**

```typescript
export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carsApi.createCar,
    onSuccess: data => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cars"] });

      // Or optimistically update
      queryClient.setQueryData(["cars", data.id], data);
    },
    onError: error => {
      // Handle error (toast, logging, etc.)
      console.error("Failed to create car:", error);
    },
  });
};
```

**Optimistic Updates:**

```typescript
export const useUpdateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => carsApi.updateCar(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cars", id] });

      // Snapshot previous value
      const previousCar = queryClient.getQueryData(["cars", id]);

      // Optimistically update
      queryClient.setQueryData(["cars", id], old => ({ ...old, ...data }));

      return { previousCar };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      queryClient.setQueryData(["cars", id], context.previousCar);
    },
    onSettled: (_, __, { id }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["cars", id] });
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
- `app/features/auth/api/auth.mutations.ts` - Auth TanStack Mutation hooks
- `app/features/cars/api/cars.queries.ts` - Cars TanStack Query hooks
- `app/features/cars/api/cars.mutations.ts` - Cars TanStack Mutation hooks

### 7. Query Key Management

Query keys are critical for caching, invalidation, and debugging. Here are the recommended approaches:

#### Option 1: Co-located Query Keys (Recommended)

Store query keys alongside your query hooks:

```
app/features/cars/api/
├── cars.api.ts           # Raw API functions
├── cars.keys.ts          # Query key factory
├── cars.queries.ts       # Query hooks
└── cars.mutations.ts     # Mutation hooks
```

**Query Key Factory (`app/features/cars/api/cars.keys.ts`)**:

```typescript
export const carsKeys = {
  all: ["cars"] as const,
  lists: () => [...carsKeys.all, "list"] as const,
  list: (filters: string) => [...carsKeys.lists(), { filters }] as const,
  details: () => [...carsKeys.all, "detail"] as const,
  detail: (id: string) => [...carsKeys.details(), id] as const,
  search: (query: string) => [...carsKeys.all, "search", query] as const,
} as const;
```

**Usage in Queries (`app/features/cars/api/cars.queries.ts`)**:

```typescript
import { carsKeys } from "./cars.keys";

export const useCars = (filters?: string) =>
  useQuery({
    queryKey: carsKeys.list(filters || ""),
    queryFn: () => carsApi.getCars(filters),
  });

export const useCar = (id: string) =>
  useQuery({
    queryKey: carsKeys.detail(id),
    queryFn: () => carsApi.getCar(id),
    enabled: !!id,
  });
```

**Usage in Mutations (`app/features/cars/api/cars.mutations.ts`)**:

```typescript
import { carsKeys } from "./cars.keys";

export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: carsApi.createCar,
    onSuccess: () => {
      // Invalidate all car-related queries
      queryClient.invalidateQueries({ queryKey: carsKeys.all });
    },
  });
};

export const useUpdateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => carsApi.updateCar(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific queries
      queryClient.invalidateQueries({ queryKey: carsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: carsKeys.detail(id) });
    },
  });
};
```

#### Option 2: Centralized Query Keys

For smaller projects, you can centralize all query keys:

```
app/lib/
├── react-query.ts        # Query client setup
├── query-keys.ts         # All query keys
└── schemas/
```

**Centralized Keys (`app/lib/query-keys.ts`)**:

```typescript
export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    profile: () => [...queryKeys.auth.all, "profile"] as const,
  },
  cars: {
    all: ["cars"] as const,
    lists: () => [...queryKeys.cars.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.cars.lists(), { filters }] as const,
    details: () => [...queryKeys.cars.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.cars.details(), id] as const,
  },
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters: string) =>
      [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
} as const;
```

#### Option 3: Global Query Key Factory

Create a reusable factory pattern:

```
app/lib/
├── react-query.ts        # Query client setup
├── query-key-factory.ts  # Reusable factory
└── schemas/
```

**Query Key Factory (`app/lib/query-key-factory.ts`)**:

```typescript
export const createQueryKeys = <T extends string>(feature: T) => ({
  all: [feature] as const,
  lists: () => [feature, "list"] as const,
  list: (filters?: Record<string, any>) => [feature, "list", filters] as const,
  details: () => [feature, "detail"] as const,
  detail: (id: string | number) => [feature, "detail", id] as const,
  search: (query: string) => [feature, "search", query] as const,
});

// Usage in feature files
export const carsKeys = createQueryKeys("cars");
export const usersKeys = createQueryKeys("users");
export const authKeys = createQueryKeys("auth");
```

### 8. Query Key Best Practices

#### 1. **Hierarchical Structure**

```typescript
// ✅ Good - Hierarchical and specific
const carsKeys = {
  all: ["cars"] as const,
  lists: () => [...carsKeys.all, "list"] as const,
  list: (filters: string) => [...carsKeys.lists(), { filters }] as const,
  details: () => [...carsKeys.all, "detail"] as const,
  detail: (id: string) => [...carsKeys.details(), id] as const,
};

// ❌ Bad - Flat and non-hierarchical
const badKeys = {
  cars: ["cars"],
  carsList: ["cars-list"],
  carDetail: (id: string) => ["car-detail", id],
};
```

#### 2. **Consistent Invalidation**

```typescript
// ✅ Good - Precise invalidation
queryClient.invalidateQueries({ queryKey: carsKeys.lists() }); // Only lists
queryClient.invalidateQueries({ queryKey: carsKeys.detail(id) }); // Only specific detail
queryClient.invalidateQueries({ queryKey: carsKeys.all }); // Everything car-related

// ❌ Bad - Over-invalidation
queryClient.invalidateQueries(); // Everything in cache
```

#### 3. **Type Safety**

```typescript
// ✅ Good - Strongly typed
export const carsKeys = {
  all: ["cars"] as const,
  list: (filters: CarFilters) => [...carsKeys.all, "list", filters] as const,
  detail: (id: string) => [...carsKeys.all, "detail", id] as const,
} as const;

// ❌ Bad - Untyped
export const badKeys = {
  all: ["cars"],
  list: (filters: any) => ["cars", "list", filters],
};
```

### 9. File Naming Conventions

**For API organization:**

- `*.api.ts` - Raw API functions (no React Query)
- `*.keys.ts` - Query key factories (recommended)
- `*.queries.ts` - Query hooks (useQuery, useInfiniteQuery)
- `*.mutations.ts` - Mutation hooks (useMutation)
- `*.subscriptions.ts` - WebSocket/SSE hooks (optional)

**For combined approach:**

- `*.api.ts` - Raw API functions
- `*.keys.ts` - Query key factories
- `*.hooks.ts` - All React Query hooks (queries + mutations)

**For centralized approach:**

- `app/lib/query-keys.ts` - All query keys
- `app/lib/query-key-factory.ts` - Reusable factory

This structure ensures clear separation between:

- **Queries**: Read operations that fetch and cache data
- **Mutations**: Write operations that modify server state
- **API functions**: Pure functions that make HTTP requests
- **Query Keys**: Consistent cache management and invalidation

Choose the approach that best fits your team size and project complexity!
