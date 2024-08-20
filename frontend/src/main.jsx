import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/Login";
import SignUpForm from "./components/SignUp";
import Header from "./components/Header";
import JobBoard from "./components/JobBoard";
import HeroSection from "./components/HeroSection";
import JobDetails from "./components/JobDetails";
import SessionComponent from "./components/SessionComponent";
import MyAccount from "./components/MyAccount";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <SignUpForm />
      </>
    ),
  },
  {
    path: "/feed",
    element: (
      <>
        <Header />
        <HeroSection />
        <JobBoard />
      </>
    ),
  },
  {
    path: "/jobs/:jobId",
    element: (
      <>
        <Header />
        <JobDetails />
      </>
    ),
  },
  {
    path: "/session",
    element: (
      <>
        <SessionComponent />
      </>
    ),
  },
  {
    path: "/myAccount",
    element: (
      <>
        <MyAccount />
      </>
    ),
  },
]);

// Render the application and set up routing
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
