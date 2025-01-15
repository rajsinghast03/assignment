import { useState } from "react";
import { submitUser } from "../api";

const User = () => {
  const [formData, setFormData] = useState({ name: "", handle: "" });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("handle", formData.handle);
    files.forEach((file) => data.append("images", file));

    try {
      const response = await submitUser(data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Submission failed");
    }
  };

  return (
    <div>
      <h2>User Submission</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Handle"
          value={formData.handle}
          onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
          required
        />
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default User;
