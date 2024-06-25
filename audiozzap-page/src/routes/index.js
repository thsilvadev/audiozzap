import { Routes, Route } from "react-router-dom";
//Pages that require authentication

import UserRegistration from "../pages/UserRegistration";
import UserCheck from "../pages/UserCheck";
import Home from "../pages/Home";
import AudioPage from "../pages/AudioPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<AudioPage />} />
      <Route path="/userCheck/:userHash" element={<UserCheck />} />
      <Route
        path="/userRegistration/:encodedURIHash"
        element={<UserRegistration />}
      />
    </Routes>
  );
}

export default AppRoutes;
