# Tabloid

Tabloid is a full-stack content management system that allows users to create accounts and publish articles on the web for public consumption. The platform provides robust user management, authentication, and content organization features.

This README is comprehensive of both Frontend and Backend features. The Backend repository can be found here [https://github.com/NSS-Day-Cohort-73/Tabloid-api-aqkylv](https://github.com/NSS-Day-Cohort-73/Tabloid-api-aqkylv).

## Tech Stack

### Frontend
- React
- Reactstrap for UI components
- Node.js and npm

### Backend
- C# (.NET Core)
- PostgreSQL
- Entity Framework Core

## Features

### User Authentication & Management
- Secure user registration system with profile creation
- User login/logout functionality with email authentication
- Comprehensive user profile management including:
  - First name
  - Last name
  - Display name
- Admin dashboard for user management and oversight
- View all user profiles with admin privileges

### Content Management
- Posts display with title, author, and category information
- Publication date tracking for all posts
- Categories displayed with filterable input


### Admin Features
- Category management interface
- User profile administration
- Full system oversight capabilities

## Getting Started

### Prerequisites
- .NET SDK
- Node.js and npm
- PostgreSQL
- Git

### Installation and Setup

1. Clone the repository
```bash
git clone [your-repo-url]
cd Tabloid
```

2. Configure User Secrets (Backend)
```bash
dotnet user-secrets init
dotnet user-secrets set AdminPassword password
dotnet user-secrets set TabloidDbConnectionString "Host=localhost;Port=5432;Username=postgres;Password=password;Database=Tabloid"
```

3. Setup Backend
```bash
dotnet restore
dotnet build
dotnet ef migrations add InitialCreate
dotnet ef database update
```

4. Setup Frontend
```bash
cd client
npm install
```

### Testing the Setup

1. Start the API (backend) in debug mode
2. In a separate terminal, start the frontend:
```bash
cd client
npm start
```
3. Navigate to the application in your browser
4. Login with:
   - Email: admina@strator.comx
   - Password: [your configured AdminPassword]

## Project Structure
```
Tabloid/
├── Controllers/
├── Models/
├── DTOs/
├── Properties/
├── Images/
├── client/
├── Program.cs
├── TabloidDbContext.cs
└── [other configuration files]
```

## Styling Guide

### Color Palette
- Red: `#db534b`
- Grey: `#6c767d`
- Black: `#343a40`
- Green: `#5bb8a6`

## Development Team
- Nicholas Homoelle (@herringvoices)
- MLee Law (@mleelaw)
- Christopher Johnson (@CJohnson7741)



## Notes

- Functionality is prioritized over styling
- The application includes a pre-configured admin user for initial setup
- UI/UX improvements should be considered secondary to core functionality
