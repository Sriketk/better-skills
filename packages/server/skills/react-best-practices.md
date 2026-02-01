---
id: react-best-practices
name: React Best Practices
description: Performance optimization guidelines for React applications
version: 1.0.0
tags:
  - react
  - performance
  - frontend
triggers:
  - optimize react
  - react performance
  - react hooks best practices
---

# React Best Practices

## Component Optimization

### Use React.memo for Expensive Components

Wrap components that receive the same props frequently:

```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive rendering */}</div>;
});
```

### Use useMemo and useCallback Appropriately

- `useMemo`: Memoize expensive computations
- `useCallback`: Memoize callback functions passed to child components

```tsx
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a), [a]);
```

## State Management

### Lift State Up Only When Necessary

Keep state as close to where it's used as possible.

### Use Context Wisely

Split contexts by update frequency to prevent unnecessary re-renders:

```tsx
// Bad: One context for everything
const AppContext = createContext({ user, theme, settings });

// Good: Separate contexts
const UserContext = createContext(user);
const ThemeContext = createContext(theme);
```

## Rendering Optimization

### Avoid Anonymous Functions in JSX

```tsx
// Bad: Creates new function on each render
<Button onClick={() => handleClick(id)} />

// Good: Use useCallback or pass id differently
<Button onClick={handleClick} data-id={id} />
```

### Use Keys Properly

Always use stable, unique keys for lists - never use array index as key for dynamic lists.
