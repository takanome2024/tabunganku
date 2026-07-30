import { useState } from "react";
import { login } from "@/services/auth.service";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = await login(form);

    localStorage.setItem(
      "token",
      result.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(result.data.user)
    );

    console.log(result);

    window.location.href = "/";

  } catch (err) {
    console.error(err.response?.data);
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white shadow rounded p-6"
      >
        <h1 className="text-2xl font-bold mb-5">
          Login
        </h1>

        <div className="mb-4">
          <label>Username</label>

          <input
            className="input input-bordered w-full"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label>Password</label>

          <input
            className="input input-bordered w-full"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-primary w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}