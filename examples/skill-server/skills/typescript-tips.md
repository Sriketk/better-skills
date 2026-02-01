---
id: typescript-tips
name: TypeScript Tips
description: Advanced TypeScript patterns and best practices
version: 1.2.0
tags:
  - typescript
  - types
  - patterns
triggers:
  - typescript types
  - type inference
  - generics
  - type narrowing
---

# TypeScript Tips

This skill provides advanced TypeScript patterns and best practices.

## Type Inference

### Let TypeScript Infer When Possible

Don't add type annotations for values TypeScript can infer:

```typescript
// Unnecessary annotation
const name: string = "hello";
const numbers: number[] = [1, 2, 3];

// Let TypeScript infer
const name = "hello"; // inferred as string
const numbers = [1, 2, 3]; // inferred as number[]
```

### When to Add Annotations

Add annotations for:
- Function parameters and return types
- Object literals with specific shapes
- When inference would be too wide

```typescript
// Always annotate function signatures
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Annotate when inference is too wide
const config: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};
```

## Discriminated Unions

Use a common property to discriminate between types:

```typescript
type Success = { status: "success"; data: string };
type Error = { status: "error"; error: Error };
type Loading = { status: "loading" };

type State = Success | Error | Loading;

function handleState(state: State) {
  switch (state.status) {
    case "success":
      return state.data; // TypeScript knows this is Success
    case "error":
      return state.error.message; // TypeScript knows this is Error
    case "loading":
      return "Loading...";
  }
}
```

## Generics

### Basic Generics

```typescript
function identity<T>(value: T): T {
  return value;
}

const str = identity("hello"); // string
const num = identity(42); // number
```

### Constrained Generics

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30 };
const name = getProperty(user, "name"); // string
const age = getProperty(user, "age"); // number
```

### Default Type Parameters

```typescript
interface Container<T = string> {
  value: T;
}

const stringContainer: Container = { value: "hello" };
const numberContainer: Container<number> = { value: 42 };
```

## Utility Types

### Built-in Utility Types

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Pick specific properties
type UserCredentials = Pick<User, "email" | "id">;

// Omit specific properties
type PublicUser = Omit<User, "email">;

// Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Create a record type
type UserRoles = Record<string, User>;
```

### Custom Utility Types

```typescript
// Make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserWithOptionalEmail = PartialBy<User, "email">;

// Make specific properties required
type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Extract non-nullable types
type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
```

## Type Guards

### Type Predicates

```typescript
interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow(); // TypeScript knows this is Cat
  } else {
    animal.bark(); // TypeScript knows this is Dog
  }
}
```

### Assertion Functions

```typescript
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
}

function processValue(value: unknown) {
  assertIsString(value);
  // TypeScript knows value is string here
  console.log(value.toUpperCase());
}
```

## Const Assertions

### as const

```typescript
// Without as const: string[]
const colors = ["red", "green", "blue"];

// With as const: readonly ["red", "green", "blue"]
const colors = ["red", "green", "blue"] as const;

// Useful for creating literal types
const config = {
  endpoint: "/api",
  timeout: 5000,
} as const;

type Config = typeof config;
// { readonly endpoint: "/api"; readonly timeout: 5000; }
```

## Template Literal Types

```typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "/users" | "/posts" | "/comments";

type Route = `${HTTPMethod} ${Endpoint}`;
// "GET /users" | "GET /posts" | "GET /comments" | "POST /users" | ...

type EventName = `on${Capitalize<string>}`;
// Matches "onClick", "onChange", "onSubmit", etc.
```

## Mapped Types

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }
```
