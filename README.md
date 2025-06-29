Finance Analytics Dashboard

A full-stack financial dashboard application that lets users track income, expenses, and view visualizations of their financial data. It features JWT-based authentication, CRUD operations on transactions, CSV exports, and a responsive modern UI.

🚀 Technologies

Backend: Node.js, Express, MongoDB, Mongoose, JWT

Frontend: React, Vite, TypeScript, Chakra UI, Recharts, Axios

Dev Tools: Postman collection for API testing, Vite for fast bundling

📂 Repository Structure

```text
Finance-Analytics-Dashboard/
├── backend/                    # Express server with controllers, routes, models
│   ├── src/
│   │   ├── controllers/        # Business logic for auth & transactions
│   │   ├── middleware/         # JWT verification
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API route definitions
│   │   └── utils/              # CSV exporter, error handler, etc.
│   ├── .env.example            # Template for environment variables
│   └── package.json
├── frontend/                   # React app scaffolded with Vite + TS
│   ├── src/
│   │   ├── api/                # Axios instance
│   │   ├── components/         # Transaction table, filter drawer, modals
│   │   ├── pages/              # Login & Dashboard pages
│   │   └── App.tsx             # Routing and protected routes
│   ├── .env.example            # Template for Vite env (VITE_API_URL)
│   └── package.json
└── README.md                   # Project overview and setup instructions
```


📖 Features

Authentication: Register & login with JWT tokens

Transaction CRU‍D: Create, read, update, and delete transactions

CSV Export: Download transaction history as CSV

Visualization: Line chart comparing income vs. expense over time

Filtering & Sorting: Transaction table with global search, column sort, and advanced filters

Responsive UI: Built with Chakra UI for accessibility and mobile-friendly layouts

⚙️ Setup & Run Locally

Prerequisites

Node.js v16+ installed

MongoDB running locally or a connection URI

1. Clone the repo

git clone https://github.com/nimaykhandelwal/Finance-Analytics-Dashboard.git
cd Finance-Analytics-Dashboard

2. Backend

cd backend
npm install
cp .env.example .env   # configure MONGO_URI, JWT_SECRET, PORT
npm run start           # runs with ts-node or `npm run build && npm run start:prod`

Server will be available at http://localhost:4000

3. Frontend

cd ../frontend
npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:4000/api
npm run dev

App will open at http://localhost:5173

4. Postman Collection

Import the provided postman_collection.json in Postman.

Create a new Environment named local with variables:

baseURL: http://localhost:4000/api

token: 

Auth/Register → send new user details.

Auth/Login → sends credentials, saves {{token}} via test script.

Use Get/Create/Update/Delete/Export requests under Finance Analytics Dashboard.

Share collection via Postman share link.



📦 Deployment

(Optional) You can deploy the backend to Heroku/Vercel and the frontend to Netlify or Vercel:

Configure environment variables in your hosting service.

Push your main branch to the remote.

Frontend VITE_API_URL should point to your deployed backend.

🤝 Contributing

Contributions are welcome! Please fork the repo and submit a PR.

Fork it

Create a feature branch (git checkout -b feature/XYZ)

Commit your changes (git commit -m 'feat: add XYZ')

Push branch (git push origin feature/XYZ)

Open a Pull Request

Thank you for checking out my project!

