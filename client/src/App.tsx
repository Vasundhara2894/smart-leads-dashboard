import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Dashboard />}
      />
      <Route
  path="/register"
  element={<Register />}
/>

      <Route
        path="/login"
        element={<Login />}
      />

    </Routes>
  );
}

export default App;