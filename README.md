# 🔧 Fixora — Local Skill Hub

Fixora is a full-stack local services marketplace that connects users with service providers for everyday services such as **electricians, tutors, plumbers, and other local professionals**.

The project is built using the **MERN stack** with authentication, service management, location-based features, payments, email communication, and a modern React frontend.

## 🚀 Live Demo

**Frontend:**
https://fixora-xxyt.onrender.com

**Backend:**
https://fixora-backend-zkp5.onrender.com

## ✨ Features

### 👤 Authentication & User Management

* User registration and login
* JWT-based authentication
* Access and refresh token authentication
* HTTP-only cookies
* Google OAuth login
* Complete profile functionality
* Cloudinary profile image upload

### 🛠️ Service Marketplace

* Browse available local services
* View individual service details
* Create and manage services
* Service categories such as electrician, tutor, plumber, etc.
* Service provider information
* Location-based service information

### 📍 Location Features

* Location search and geocoding using **LocationIQ**
* Interactive maps using **React Leaflet**
* Location-based service information

### 💳 Subscription & Payments

Service providers can create services after purchasing a subscription.

Available subscription plans:

* Monthly — ₹149
* Yearly — ₹1599

Payment processing is implemented using **Razorpay**.

### 📧 Email Communication

The application uses **Resend** for sending transactional emails.

### ⚡ Backend Features

* RESTful APIs using Express.js
* MongoDB database with Mongoose
* Authentication middleware
* Error handling
* Request logging using Winston
* Redis integration using Upstash
* Real-time communication infrastructure using Socket.IO

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Redux Toolkit
* React Router
* Axios
* GSAP
* React Leaflet
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Socket.IO
* Winston

### Authentication & Services

* Google OAuth
* Cloudinary
* Resend
* LocationIQ
* Razorpay
* Upstash Redis

### Deployment

* Render
* MongoDB Atlas
* Cloudinary

## 📁 Project Structure

```text
Fixora/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── .gitignore
├── README.md
└── package.json
```

> The exact folder structure may vary depending on the current version of the project.

## ⚙️ Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

RESEND_API_KEY=your_resend_api_key

LOCATIONIQ_API_KEY=your_locationiq_api_key

UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

CLIENT_URL=http://localhost:5173
```

**Never commit your `.env` file or API keys to GitHub.**

Make sure `.env` is included in your `.gitignore`:

```gitignore
.env
.env.*
!.env.example
```

## 🔑 LocationIQ Configuration

Fixora uses **LocationIQ** for location search and geocoding.

Add your LocationIQ API key to the backend environment variables:

```env
LOCATIONIQ_API_KEY=your_locationiq_api_key
```

The key is used by the backend for location-related API requests.

## 📧 Resend Configuration

Fixora currently uses **Resend** for sending emails.

Add your Resend API key:

```env
RESEND_API_KEY=your_resend_api_key
```

Resend replaces the previously used Nodemailer/Gmail SMTP implementation.

## 💳 Razorpay Subscription Flow

```text
User
  │
  ▼
Select Subscription
  │
  ▼
Razorpay Checkout
  │
  ▼
Payment Verification
  │
  ▼
Subscription Activated
  │
  ▼
Create Service
```

## 📍 Location Flow

```text
User enters location
        │
        ▼
React Frontend
        │
        ▼
Backend API
        │
        ▼
LocationIQ API
        │
        ▼
Location / Geocoding Data
        │
        ▼
Frontend Map
```

## 🔐 Authentication Flow

```text
User Login
    │
    ▼
Backend Authentication
    │
    ▼
JWT Access + Refresh Tokens
    │
    ▼
HTTP-only Cookies
    │
    ▼
Protected API Requests
```

## 🧩 Key Technologies

| Technology    | Purpose                    |
| ------------- | -------------------------- |
| React.js      | Frontend UI                |
| Vite          | Frontend development/build |
| Tailwind CSS  | Styling                    |
| Redux Toolkit | State management           |
| Node.js       | Backend runtime            |
| Express.js    | REST API                   |
| MongoDB       | Database                   |
| Mongoose      | MongoDB ODM                |
| JWT           | Authentication             |
| Socket.IO     | Real-time communication    |
| Razorpay      | Subscription payments      |
| Resend        | Transactional emails       |
| LocationIQ    | Location/geocoding         |
| React Leaflet | Interactive maps           |
| Cloudinary    | Image storage              |
| Upstash Redis | Redis-based services       |
| Winston       | Backend logging            |
| Google OAuth  | Social authentication      |

## 🎯 What I Learned

Building Fixora helped me gain practical experience with:

* Designing a full-stack MERN application
* Building REST APIs with Express.js
* MongoDB database design and Mongoose
* JWT authentication and protected routes
* Google OAuth integration
* HTTP-only cookies
* Redux Toolkit state management
* Payment integration with Razorpay
* Transactional email integration with Resend
* Location and geocoding APIs with LocationIQ
* Interactive maps with React Leaflet
* Cloudinary image uploads
* Redis with Upstash
* Real-time communication concepts with Socket.IO
* API testing and debugging
* Deploying frontend and backend applications

## 🚧 Future Improvements

* Advanced service-provider profiles
* Reviews and ratings
* Improved service search and filtering
* Service booking workflow
* Better provider/user communication
* Improved notification system
* More advanced location-based discovery
* Better mobile experience
* Production-level monitoring and optimization

## 👨‍💻 Author

**Anuj Negi**

BCA Graduate | Currently pursuing MCA
Full-Stack Developer | React.js | Node.js | Express.js | MongoDB

* GitHub: https://github.com/anujnegi09
* LinkedIn: https://linkedin.com/in/anuj-negi-65442b349/

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
