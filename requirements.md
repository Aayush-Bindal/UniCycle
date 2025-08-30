# Application Requirements: Passport.js-Based Campus Marketplace

## Functional Requirements

- Users can log in via Google OAuth (`api/auth/login`)
- Users can log out (`api/auth/logout`)
- Authenticated users can:
  - View all items (`api/items`)
  - Search/filter items (`api/items/search`)
  - View their profile (`api/user/profile`)
  - View their listings (`api/user/my_listings`)
  - View their requests (`api/user/my_request`)
  - View item details (`api/item/<item_id>`)
  - Request to buy an item (`api/item/request`)
  - Edit/delete their requests (`api/item/request/edit`, `api/item/request/delete`)
  - As item admin:
    - View requests for an item (`api/item/view_requests`)
    - Add, edit, or delist items (`api/item/list`, `api/item/edit/`, `api/item/delist/<item_id>`)

## Non-Functional Requirements

- Sessions are secure and scalable (express-session)
- Support at least 100 concurrent users
- Responsive UI for web/mobile browsers
- Authentication response time < 2 seconds
- Secure cookies, HTTPS enforced
- Logging for authentication events
- Robust error handling for invalid credentials/server issues

## Technical Requirements

### Backend

- Node.js with Express.js
- Passport.js for authentication
- express-session for session management
- MongoDB or PostgreSQL for user/item data
- Environment variables for secrets (session, OAuth keys)
- Logging (e.g., Winston, Morgan)

### Frontend

- React, Vue.js, or plain HTML/CSS/JS
- API calls for registration, login, item management

### Other

- Use open-source libraries
- Prioritize security best practices
- Cloud deployment (Heroku, AWS, etc.)

## API Endpoints

| Endpoint                  | Method | Description                        | Auth Required |
|---------------------------|--------|------------------------------------|--------------|
| /api/auth/login           | GET    | Google OAuth login                 | No           |
| /api/auth/logout          | POST   | User logout                        | Yes          |
| /api/items                | GET    | List all items                     | Yes          |
| /api/items/search         | GET    | Search/filter items                | Yes          |
| /api/user/profile         | GET    | Get user profile                   | Yes          |
| /api/user/my_listings     | GET    | User's listings                    | Yes          |
| /api/user/my_request      | GET    | User's requests                    | Yes          |
| /api/item/:item_id        | GET    | Get item info                      | Yes          |
| /api/item/request         | POST   | Request to buy item                | Yes          |
| /api/item/request/edit    | PUT    | Edit request                       | Yes          |
| /api/item/request/delete  | DELETE | Delete request                     | Yes          |
| /api/item/view_requests   | GET    | View requests for an item (admin)  | Yes          |
| /api/item/list            | POST   | Add item (admin)                   | Yes          |
| /api/item/edit/           | PUT    | Edit item (admin)                  | Yes          |
| /api/item/delist/:item_id | DELETE | Delist item (admin)                | Yes          |

## Database Schema (Example: MongoDB)

### User

```js
{
  _id: ObjectId,
  email: String,
  googleId: String, // for OAuth
  createdAt: Date
}
```

### Item

```js
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  owner: ObjectId, // User reference
  status: String, // listed/delisted
  createdAt: Date
}
```

### Request

```js
{
  _id: ObjectId,
  item: ObjectId, // Item reference
  buyer: ObjectId, // User reference
  offerPrice: Number,
  status: String, // pending/accepted/rejected
  createdAt: Date
}
```

## Authentication Flow Diagram

```text
+--------+        +-----------+        +-------------+
| Client | <----> |  Server   | <----> |  Database   |
+--------+        +-----------+        +-------------+
  |                  |                     |
  |---Google OAuth-->|                     |
  |                  |--OAuth Callback---->|
  |                  |<--User Data/Auth----|
  |<--Session/Cookie-|                     |
  |---API Requests-->|--Check Auth-------->|
  |<--Data/Errors----|                     |
  |---Logout-------->|--Destroy Session--->|
```

## Example Passport.js Configuration (Google OAuth Only)

```js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create user logic
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
```

## Dependencies

- express: ^4.18.2
- passport: ^0.7.0
- passport-google-oauth20: ^2.0.0
- express-session: ^1.17.3
- mongoose: ^7.0.0 or pg: ^8.0.0 (choose DB)
- dotenv: ^16.0.0
- morgan/winston: ^1.10.0 (logging)

## Scalability Plan

- Choose a managed database (MongoDB Atlas, AWS RDS).
- Deploy on scalable cloud platform (Heroku, AWS, etc.).
- Use environment variables for secrets.
- Monitor with logging and error tracking tools.

## Testing Tools

- Postman for API endpoint testing
- Jest or Mocha for backend tests
- Cypress or Playwright for end-to-end tests

## Initial Server Resource Estimate (100 users)

- 1 vCPU, 512MB–1GB RAM (Node.js/Express)
- 1GB Redis (for session storage)
- Managed DB (MongoDB/PG): smallest production tier