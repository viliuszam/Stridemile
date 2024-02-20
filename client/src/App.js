import { Routes, Route } from "react-router-dom";

// Layouts
import AuthLayout from "./layouts/Auth";

// Views
import Home from './views/Home'
import Register from './views/Register'

export default function App() {
  return (
      <Routes>

        <Route path="/">
          <Route index element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
        </Route>

      </Routes>
  );
}