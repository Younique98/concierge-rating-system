# Technical Design Document: Point.me Reviews System

## 1. Overview

This document outlines the **technical architecture, design considerations, and
trade-offs** for the Reviews System.

## 2. Problem Statement

The goal is to create a **scalable, performant review system** that allows users
to:

- Fetch and display reviews efficiently.
- Submit new reviews securely with validation.
- Prevent spam and abuse using rate limiting.

## 3. High-Level Architecture

### **Frontend**

- **React + Next.js** → Server-side rendering for performance.
- **React Query** → Manages API state efficiently.
- **Tailwind CSS** → Utility-first styling.

### **Backend (API Layer)**

- **Next.js API Routes** → Lightweight backend for handling reviews.
- **PostgreSQL (or Firebase)** → Stores review data.
- **Express Rate Limit** → Prevents spam submissions.
- **Helmet.js & CORS** → Security measures for API requests.

## 4. Security Considerations

- **Rate Limiting** → Prevents bots from spamming reviews.
- **CSRF Protection** → Ensures only valid form submissions are accepted.
- **Input Validation** → Prevents XSS attacks and SQL injection.

## 5. Performance & Scalability

- **React Query Caching** → Avoids redundant API calls.
- **Lazy Loading & Skeleton Loaders** → Improves perceived performance.
- **Pagination & Infinite Scroll** → Reduces API load.

## 6. Tech Stack Justification

| **Technology**   | **Reason for Choosing**                                   |
| ---------------- | --------------------------------------------------------- |
| **Next.js**      | Provides SSR for performance & SEO benefits.              |
| **React Query**  | Handles API state with caching and re-fetching.           |
| **PostgreSQL**   | Scalable relational database for structured reviews data. |
| **Tailwind CSS** | Lightweight and highly customizable UI framework.         |

## 7. Trade-Offs & Risks

- **Database Choice** → If using Firebase, we sacrifice relational integrity.
- **Authentication Not Implemented Yet** → Potential risk of anonymous spam.

## 8. Future Considerations

- **OAuth Authentication** → Only allow logged-in users to submit reviews.
- **GraphQL API** → More flexibility for frontend queries.
- **WebSockets for Real-Time Updates** → Live review updates without reloading.
