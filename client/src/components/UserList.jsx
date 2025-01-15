import { useEffect, useState } from "react";
import { getUsers } from "../api";

// eslint-disable-next-line react/prop-types
const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(token);
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch users");
      }
    };
    fetchUsers();
  }, [token, users]);

  return (
    <div>
      <h2>User details with images</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id} style={{ marginBottom: "20px" }}>
            <h3>
              {user.name} ({user.handle})
            </h3>
            {user.images && user.images.length > 0 && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {user.images.map((image, index) => (
                  <img
                    key={index}
                    src={`https://assignment-7z1t.onrender.com/${image}`}
                    alt={`${user.name} image ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
