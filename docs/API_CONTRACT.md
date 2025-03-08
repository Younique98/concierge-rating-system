# API Contract

## Overview

This document outlines the contract for the Review System API, detailing the
endpoints, request and response formats, and expected behaviors. The goal is to
establish a well-defined API that is scalable, predictable, and easy to
integrate with the front-end application.

## Base URL

```
/api/reviews
```

## Endpoints

### 1. Get All Reviews

**Endpoint:**

```
GET /api/reviews
```

**Description:** Fetches all existing reviews.

**Response:**

```json
[
  {
    "id": "12345",
    "name": "John Doe",
    "rating": 5,
    "review": "Amazing experience! Highly recommend."
  },
  {
    "id": "67890",
    "name": "Jane Smith",
    "rating": 4,
    "review": "Great service, but could improve response times."
  }
]
```

**Response Codes:**

- `200 OK` - Successfully retrieved the list of reviews
- `500 Internal Server Error` - If something goes wrong on the server

---

### 2. Submit a New Review

**Endpoint:**

```
POST /api/reviews
```

**Description:** Allows users to submit a new review.

**Request Body:**

```json
{
  "name": "John Doe",
  "rating": 5,
  "review": "Amazing experience! Highly recommend."
}
```

**Response:**

```json
{
  "message": "Review submitted successfully!",
  "review": {
    "id": "12345",
    "name": "John Doe",
    "rating": 5,
    "review": "Amazing experience! Highly recommend."
  }
}
```

**Response Codes:**

- `201 Created` - Review successfully submitted
- `400 Bad Request` - If required fields are missing or invalid
- `500 Internal Server Error` - If the request fails due to a server issue

---

### 3. Delete a Review

**Endpoint:**

```
DELETE /api/reviews/{id}
```

**Description:** Removes a review by ID.

**Response:**

```json
{
  "message": "Review deleted successfully!"
}
```

**Response Codes:**

- `200 OK` - Successfully deleted the review
- `404 Not Found` - If the review ID does not exist
- `500 Internal Server Error` - If something goes wrong on the server

---

## Additional Considerations

- **Rate Limiting:** To prevent spam, limit users to submitting one review per 5
  minutes.
- **Validation:** Ensure the `rating` field is between `1-5` and that `name` and
  `review` fields are non-empty.
- **Pagination:** If the review dataset grows large, implement pagination with
  `?page=1&limit=10`.
- **Caching:** Use caching strategies to reduce redundant API calls and improve
  performance.

--

## Future Enhancements

- **Edit Reviews:** Allow users to update their reviews.
- **User Authentication:** Restrict reviews to logged-in users.
- **Review Moderation:** Implement a flagging system for inappropriate reviews.
- **Search & Filtering:** Enable users to filter reviews based on ratings, date,
  or keywords.
