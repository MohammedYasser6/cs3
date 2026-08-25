# CS³ Interactive Visualizer - System Architecture & Developer Log

## 1. Project Overview
A full-stack, gamified 3D computer science learning platform. 
* **Tech Stack:** Next.js (App Router), React, Tailwind CSS.
* **3D Engine:** React Three Fiber, @react-three/drei.
* **Backend:** Next.js Server Actions, Next.js Proxy Middleware.
* **Database & Auth:** Prisma ORM, Neon (PostgreSQL serverless), Auth.js (GitHub & Google OAuth).
* **State Management:** Zustand (Client-side, persisted via secure cookies).

## 2. Directory Structure & Curriculum Map
The platform is organized by algorithmic complexity and gated by an XP system.
* **Core Systems:** `components/` (UI/3D Canvas), `lib/` (Prisma client), `store/` (Zustand state).
* **System Routes:** `app/api/` (Auth endpoints), `app/profile/` (Dashboard), `app/search/` (Global search).
* **Tier 0 & 1 (0-50 XP):** `app/binary/`, `app/bitwise/`, `app/arrays/`, `app/2d-arrays/`, `app/programming/`.
* **Tier 2 & 3 (100-150 XP):** `app/pointers/`, `app/linked-lists/`, `app/stacks-queues/`, `app/hash-tables/`.
* **Tier 4 & 5 (200-300+ XP):** `app/recursion/`, `app/sorting/`, `app/trees/`, `app/graphs/`, `app/hardware/`, `app/architecture/`.
* **Assessment Structure:** Every course folder contains a primary `page.tsx` (Theory/3D Visualizer) and a `quiz/page.tsx` (Exam).

## 3. Engineering Mechanics
* **The Gamification Loop:** Zustand manages interactive client-side XP. Upon passing a module exam, server actions trigger secure XP increments in the live Neon PostgreSQL database.
* **Edge Security:** A global `proxy.ts` middleware intercepts network requests. It reads the user's synced `user_xp` cookie and actively blocks unauthorized access to advanced course directories.
* **Hardware Execution Logging:** The 3D React Three Fiber visualizers are bound to stateful UI logs, providing real-time feedback on hardware-level memory and bitwise operations.

## 4. Database Schema (Prisma)
* **User:** Stores `email`, `name`, `image`, total `xp` (Int), and `completedModules` (String[]).
* **Account:** Handles OAuth provider linking (GitHub, Google) to a single user identity.
* **Session:** Manages secure JWT session strategies for edge-network compatibility.