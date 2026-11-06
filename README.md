<div align="center">
  <h1>🔗 URL Shortener API</h1>
  <p>A robust, fast, and secure URL shortening service built with Node.js, Express, PostgreSQL, and Drizzle ORM.</p>
</div>

## ✨ Features

- **User Authentication**: Secure signup and login using JWT.
- **Short Links**: Convert long destination URLs into compact, shareable links.
- **Dashboard API**: Fetch all shortened URLs created by the authenticated user.
- **Delete Support**: Remove URLs that you no longer need.
- **Type-Safe ORM**: Uses Drizzle ORM for fully type-safe database queries.
- **Dockerized Database**: Easy local setup with `docker-compose`.
- **Validation**: Schema validation using Zod.

---

## 🧱 Tech Stack

| Category | Technology |
| --- | --- |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **ORM** | Drizzle ORM |
| **Authentication** | JWT, HMAC-SHA256 (crypto) |
| **Validation** | Zod |
| **Containerization** | Docker, Docker Compose |
| **Unique ID Gen** | nanoid |

---

## 📂 Folder Structure

```text
├── controllers/       # Route request handlers
├── db/                # Database connection & Drizzle config
├── middlewares/       # Express middlewares (Auth, etc.)
├── models/            # Database schema definitions (Drizzle)
├── postman/           # Postman collection & environment for testing
├── routes/            # Express route declarations
├── services/          # Core business logic
├── utils/             # Helper functions & utilities
├── validation/        # Zod validation schemas
├── docker-compose.yml # PostgreSQL docker configuration
└── index.js           # Application entry point
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for the database)
- [pnpm](https://pnpm.io/) (used as the package manager)

### 1️⃣ Clone the Repository

```bash
# Clone the project (or open the existing directory)
cd URL_Shortener
```

### 2️⃣ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database Config
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=admin
DB_NAME=postgres

# Database URL for Drizzle
DATABASE_URL=postgresql://postgres:admin@localhost:5432/postgres

# JWT Secret
JWT_SECRET=super_secret_key

# Server Port
PORT=8000
```

### 3️⃣ Start the Database

Make sure Docker is running, then spin up the PostgreSQL container:

```bash
docker-compose up -d
```

### 4️⃣ Install Dependencies

Install project dependencies using pnpm:

```bash
pnpm install
```

### 5️⃣ Run Database Migrations

Push the Drizzle schema to your PostgreSQL database:

```bash
pnpm run db:push
```

*(Optional) You can explore your database using Drizzle Studio:*
```bash
pnpm run db:studio
```

### 6️⃣ Start the Server

Run the application in development mode:

```bash
pnpm run dev
```

The server will start on `http://localhost:8000`.

---

## 📚 API Reference

Here are the available endpoints. All protected routes require a `Bearer <token>` in the `Authorization` header.

### Authentication

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| POST | `/user/signup` | Register a new user | ❌ |
| POST | `/user/login` | Login and receive JWT token | ❌ |

### URLs

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| POST | `/shorten` | Create a short URL | ✅ |
| GET | `/:shortCode` | Redirect to original URL | ❌ |
| GET | `/codes` | Get all URLs for logged-in user | ✅ |
| DELETE | `/:id` | Delete a specific short URL | ✅ |

---

## 🧪 Testing with Postman (Local Mode)

1. Open **Postman**.
2. Switch to **Local Mode** (or open the repository/workspace directory).
3. Select the `postman` folder. Postman will automatically discover:
   - Collection: **URL_Shortener**
   - Environment: **URL_Shortener** (`URL_Shortener.environment.yaml`)
4. In the top-right environment dropdown, select **URL_Shortener**.
5. Test the requests in order:
   - `CreateUserByEmail` → Registers a test user
   - `LoginUser` → Authenticates and **automatically saves the JWT token** to the environment!
   - `shortenURL` → Creates a shortened link and **automatically saves its ID**!
   - `getAllURLs` → Fetches your links
   - `deleteURL` → Deletes the shortened link using the saved ID

---

<div align="center">
  <i>Built with ❤️ using Node.js & Express</i>
</div>
