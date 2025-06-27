// src/App.jsx
import { RouterProvider } from "react-router-dom";
import router from "@/navigation/routes";
import "@/index.css";

export default function App() {
  return <RouterProvider router={router} />;
}
