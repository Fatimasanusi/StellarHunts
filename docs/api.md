# StellarHunts API Reference

> **This file is generated — do not edit it by hand.**
> It is rendered from `docs/openapi.json`, which is emitted from the
> running NestJS application (see issue #555). Regenerate both with:
>
> ```bash
> npm --prefix backend run openapi:generate
> ```
>
> CI fails when this file or `docs/openapi.json` does not match a fresh
> generation.

**API version:** 1.0.0

**Base URL:** `/api/v1`

**Conventions:** every route is served under the versioned prefix above; see [api-conventions.md](api-conventions.md) for the rules.

**Authentication:** operations marked `JWT` require an `Authorization: Bearer <jwt>` header. `JWT + Admin` additionally requires an admin role. `Public` routes accept anonymous requests.

---

## Contents

- [Auth](#auth)
- [Users](#users)
- [User Ranking](#user-ranking)
- [Progress](#progress)
- [Puzzles (Game)](#puzzles-game)
- [Puzzles (Admin CRUD)](#puzzles-admin-crud)
- [Admin](#admin)
- [Puzzle Submission](#puzzle-submission)
- [Puzzle Categories](#puzzle-categories)
- [Puzzle Dependencies](#puzzle-dependencies)
- [Puzzle Translations](#puzzle-translations)
- [Content](#content)
- [Rewards](#rewards)
- [NFT Claim](#nft-claim)
- [Reward Shop](#reward-shop)
- [Achievements](#achievements)
- [Badges](#badges)
- [Streaks](#streaks)
- [Time Trial](#time-trial)
- [In-App Notifications](#in-app-notifications)
- [Referrals](#referrals)
- [Challenges](#challenges)
- [Feedback](#feedback)
- [Activity](#activity)
- [Wallet](#wallet)
- [Health Probes](#health-probes)

---

## Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | Public | Register a new user account |
| POST | `/auth/login` | Public | Log in and receive a JWT |
| GET | `/auth/profile` | JWT | Get the authenticated user's profile |
| POST | `/auth/validate-token` | JWT | Validate a JWT token |

---

## Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/users` | Public | Create a new user |
| PATCH | `/users/profile` | JWT | Update the authenticated user's profile |
| POST | `/users/link-wallet` | JWT | Link a Stellar wallet address to the account |
| GET | `/users/{id}` | JWT | Get a user by ID |
| GET | `/users/{id}/rank` | JWT | Get a user's ranking information |
| GET | `/users/{id}/progress` | JWT | Get a user's overall progress |

---

## User Ranking

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users/{id}/rank` | JWT | Get a user's ranking information |

---

## Progress

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users/{id}/progress` | JWT | Get a user's overall progress |

---

## Puzzles (Game)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/puzzles/submit` | JWT | Submit an answer for a puzzle |
| POST | `/puzzles/hint` | JWT | Request a hint for the current puzzle |
| GET | `/puzzles/progress` | JWT | Get the authenticated user's puzzle progress |
| GET | `/puzzles/rate-limit-status` | JWT | Check current rate-limit status for submissions |
| GET | `/puzzles/active` | Public | List all active puzzles |

---

## Puzzles (Admin CRUD)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/admin/puzzles` | JWT + Admin | List all puzzles (admin view) |
| POST | `/admin/puzzles` | JWT + Admin | Create a new puzzle |
| GET | `/admin/puzzles/{id}` | JWT + Admin | Get a puzzle by ID (admin view) |
| PATCH | `/admin/puzzles/{id}` | JWT + Admin | Update a puzzle |
| DELETE | `/admin/puzzles/{id}` | JWT + Admin | Delete a puzzle |

---

## Admin

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/admin/puzzles` | JWT + Admin | List all puzzles (admin view) |
| GET | `/admin/content` | JWT + Admin | List all content (admin view) |
| POST | `/admin/login` | Public | Admin login |
| GET | `/admin/profile` | JWT + Admin | Get admin profile |

---

## Puzzle Submission

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/puzzle-submission` | JWT | Submit a puzzle answer |

---

## Puzzle Categories

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/puzzle-categories/puzzles-by-category` | Public | Get puzzles grouped by category |
| GET | `/puzzle-categories/categories` | Public | List all categories |
| POST | `/puzzle-categories/categories` | JWT + Admin | Create a category |
| GET | `/puzzle-categories/categories/{id}` | Public | Get a category by ID |
| PUT | `/puzzle-categories/categories/{id}` | JWT + Admin | Update a category |
| DELETE | `/puzzle-categories/categories/{id}` | JWT + Admin | Delete a category |
| GET | `/puzzle-categories/categories/slug/{slug}` | Public | Get a category by slug |
| GET | `/puzzle-categories/puzzles` | Public | List all categorised puzzles |
| POST | `/puzzle-categories/puzzles` | JWT + Admin | Add a puzzle to a category |
| GET | `/puzzle-categories/puzzles/{id}` | Public | Get a categorised puzzle by ID |
| PUT | `/puzzle-categories/puzzles/{id}` | JWT + Admin | Update a puzzle's category assignment |
| DELETE | `/puzzle-categories/puzzles/{id}` | JWT + Admin | Remove a puzzle from a category |
| GET | `/puzzle-categories/categories/{id}/puzzles` | Public | Get all puzzles in a category |
| GET | `/puzzle-categories/puzzles/difficulty/{difficulty}` | Public | Filter puzzles by difficulty |
| GET | `/puzzle-categories/puzzles/search` | Public | Search puzzles |
| POST | `/puzzle-categories/seed-categories` | JWT + Admin | Seed default categories |

---

## Puzzle Dependencies

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/puzzle-dependencies` | JWT | List all dependencies |
| POST | `/puzzle-dependencies` | JWT + Admin | Create a dependency |
| GET | `/puzzle-dependencies/puzzle/{puzzleId}` | JWT | Get dependencies for a puzzle |
| DELETE | `/puzzle-dependencies/puzzle/{puzzleId}` | JWT + Admin | Remove all dependencies for a puzzle |
| GET | `/puzzle-dependencies/{id}` | JWT | Get a dependency by ID |
| PATCH | `/puzzle-dependencies/{id}` | JWT + Admin | Update a dependency |
| DELETE | `/puzzle-dependencies/{id}` | JWT + Admin | Delete a dependency |
| POST | `/puzzle-dependencies/check-eligibility` | JWT | Check if a user is eligible to attempt a puzzle |
| POST | `/puzzle-dependencies/mark-completed` | JWT | Mark a dependency as completed |
| GET | `/puzzle-dependencies/user/{userId}/completed` | JWT | List completed dependencies for a user |
| GET | `/puzzle-dependencies/user/{userId}/unlocked` | JWT | List unlocked puzzles for a user |
| GET | `/puzzle-dependencies/chain/{puzzleId}` | JWT | Get the full prerequisite chain for a puzzle |
| GET | `/puzzle-dependencies/stats/{puzzleId}` | JWT | Get dependency stats for a puzzle |

---

## Puzzle Translations

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/puzzle-translations` | JWT + Admin | Create a translation |
| PUT | `/puzzle-translations/{id}` | JWT + Admin | Update a translation |
| GET | `/puzzle-translations/{puzzleId}` | Public | Get all translations for a puzzle |
| GET | `/puzzle-translations/{puzzleId}/lang` | Public | Get a translation for a puzzle in a specific language |

---

## Content

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/content` | Public | List published content |
| GET | `/content/{id}` | Public | Get a content item by ID |
| GET | `/admin/content` | JWT + Admin | List all content (admin view) |
| POST | `/admin/content` | JWT + Admin | Create a content item |
| GET | `/admin/content/{id}` | JWT + Admin | Get a content item (admin view) |
| PATCH | `/admin/content/{id}` | JWT + Admin | Update a content item |
| DELETE | `/admin/content/{id}` | JWT + Admin | Delete a content item |

---

## Rewards

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/rewards` | JWT | List all rewards |
| POST | `/rewards` | JWT + Admin | Create a reward |
| GET | `/rewards/{id}` | JWT | Get a reward by ID |
| DELETE | `/rewards/{id}` | JWT + Admin | Delete a reward |
| GET | `/rewards/challenge/{challengeId}` | JWT | Get rewards for a challenge |
| POST | `/rewards/claim` | JWT | Claim a reward |
| GET | `/rewards/user/{userId}/claims` | JWT | List all reward claims for a user |
| GET | `/rewards/claims/{id}` | JWT | Get a specific claim |
| GET | `/rewards/{id}/stats` | JWT | Get claim stats for a reward |

---

## NFT Claim

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/nft-claim/claim` | JWT | Trigger an NFT badge mint for a completed level |

---

## Reward Shop

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reward-shop` | JWT | List reward shop items (see Swagger for full schema) |

---

## Achievements

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/achievements/{playerId}` | JWT | Get all achievements for a player |

---

## Badges

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/badges/assign` | JWT + Admin | Assign a badge to a user |
| GET | `/badges/user/{id}` | JWT | Get all badges for a user |

---

## Streaks

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/streaks/activity` | JWT | Record a streak activity event |
| GET | `/streaks/user/{userId}` | JWT | Get streak data for a user |
| GET | `/streaks/my-streak` | JWT | Get the authenticated user's streak |
| GET | `/streaks/leaderboard` | JWT | Streak leaderboard |
| GET | `/streaks/history` | JWT | Authenticated user's streak history |
| GET | `/streaks/user/{userId}/history` | JWT | Streak history for a user |
| POST | `/streaks/recalculate` | JWT + Admin | Recalculate streaks |
| POST | `/streaks/reset` | JWT + Admin | Reset streaks |
| GET | `/streaks/active` | JWT | List users with active streaks |
| GET | `/public/streaks/user/{userId}` | Public | Get streak data for a user (public) |
| GET | `/public/streaks/leaderboard` | Public | Public streak leaderboard |
| GET | `/public/streaks/user/{userId}/history` | Public | Public streak history for a user |
| GET | `/public/streaks/stats` | Public | Global streak statistics |

---

## Time Trial

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/time-trial/start` | JWT | Start a timed puzzle attempt |
| POST | `/time-trial/submit/{id}` | JWT | Submit an answer for a time trial |
| GET | `/time-trial/results/{userId}` | JWT | Get time trial results for a user |
| GET | `/time-trial/leaderboard/{puzzleId}` | Public | Time trial leaderboard for a puzzle |

---

## In-App Notifications

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/in-app-notifications` | JWT | List notifications for the authenticated user |
| POST | `/in-app-notifications` | JWT | Create a notification |
| GET | `/in-app-notifications/unread-count` | JWT | Get unread notification count |
| POST | `/in-app-notifications/system` | JWT + Admin | Send a system-wide notification |
| PATCH | `/in-app-notifications/read` | JWT | Mark a notification as read |
| PATCH | `/in-app-notifications/read-all` | JWT | Mark all notifications as read |
| PATCH | `/in-app-notifications/archive` | JWT | Archive a notification |
| DELETE | `/in-app-notifications/{id}` | JWT | Delete a notification |

---

## Referrals

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/referrals/codes` | JWT | Generate a referral code |
| GET | `/referrals/codes/my` | JWT | Get the authenticated user's referral code |
| POST | `/referrals/invites` | JWT | Send a referral invite |
| GET | `/referrals/stats` | JWT | Get referral statistics |
| GET | `/referrals/history` | JWT | Get referral history |
| POST | `/referrals/invites/{id}/complete` | JWT | Mark a referral invite as completed (referrer only) |
| POST | `/referrals/register` | JWT | Register the authenticated user against a pending referral invite |

---

## Challenges

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/challenges` | JWT | List all challenges |
| POST | `/challenges` | JWT + Admin | Create a challenge |
| GET | `/challenges/available` | JWT | List challenges available to the user |
| GET | `/challenges/daily` | JWT | Get today's daily challenge |
| GET | `/challenges/weekly` | JWT | Get the current weekly challenge |
| GET | `/challenges/{id}` | JWT | Get a challenge by ID |
| PATCH | `/challenges/{id}` | JWT + Admin | Update a challenge |
| DELETE | `/challenges/{id}` | JWT + Admin | Delete a challenge |
| GET | `/challenges/{id}/stats` | JWT | Get stats for a challenge |

---

## Feedback

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/feedback` | JWT | Submit feedback |
| GET | `/feedback/admin` | JWT + Admin | List all feedback (admin view) |
| GET | `/feedback/stats` | JWT + Admin | Feedback statistics |
| GET | `/feedback/target/{targetType}` | JWT | Get feedback for a target type |
| PUT | `/feedback/admin/{id}` | JWT + Admin | Update a feedback entry |
| DELETE | `/feedback/admin/{id}` | JWT + Admin | Delete a feedback entry |

---

## Activity

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/activity` | JWT | Get the social activity feed (see Swagger for full schema) |

---

## Wallet

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/wallet/link` | JWT | Link a Stellar wallet address |
| GET | `/wallet/verify-signature` | JWT | Verify a wallet signature (GET) |
| POST | `/wallet/verify-signature` | JWT | Verify a wallet signature (POST) |

---

## Health Probes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health/live` | Public | Liveness probe — returns `200` while the process is accepting requests |
| GET | `/health/ready` | Public | Readiness probe — returns `200` only when required dependencies are reachable; `503` otherwise |

---

## Error Responses

All endpoints return standard HTTP status codes:

| Status | Meaning |
|--------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing or invalid JWT) |
| 403 | Forbidden (insufficient role) |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

Error bodies follow the NestJS default shape:

```json
{
  "statusCode": 400,
  "message": ["field must not be empty"],
  "error": "Bad Request"
}
```
