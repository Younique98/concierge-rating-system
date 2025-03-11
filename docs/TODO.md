# **Project TODO & Dependency Tracking**

## **Purpose**

This document serves as a **tracking system** for pending tasks, dependencies,
optimizations, and key implementation steps. This ensures **nothing is missed**
as the project progresses.

---

## ** Current Dependencies & Installation Plan**

This section outlines the dependencies that will be installed **as needed** to
keep the project lightweight and maintainable.

| **Feature**               | **Dependency**                              | **Why It's Needed?**                                                      | **When to Install?**                                                |
| ------------------------- | ------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Animations**            | `framer-motion`                             | Adds smooth UI animations for transitions and interactions.               | Before implementing Issue: **Animations for Smooth UI Transitions** |
| **Accessibility Testing** | `@axe-core/react`                           | Automated accessibility testing for WCAG compliance.                      | Before implementing Issue: **Accessibility Compliance**             |
| **Security Testing**      | `helmet`                                    | Middleware for setting security headers in Next.js API routes.            | Before implementing Issue: **Security Best Practices**              |
| **Rate Limiting**         | `express-rate-limit`                        | Prevents excessive API requests by limiting the number of calls per user. | Before implementing Issue: **Security Best Practices**              |
| **Testing**               | `jest`, `@testing-library/react`, `cypress` | Unit, integration, and E2E testing tools.                                 | Before implementing Issue: **Unit & Integration Tests**             |

**Install dependencies only when we reach their related issues or milestones.**

---

## ** Pending Tasks & Optimizations**

This section includes high-priority implementation tasks that need to be
tracked.

### **Core Implementation (Milestone 1)**

- [ ] Implement React Query for fetching reviews.
- [ ] Display reviews with correct UI styling.
- [ ] Ensure loading states with skeleton loaders.
- [ ] Implement global error handling with snackbars.

### **Performance & UX Enhancements (Milestone 2)**

- [ ] Optimize React Query settings for caching and re-fetching.
- [ ] Implement smooth UI animations for loading and transitions.
- [ ] Enhance accessibility compliance (keyboard navigation, ARIA attributes).

### **Security & Testing (Milestone 3)**

- [ ] Implement rate limiting for review submissions.
- [ ] Validate API request data to prevent XSS & injection attacks.
- [ ] Write comprehensive unit, integration, and E2E tests.
- [ ] Set up CI/CD pipeline to enforce automated testing and linting.
