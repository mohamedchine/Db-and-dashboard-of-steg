# STEG Dashboard and Database

> A comprehensive full-stack web application that **digitalizes the Excel-based reporting system** and **automatically consolidates reports** for STEG (Société Tunisienne de l'Électricité et du Gaz). This platform replaces the outdated manual Excel file collection and consolidation process with a modern, real-time digital solution that connects Direction, Groupements, and Centrals across Tunisia.

---

## Table of Contents

- [Mission](#-mission)
- [Key Features](#-key-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Security Considerations](#-security-considerations)
- [The Challenge We Solve](#-the-challenge-we-solve)
- [Key Benefits & Impact](#-key-benefits--impact)
- [Technical Notes](#-technical-notes)

---

## 🎯 Mission

To modernize energy management in Tunisia by enabling seamless collaboration and data-driven decision-making between the Direction, Groupements, and Centrals. Our goal is to create a truly connected and efficient energy ecosystem.

---

## 🚀 Key Features

### ⚡ National Energy Oversight
Our platform replaces the outdated Excel-based reporting system with a modern digitalized solution. Instead of manually collecting and consolidating Excel files from each central, data is now accessible and managed efficiently across all Tunisian centrals in real time.

### 📊 Automated Data Consolidation
No more manual file merging. The system **automatically consolidates reports from every central**, which include:
- **Alarms** - Equipment and operational alarms
- **Maintenance records** - Maintenance scheduling and history
- **Defective equipment** - Equipment status and defect reports
- **Performance data** - Performance metrics and analytics
- **Activity logs** - Operational activity tracking
- **Turbines data** - Turbine operations and status

Groupement staff can instantly view aggregated reports for their supervised centrals, while Direction has full nationwide visibility—all generated dynamically based on selected filters. All of this data that was previously managed in separate Excel files is now automatically consolidated into comprehensive reports.

### 🛠️ Tools for Every Role
Each user gets a tailored experience. From machine operators to centrals chiefs to supervisors and directors, every role has access to the specific tools and dashboards needed for their daily operations and decision-making.

### 🔐 Secure Access and Activity Tracking
Only authorized STEG personnel can log in. User roles define access to reports, dashboards, and actions. Every operation performed on the platform is securely logged and tracked to ensure transparency and accountability.

### 🧩 Error Correction and Dynamic Reporting
If a central submits incorrect data (alarms, maintenance records, defective equipment, performance data, etc.), central employees can easily correct it without restarting the entire process. Reports automatically update based on the latest entries, ensuring accuracy and eliminating the need for manual re-consolidation.

### 📈 Multi-level Dashboards
The platform provides specialized dashboards for different organizational hierarchies:

| Level | Dashboard | Description |
|-------|-----------|-------------|
| 🏭 Central | Central Dashboard | Individual central operations and data entry |
| 🗂️ Groupement | Groupement Dashboard | Aggregated view of all supervised centrals |
| 🏢 Direction | Direction Dashboard | Nationwide overview and consolidated reporting |

### 🔒 Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- Security headers with Helmet
- CORS configuration
- Request validation with Joi

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version |
|-------------|---------|
| **Node.js** | v14 or higher |
| **npm** | v6 or higher (or yarn) |
| **MySQL / MariaDB** | Latest stable |
| **Git** | Optional |

---

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MySQL2** (MariaDB/MySQL database)
- **JWT** for authentication
- **bcrypt** for password hashing
- **Joi** for validation
- **Nodemailer** for email functionality
- **Helmet** for security headers
- **Express Rate Limit** for rate limiting
- **Node-cron** for scheduled tasks

### Frontend
- **React.js** (v19)
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for API calls
- **Recharts** for data visualization
- **Framer Motion** for animations
- **React Toastify** for notifications
- **Date-fns** for date manipulation

---

## 📁 Project Structure

```
Db-and-dashboard-of-steg/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   │   ├── centraldashboard/
│   │   ├── directiondashboard/
│   │   └── groupement/
│   ├── middleware/         # Custom middleware
│   ├── model/              # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── views/              # View templates
│   ├── server.js           # Entry point
│   └── package.json
├── frontend/               # React.js frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── api/            # API configuration
│   │   ├── components/     # React components
│   │   ├── context/        # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   │   ├── centraldashboard/
│   │   │   ├── directiondashboard/
│   │   │   └── groupementdashboard/
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main app component
│   └── package.json
├── db/                     # Database SQL files
│   ├── steg_db_maria.sql
│   └── steg_db_standard_sql.sql
└── README.md
```

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Db-and-dashboard-of-steg
```

### 2. Backend Setup

```bash
cd backend
npm install
npm install nodemon
```

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=steg_db
DB_PORT=3306

# Server Configuration
PORT=5000

# Client URL (for CORS)
client_url=http://localhost:3000

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here

# Email Configuration (if using email features)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Database Setup

**1. Create the database:**
```sql
CREATE DATABASE steg_db;
```

**2. Import the schema** (choose one):
```bash
# MariaDB
mysql -u your_user -p steg_db < db/steg_db_maria.sql

# Standard SQL
mysql -u your_user -p steg_db < db/steg_db_standard_sql.sql
```

---

## 🚀 Running the Application

### Development Mode

**Start the Backend:**
```bash
cd backend
nodemon server.js
```
> Runs on `http://localhost:5000` (or the port specified in your `.env`)

**Start the Frontend:**
```bash
cd frontend
npm start
```
> Runs on `http://localhost:3000` and opens automatically in your browser

### Production Build

**Build the Frontend:**
```bash
cd frontend
npm run build
```

**Start the Backend** (with PM2):
```bash
cd backend
pm2 start server.js
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | User registration |
| `POST` | `/auth/login` | User login |
| `POST` | `/auth/logout` | User logout |

### Turbines
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/turbines` | Get turbines list |

### Alarms
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/alarms` | Get alarms |
| `POST` | `/alarms` | Create alarm |
| `PUT` | `/alarms/:id` | Update alarm |
| `DELETE` | `/alarms/:id` | Delete alarm |

### Performance
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/performance` | Get performance data |

### Maintenance
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/maintenance` | Get maintenance records |
| `POST` | `/maintenance` | Create maintenance record |

### Defective Equipment
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/defectiveequipements` | Get defective equipment list |
| `POST` | `/defectiveequipements` | Report defective equipment |

### Activity Logs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/activitylogs` | Get activity logs |

### Direction & Groupement Dashboards
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/direction/*` | Direction dashboard endpoints |
| `GET` | `/groupement/*` | Groupement dashboard endpoints |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/warmup` | Server and database health check |

---

## 🔐 Security Considerations

- All API endpoints are protected with authentication middleware
- Rate limiting is applied to prevent abuse
- Passwords are hashed using bcrypt
- JWT tokens are used for session management
- Security headers are set using Helmet
- Input validation is performed using Joi
- CORS is configured to allow only trusted origins

---

## 💡 The Challenge We Solve

The old Excel-based reporting system was time-consuming and error-prone. Each central had to send its own file, which the Groupement and Direction manually consolidated. A single mistake meant repeating the entire process, causing delays, inconsistencies, and unnecessary effort.

## ✨ Our Digital Solution

We've built a centralized, real-time platform that **eliminates manual consolidation**. It automatically gathers all report data (alarms, maintenance, defective equipment, performance, etc.) from all centrals, dynamically generates consolidated reports, and allows each central to correct its own errors instantly without restarting the whole process.

---

## 🎁 Key Benefits & Impact

With our system, Tunisia can achieve:

| Benefit | Description |
|---------|-------------|
| ⚡ **Greater efficiency** | No more manual file merging and consolidation |
| ✅ **Fewer human errors** | Automated data collection and validation |
| 📡 **More reliable data** | Real-time updates ensure accuracy |
| ⏱️ **Time savings** | Significant time saved for Groupement and Direction staff |
| 🔄 **Up-to-date reporting** | Reports automatically update based on the latest entries |
| 🔒 **Data integrity** | All employee inputs are automatically recorded in the activity log |

---

## 📝 Technical Notes

- Ensure your database server is running before starting the backend
- The backend performs a health check on startup to verify database connectivity
- Cookies are used for authentication (ensure CORS is properly configured)
- The application uses a connection pool for database operations
- All reports are generated dynamically based on real-time data from the database

---

## 📄 License

This project is part of a **PFE (Projet de Fin d'Études)** for STEG.

---

**🎬 Demo video:** [Watch on LinkedIn](https://www.linkedin.com/posts/mohamed-chine-b984592aa_webdeveloppement-reactjs-nodejs-activity-7355400136253980672-GnnA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEp2KGQBNUd9xbgH0qszi_ghnMqfCZ2AcNs)