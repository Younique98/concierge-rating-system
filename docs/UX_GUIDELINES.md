# UX Guidelines

## Purpose

This document outlines best practices for incorporating UX principles into our
development workflow. By aligning engineering decisions with foundational UX
laws, we ensure that our applications are intuitive, accessible, and provide an
optimal user experience.

---

## Key UX Laws & How We Apply Them

### 1️. **Aesthetic-Usability Effect**

> Users often perceive aesthetically pleasing design as being more usable.

- **Implementation:** Ensure visually appealing designs that are functional and
  accessible.
- **Application in This Project:**
- Consistent spacing, typography, and layout for reviews.
- Ensuring buttons, form inputs, and interactions are visually appealing and not
  overwhelming.

### 2. **Doherty Threshold**

> Productivity soars when users interact at a pace (<400ms) that ensures neither
> has to wait on the other.

- **Implementation:** Minimize wait times and provide immediate feedback.
- **Application in This Project:**
- Skeleton loaders for fetching reviews.
- Quick response UI feedback on star selection & form submission.

### 3. **Fitts's Law**

> The time to acquire a target is a function of the distance to and size of the
> target.

- **Implementation:** Ensure touch targets (buttons, icons) are large and easily
  clickable.
- **Application in This Project:**
- Clickable stars for rating must be large enough for easy selection.
- Submit button should be easy to reach and interact with.

### 4️. **Goal-Gradient Effect**

> The tendency to approach a goal increases with proximity to the goal.

- **Implementation:** Use progress indicators or step-based flows to encourage
  users to complete actions.
- **Application in This Project:**
- Visual cue for how many reviews are left to load in pagination.
- Encouraging users to submit reviews with a step-based input design.

### 5️. **Hick's Law**

> The time it takes to make a decision increases with the number and complexity
> of choices.

- **Implementation:** Reduce decision fatigue by limiting options per step.
- **Application in This Project:**
- Displaying a limited number of reviews per page.
- Using clear CTAs (call-to-actions) instead of multiple competing options.

### 6️. **Jakob's Law**

> Users spend most of their time on other sites. This means that users prefer
> your site to work the same way as all the other sites they already know.

- **Implementation:** Follow established design conventions for usability.
- **Application in This Project:**
- Review cards styled similarly to common rating systems (e.g., Amazon, Yelp).
- Pagination & form inputs follow standard UX patterns.

### 7️. **Miller's Law**

> The average person can only keep 7 (plus or minus 2) items in their working
> memory.

- **Implementation:** Avoid cognitive overload with chunked information display.
- **Application in This Project:**
- Limit the number of displayed reviews per page.
- Ensure the UI presents only necessary information at a time.

### 8️. **Peak-End Rule**

> People judge an experience largely based on how they felt at its peak and at
> its end.

- **Implementation:** Provide delightful, rewarding interactions at critical
  points.
- **Application in This Project:**
- Smooth animations when submitting a review.
- Thank-you messages or confirmation prompts when submitting feedback.

## Toast Notifications (react-hot-toast)

- **Position:** Always **top-center** to ensure visibility and quick
  recognition.
- **Duration:** 4s before auto-dismissal (enough time to read but not
  disruptive).
- **UX Laws Considered:**
  - **Jakob’s Law:** Users expect notifications to behave like those from
    familiar apps.
  - **Hick’s Law:** The decision to close/ignore the toast should be effortless.
  - **Fitts’s Law:** Placing toasts near the center reduces mouse/eye travel
    distance.
- **Styling Considerations:**
  - Error messages use **red** (`#ef4444`), success uses **green** (`#22c55e`).
  - Toasts have rounded corners (`border-radius: 8px`) for a softer UI feel.
  - Animations include **fade-in & fade-out** for a smooth experience.
