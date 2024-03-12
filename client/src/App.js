import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/Main";
import AuthLayout from "./layouts/Auth";

// Views
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Register from './views/Register'
import PasswordRecovery from "./views/PasswordRecovery";
import PasswordChange from "./views/PasswordChange";
import HomePage from "./views/HomePage";
import Achievements from "./views/Achievements";
import GroupPage from "./views/Group";
import CreateGroup from "./views/CreateGroup";
import PageNotFound from "./views/PageNotFound";
import Groups from "./views/Groups";
import GroupInvitation from "./views/GroupInvitation";

export default function App() {
  return (
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/group/:id" element={<GroupPage />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/groups" element={<Groups />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path={'/resetPassword/:token'} element={<PasswordChange/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/groups/:token" element={<GroupInvitation />} />
        </Route>

        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
  );
}