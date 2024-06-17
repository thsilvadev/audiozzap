import { Routes, Route } from "react-router-dom";
//Pages that require authentication
import { RequireAuth } from "react-auth-kit";

import UserRegistration from "../pages/UserRegistration";
import UserCheck from "../pages/UserCheck"

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/userCheck/:userHash"
        element={<UserCheck />}
      />
      <Route
        path="/userRegistration/:userHash"
        element={<UserRegistration />}
      />
    </Routes>
  );
}

export default AppRoutes;
