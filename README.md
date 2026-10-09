Live site :https://startup-forge-client-o4cbvqk37-nosratee.vercel.app
 
# StartupForge Client (Frontend)

StartupForge is a platform where startup founders can publish startup ideas, build teams, and recruit collaborators. Developers, designers, marketers, and other professionals can explore startup opportunities and apply to join teams. The system creates a bridge between startup founders and talented collaborators.

## Tech Stack

* **Frontend Framework:** React with Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Animations:** Framer Motion
* **HTTP Client:** Axios
* **Notifications:** React Hot Toast

## Key Features

* **Role-Based Dashboards**: Dedicated and secure workflows for Founders, Collaborators, and Admins.
* **Stripe Payment Integration**: Secure checkout flow for founders to unlock unlimited opportunity posts upon reaching the limit.
* **Dark-Mode Glassmorphism UI**: Modern dark theme and professional glassmorphism design built with Tailwind CSS.
* **Advanced Search & Filter**: Ability to search and filter opportunities by role title, required skills, work type, and industry using MongoDB `$regex` and `$in` operators.
* **Server-Side Pagination**: Server-side pagination implemented on the opportunities browsing page for smooth performance.
* **Secure Authentication**: JWT-based HTTPOnly cookie authentication and credential security using environment variables.

## Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000

```

## Installation & Running

```bash
npm install
npm run dev

```