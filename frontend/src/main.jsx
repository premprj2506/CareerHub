import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/Login";
import SignUpForm from "./components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import JobBoard from "./components/JobBoard";
import HeroSection from "./components/HeroSection";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
