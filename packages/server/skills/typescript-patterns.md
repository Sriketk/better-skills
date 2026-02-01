---
id: typescript-patterns
name: TypeScript Patterns
description: Common TypeScript patterns and best practices
version: 1.0.0
tags:
  - typescript
  - patterns
  - types
triggers:
  - typescript types
  - type inference
  - generic types
---

# TypeScript Patterns

## Type Inference

Let TypeScript infer types when possible:

```typescript
// Unnecessary: TypeScript can infer this
const name: string = "hello";

// Better: Let TypeScript infer
const name = "hello";
```

## Discriminated Unions

Use discriminated unions for type-safe state handling:

```typescript
type LoadingState = { status: "loading" };
type SuccessState = { status: "success"; data: string };
type ErrorState = { status: "error"; error: Error };

type State = LoadingState | SuccessState | ErrorState;

function handleState(state: State) {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return state.data; // TypeScript knows data exists
    case "error":
      return state.error.message; // TypeScript knows error exists
  }
}
```

## Generic Constraints

Use constraints to ensure type safety:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

## Utility Types

Leverage built-in utility types:

- `Partial<T>`: Make all properties optional
- `Required<T>`: Make all properties required
- `Pick<T, K>`: Select specific properties
- `Omit<T, K>`: Exclude specific properties
- `Record<K, V>`: Create object type with key-value pairs
