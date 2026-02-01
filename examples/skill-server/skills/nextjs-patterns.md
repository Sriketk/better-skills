---
id: nextjs-patterns
name: Next.js Patterns
description: Best practices and patterns for Next.js applications
version: 1.5.0
tags:
  - nextjs
  - react
  - server-components
  - app-router
triggers:
  - nextjs best practices
  - next.js app router
  - server components
  - next.js data fetching
dependencies:
  - react-best-practices
---

# Next.js Patterns

This skill provides guidance on building Next.js applications with the App Router.

## Server vs Client Components

### Default to Server Components

Server Components are the default in the App Router. Only add "use client" when needed:

```tsx
// This is a Server Component by default
export default function Page() {
  return <h1>Hello World</h1>;
}
```

### When to Use Client Components

Add "use client" only when you need:

- Event handlers (onClick, onChange, etc.)
- useState, useEffect, or other React hooks
- Browser-only APIs
- Class components

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## Data Fetching

### Fetch in Server Components

Server Components can fetch data directly:

```tsx
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`);
  return <ProductDetails product={product} />;
}
```

### Parallel Data Fetching

Fetch data in parallel to avoid waterfalls:

```tsx
async function Dashboard() {
  // These run in parallel
  const [user, analytics, notifications] = await Promise.all([
    getUser(),
    getAnalytics(),
    getNotifications(),
  ]);

  return (
    <>
      <UserCard user={user} />
      <Analytics data={analytics} />
      <Notifications items={notifications} />
    </>
  );
}
```

### Streaming with Suspense

Use Suspense to stream parts of the page:

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Header />
      <Suspense fallback={<ProductsSkeleton />}>
        <Products />
      </Suspense>
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews />
      </Suspense>
    </>
  );
}
```

## Caching

### Request Memoization

Fetch requests are automatically memoized:

```tsx
// Both calls use the same cached result
async function Component1() {
  const data = await fetch("https://api.example.com/data");
}

async function Component2() {
  const data = await fetch("https://api.example.com/data"); // Cached!
}
```

### Opting Out of Caching

Use `cache: 'no-store'` for dynamic data:

```tsx
const data = await fetch("https://api.example.com/data", {
  cache: "no-store",
});
```

### Revalidation

Use `next.revalidate` for time-based revalidation:

```tsx
const data = await fetch("https://api.example.com/data", {
  next: { revalidate: 3600 }, // Revalidate every hour
});
```

## Layouts

### Root Layout

Every app needs a root layout:

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Nested Layouts

Layouts can be nested and preserved on navigation:

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

## Loading and Error States

### Loading UI

Create `loading.tsx` for automatic loading states:

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}
```

### Error Handling

Create `error.tsx` for error boundaries:

```tsx
// app/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

## Server Actions

### Form Handling

Use Server Actions for form submissions:

```tsx
// app/actions.ts
"use server";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  await db.posts.create({ title, content });
  revalidatePath("/posts");
}

// app/new-post/page.tsx
import { createPost } from "./actions";

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">Create</button>
    </form>
  );
}
```

## Metadata

### Static Metadata

Export a metadata object:

```tsx
export const metadata = {
  title: "My Page",
  description: "Page description",
};
```

### Dynamic Metadata

Use generateMetadata for dynamic values:

```tsx
export async function generateMetadata({ params }: Props) {
  const product = await getProduct(params.id);
  return {
    title: product.name,
    description: product.description,
  };
}
```
