import { useState } from "react";
import AdminLogin from "./../components/AdminLogin";
import AdminRegister from "./../components/AdminRegister";
// eslint-disable-next-line react/prop-types
const AdminPage = ({ setToken }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Register</button>
      </div>
      {showLogin ? <AdminLogin setToken={setToken} /> : <AdminRegister />}
    </div>
  );
};

export default AdminPage;
