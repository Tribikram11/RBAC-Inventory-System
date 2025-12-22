A full-stack Inventory Management System built with Role-Based Access Control (RBAC), featuring JWT authentication, secure API access, and production deployment.

🔗 Live Demo (Frontend): https://rbac-inventory-system.vercel.app/login

🔗 Backend API: https://rbac-inventory-system.onrender.com

Features:

Authentication & Authorization

JWT-based authentication

Secure login/logout flow

Role-Based Access Control (RBAC)

Admin - Create users, add/edit/delete items

Manager - Edit item stock & details

Viewer - View items only

Inventory Management

Add items (Admin only)

Edit items (Admin & Manager)

Delete items (Admin only)

View inventory (All roles)

Security

Password hashing using bcrypt

Protected backend routes

Protected frontend routes

Token auto-attachment using Axios interceptors



Tech Stack

Frontend:

React (Vite)

React Router

Axios

Context API

Deployed on Vercel

Backend:

Node.js

Express.js

JWT Authentication

Role-based middleware

Deployed on Render

Database:

MongoDB Atlas

Mongoose ODM


🏗️ Architecture Overview

Frontend (Vercel)

   |
   
   |  HTTPS + JWT
   
   v
Bac
kend API (Render)

   |
   
   |  Mongoose
   
   v
Mon
goDB Atlas



Authentication Flow



User logs in from frontend

Backend validates credentials

JWT token generated

Token stored in browser

Token attached automatically to all API requests

Backend validates token + role



Admin Seeding (Important)



This project follows enterprise RBAC practices.

Public registration is disabled

First admin is created using a seed script



After that:

Admin logs in

Admin creates other users (Manager / Viewer)



This ensures:

No unauthorized user creation

Proper role governance



 Project Structure
B
ackend

Backend/

├── src/

│   ├── controllers/

│   ├── models/

│   ├── routes/

│   ├── middleware/

│   ├── config/

│   └── server.js

├── seedAdmin.js

├── .env

└── package.json



Frontend

Frontend/

├── src/

│   ├── pages/

│   ├── components/

│   ├── context/

│   ├── services/

│   └── App.jsx

├── .env

└── package.json



API Endpoints



Auth

Method	Endpoint	Access

POST	/api/auth/login	Public

POST	/api/auth/register	Admin only

Items

Method	Endpoint	Access

GET	/api/items	All roles

GET	/api/items/:id	All roles

POST	/api/items	Admin

PUT	/api/items/:id	Admin, Manager

DELETE	/api/items/:id	Admin



Environment Variables



Backend (.env)

PORT=3000

MONGO_URL=your_mongodb_atlas_url

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d



Frontend (.env)

VITE_API_BASE_URL=https://your-backend-url/api


Testing Credentials (Example)

Admin:

Email: bikram@email.com

Password: bikram123

Change credentials in production.


Deployment


Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Production issues handled:

Case-sensitive file imports (Linux)

Environment separation (dev vs prod)

Secure API base URLs

CORS configuration


What I Learned


Implementing RBAC correctly

JWT authentication end-to-end

Frontend & backend integration

Production debugging

Deployment pitfalls (case sensitivity, env mismatch)

Admin seeding strategies


Future Improvements


Refresh tokens

HTTP-only cookies

Pagination & search

Activity logs

Rate limiting

Unit & integration tests


Author

Tribikram Swain

GitHub:  github.com/Tribikram11

LinkedIn: linkedin.com/in/tribikram-swain 



