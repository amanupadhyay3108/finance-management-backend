#  Finance Management Backend

A backend system for managing financial records with **JWT authentication** and **role-based access control**.
Built as part of a backend development assignment to demonstrate API design, data modeling, and access control.

---

## Features

### Authentication & Authorization

* User Registration & Login
* JWT-based authentication
* Role-based access control:

  * **Viewer** → View dashboard only
  * **Analyst** → View records & insights
  * **Admin** → Full access (create/update/delete)

---

### Financial Records

* Create financial records
* View all records
* Update records
* Delete records

Each record contains:

* Amount
* Type (Income / Expense)
* Category
* Date

---

### Filtering Support

* Filter by type
* Filter by category
* Filter by date range

Examples:

```
/records?type=income
/records?category=salary
/records?startDate=2026-04-01&endDate=2026-04-30
```

---

### Dashboard API

Provides aggregated data:

* Total Income
* Total Expense
* Net Balance

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)

---

## Project Structure

```
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
├── server.js
```

---

## Setup Instructions

### 1. Clone the repository

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file:

---

### 4. Run the server

Development:

```
npm run dev
```

Production:

```
npm start
```

---

## API Endpoints

### User Routes

#### Register

```
POST /users/register
```

#### Login

```
POST /users/login
```

---

### Record Routes

#### Create Record (Admin)

```
POST /records
```

#### Get Records (Analyst/Admin)

```
GET /records
```

#### Update Record (Admin)

```
PUT /records/:id
```

#### Delete Record (Admin)

```
DELETE /records/:id
```

---

### Dashboard

#### Get Summary

```
GET /dashboard
```

Response:

```json
{
  "totalIncome": 2000,
  "totalExpense": 500,
  "netBalance": 1500
}
```

---

## Authentication

All protected routes require:

```
Authorization: Bearer <token>
```

---

## Validation & Error Handling

* Missing fields validation
* Invalid token handling
* Proper status codes used
* Role-based access restrictions

---

## Assumptions

* Roles are predefined (Viewer, Analyst, Admin)
* Only Admin can modify records
* Each record is linked to a specific user
* Dashboard aggregates user-specific data

---

## Future Improvements

* Category-wise analytics
* Pagination for records
* Advanced dashboard insights (monthly trends)
* User management APIs
* API documentation (Swagger)

---

## Author

Aman Upadhyay

---

## Conclusion

This project demonstrates:

* Backend architecture design
* Secure authentication & authorization
* RESTful API development
* Data handling and aggregation

---
