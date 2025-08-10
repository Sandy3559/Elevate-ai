# ElevateAI

**ElevateAI** is a web application that provides users with AI-powered tools to help them in their career development.  
It helps users create resumes and cover letters, and also prepare for job interviews.

---

## ✨ Features
- ****AI-powered resume and cover letter builder****  
  &nbsp;&nbsp;&nbsp;&nbsp;Create professional, ATS-friendly resumes and cover letters tailored to your industry and skills.
- ****Mock interviews****  
  &nbsp;&nbsp;&nbsp;&nbsp;Practice with AI-generated questions specific to your target role and get feedback on your performance.
- ****Industry insights****  
&nbsp;&nbsp;&nbsp;&nbsp;Stay up-to-date with the latest trends, salary ranges, and in-demand skills in your field.
- ****Personalized career guidance****  
&nbsp;&nbsp;&nbsp;&nbsp;Get tailored recommendations to help you advance your career.

---

## 🛠 Technologies Used

- ****Frontend:**** Next.js, React, Tailwind CSS, Shadcn/UI
- ****Backend:**** Next.js API Routes, Prisma
- ****Database:**** PostgreSQL
- ****Authentication:**** Firebase Authentication
- ****AI:**** Google Generative AI
- ****Deployment:**** Vercel

---

## 📂 Project Structure

```
/app        → Main application code, including pages and API routes
/components → Reusable React components
/lib        → Utility functions, database client, authentication services
/prisma     → Prisma schema and migration files
/public     → Static assets (images, fonts)
```


## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

---

## 📋 Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL**
- **Firebase project**
- **Google AI API key**

---

## 📦 Installation

### 1️⃣ Clone the repository
```
git clone https://github.com/sandy3559/elevate-ai.git
cd elevate-ai
```
### 2️⃣ Install dependencies
```
npm install
```
### 3️⃣ Set up the database
- Make sure you have PostgreSQL installed and running.
- Create a .env file in the root of the project and add your database URL:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```
- Run the migrations to create the necessary tables:
```
npx prisma migrate dev
```
### 4️⃣ Set up Firebase
- Create a Firebase project at Firebase Console.
- In your project settings, add a new web app and copy the configuration object.
- In the .env file, add the following variables with your Firebase project credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
```
- Generate a private key for the Firebase Admin SDK:
  - Go to Service accounts in your Firebase project settings.
  - Click Generate new private key (this will download a JSON file).
  - Rename the downloaded file to firebase-service-account.json and place it in the root of your project.
### 5️⃣ Set up Google AI
- Get your Google AI API key from Google AI Studio.
- Add the API key to your .env file:
```
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```
### 6️⃣ Run the development server
```
npm run dev
```

---

## 🚀 Deployment

The easiest way to deploy this application is using the Vercel Platform.  
For more details, see the Next.js deployment documentation.

