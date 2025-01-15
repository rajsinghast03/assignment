import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserList from "./components/UserList";
import User from "./components/User";
import AdminPage from "./pages/AdminPage";
import "./App.css";

const App = () => {
  const [token, setToken] = useState("");

  return (
    <Router>
      <div className="main">
        <nav className="nav">
          <Link to="/">Home</Link> | <Link to="/admin">Admin</Link>{" "}
          {/* Add Admin button */}
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <User />
                <UserList token={token} />
              </div>
            }
          />
          <Route path="/admin" element={<AdminPage setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
