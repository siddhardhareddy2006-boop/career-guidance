# CareerGuide

Web application for career guidance and counseling: students explore career paths, read curated resources, update interests and skills, and book sessions with counselors. Administrators manage resources, assign counselors to students, and review engagement metrics.

## Stack

- **Frontend:** React (Vite), React Router, Axios, Bootstrap 5 (CDN)
- **Backend:** Express.js, JWT auth, Mongoose
- **Database:** MongoDB

## Prerequisites

- Node.js 18+
- MongoDB running locally or a connection string (e.g. MongoDB Atlas)

## Setup

1. Install dependencies:

   ```bash
   npm run install-all
   ```

2. Server environment — copy `server/.env.example` to `server/.env` and adjust `MONGODB_URI` and `JWT_SECRET`. For **personalized career ideas** (students), set `CAREER_INSIGHTS_API_KEY` and optionally `CAREER_INSIGHTS_MODEL` (see `.env.example`).

3. Seed demo accounts and reset the resource library (optional):

   ```bash
   npm run seed
   ```

   - Creates demo admin/counselor if missing.
   - **Deletes all career resources** in the database, then inserts **10** default general-purpose articles (internships, changing workplace tools, interviews, resume, networking, exploration, portfolio, negotiation, wellbeing, online presence). **Do not run seed in production** if you need to keep custom resources—or back up first.
   - Admin: `admin@careerguide.demo` / `demo1234`
   - Counselor: `counselor@careerguide.demo` / `demo1234`

4. Run API and client together:

   ```bash
   npm run dev
   ```

   - API: [http://localhost:5050](http://localhost:5050) (`/api/health`) — default avoids macOS AirPlay using port 5000
   - App: [http://localhost:5173](http://localhost:5173)

## Roles

| Role       | Capabilities |
|------------|----------------|
| **Student**| Register, profile (interests/skills), personalized career suggestions, browse paths/resources, book sessions |
| **Counselor** | Confirm/complete sessions assigned to them (seed or DB `role: counselor`) |
| **Admin**  | Dashboard stats, CRUD resources (including drafts), assign counselors, engagement log |

## API overview

- `POST /api/auth/register` · `POST /api/auth/login` · `GET/PATCH /api/auth/me`
- `GET /api/career-paths` · `GET /api/resources` · `GET /api/resources/:id`
- `GET /api/counselors` · `GET/POST /api/sessions` · `PATCH /api/sessions/:id`
- `POST /api/engagement/track` (page and path views)
- `POST /api/career-insights/generate` (auth; profile interests & skills)
- `POST /api/career-insights/saved-path` (save one suggested path) · `GET/DELETE /api/career-insights/saved-path/:id`
- `GET /api/career-paths` — signed-in user’s saved paths (`slug: saved-<id>`)
- `GET /api/admin/*` (admin only: stats, students, resources list, engagement)
