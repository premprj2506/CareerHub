import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/Login";
import SignUpForm from "./components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import JobBoard from "./components/JobBoard";
import jobListings from "../../backend/models/init/JobData.js";

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
        <JobBoard jobs={jobListings} />
      </>
    ),
  },
]);

// const [jobs, setJobs] = useState([]);
// const handleEdit = (job) => {
//   setEditingJob(job);
// };
// const handleDelete = (id) => {
//   setJobs(jobs.filter((job) => job.id !== id));
// };
// const handleView = (id) => {
//   // Navigate to the details page
// };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
