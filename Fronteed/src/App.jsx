import React from 'react'
import Navbar from './components/shared/Navbar.jsx'
import { createBrowserRouter,RouterProvider  } from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import SignUp from './components/auth/SignUp.jsx'
import Home from './components/Home.jsx'
import Jobs from './components/Jobs.jsx'
import Browse from './components/Browse.jsx'
import Profile from './components/Profile.jsx'
import JobDescription from './components/JobDescription.jsx'
import Companies from './components/admin/companies.jsx'
import CompanyCreate from './components/admin/CompanyCreate.jsx'
import CompanySetup from './components/admin/CompanySetup.jsx'
import AdminJobs from './components/admin/AdminJobs.jsx'
import PostJob from './components/admin/PostJob.jsx'
import Applicants from './components/admin/Applicants.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'
const appRouter=createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/jobs',
    element: <Jobs/>,
  },
  {
    path: '/browse',
    element: <Browse/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/description/:id',
    element: <JobDescription/>,
  },
  {
    path: '/profile',
    element: <Profile/>,
  },
  {
    path: '/signup',
    element: <SignUp/>,
  },
  //admin side ke liye path
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies/></ProtectedRoute> ,
  },
  {
    path: '/admin/companies/create',
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>  ,
  },
  {
    path: '/admin/companies/create/:id',
    element: <ProtectedRoute><CompanySetup/></ProtectedRoute> ,
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs/></ProtectedRoute> ,
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute> <PostJob/></ProtectedRoute>,
  },
  {
    path: '/admin/jobs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>  ,
  },
])
const App = () => {
  return (
    <>
    <RouterProvider router={appRouter}/>
     
    </>
  )
}

export default App
