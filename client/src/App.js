import { Routes, Route } from "react-router-dom";

// Layouts
import AuthLayout from "./layouts/Auth";

// Views
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import PasswordRecovery from "./views/PasswordRecovery";
import PasswordChange from "./views/PasswordChange";
import HomePage from "./views/HomePage";
import CreateGroup from "./views/CreateGroup";


export default function App() {
  return (
      <Routes>

        <Route path="/">
          <Route index element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path={'/resetPassword/:token'} element={<PasswordChange/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-group" element={<CreateGroup />} />
        </Route>

        <Route path="/HomePage" element={<HomePage />} />
        
      </Routes>
  );
}