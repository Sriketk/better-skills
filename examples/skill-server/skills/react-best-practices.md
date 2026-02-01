---
id: react-best-practices
name: React Best Practices
description: Performance optimization guidelines for React applications
version: 2.0.0
tags:
  - react
  - performance
  - frontend
  - optimization
triggers:
  - optimize react
  - react performance
  - slow react app
  - react re-renders
---

# React Best Practices

This skill provides guidance on optimizing React applications for performance.

## Component Optimization

### 1. Use React.memo for Pure Components

Wrap components that render the same output for the same props:

```tsx
import { memo } from 'react';

const UserCard = memo(function UserCard({ name, avatar }: Props) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
    </div>
  );
});
```

### 2. Optimize useCallback and useMemo

Only use these hooks when there's a measurable benefit:

```tsx
// Good: Memoize expensive calculations
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.price - b.price);
}, [items]);

// Good: Memoize callbacks passed to memoized children
const handleClick = useCallback((id: string) => {
  dispatch({ type: 'SELECT', id });
}, [dispatch]);

// Bad: Memoizing simple values
const doubled = useMemo(() => count * 2, [count]); // Just use: count * 2
```

## State Management

### 3. Keep State Close to Where It's Used

Don't lift state higher than necessary:

```tsx
// Bad: State in parent when only child needs it
function Parent() {
  const [isOpen, setIsOpen] = useState(false);
  return <Modal isOpen={isOpen} setIsOpen={setIsOpen} />;
}

// Good: State in the component that uses it
function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button onClick={() => setIsOpen(true)}>
      Open Modal
    </button>
  );
}
```

### 4. Split Context by Update Frequency

Separate frequently-changing values from stable ones:

```tsx
// Instead of one large context
const AppContext = createContext({ user, theme, notifications });

// Split into separate contexts
const UserContext = createContext(user);
const ThemeContext = createContext(theme);
const NotificationsContext = createContext(notifications);
```

## Rendering Optimization

### 5. Avoid Creating Objects in JSX

Objects created in render cause unnecessary re-renders:

```tsx
// Bad: New object every render
<Component style={{ color: 'red' }} />

// Good: Stable reference
const style = { color: 'red' };
<Component style={style} />

// Or use CSS classes
<Component className="text-red" />
```

### 6. Use Stable Keys

Never use array index as key for dynamic lists:

```tsx
// Bad: Index as key
{items.map((item, index) => (
  <Item key={index} {...item} />
))}

// Good: Stable unique identifier
{items.map((item) => (
  <Item key={item.id} {...item} />
))}
```

## Data Fetching

### 7. Avoid Waterfalls

Fetch data in parallel when possible:

```tsx
// Bad: Sequential fetches
const user = await fetchUser(id);
const posts = await fetchPosts(id);
const comments = await fetchComments(id);

// Good: Parallel fetches
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id),
]);
```

### 8. Use Suspense for Loading States

```tsx
<Suspense fallback={<Skeleton />}>
  <UserProfile userId={id} />
</Suspense>
```

## Bundle Optimization

### 9. Lazy Load Heavy Components

```tsx
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
```

### 10. Tree-shake Unused Code

Import only what you need:

```tsx
// Bad: Imports entire library
import _ from 'lodash';
_.debounce(fn, 300);

// Good: Import specific function
import debounce from 'lodash/debounce';
debounce(fn, 300);
```
