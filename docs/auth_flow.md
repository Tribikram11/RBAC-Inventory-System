# MERN Authentication Flow (JWT)

```mermaid
sequenceDiagram
    participant User
    participant React
    participant API as Express API
    participant Auth as JWT Middleware
    participant DB as MongoDB

    User->>React: Enter email & password
    React->>API: POST /login
    API->>DB: Verify user credentials
    DB-->>API: User data
    API-->>React: JWT Token
    React->>React: Store token (localStorage)

    User->>React: Access protected page
    React->>API: Request + JWT token
    API->>Auth: Verify JWT
    Auth-->>API: Valid token
    API->>DB: Fetch protected data
    DB-->>API: Data
    API-->>React: Response
