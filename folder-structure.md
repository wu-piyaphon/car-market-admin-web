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

## Example Implementation

See the following files for detailed examples:

- `app/lib/schemas/common.ts` - Common validation patterns
- `app/features/auth/schemas/login.ts` - Login form schema
- `app/features/cars/schemas/car-form.ts` - Car management schema
