import React, { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile Number must be exactly 10 digits";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
    setIsSubmitted(false);

    console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users-store/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText, "Failed to signup. Please try again.");
      }
      console.log(response);

      const data = await response.json();
      setMessage(data.message || "Signup successful!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="container">
      <h1 class="text-center title">Signup Form</h1>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        {message && (
          <p style={{ color: isSubmitted ? "green" : "red" }}>{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="username" class="form-label">Username:</label>
            <input type="text" id="username" name="username"
              value={formData.username}
              onChange={handleChange}
              class="form-control"
            />
            {errors.username && <p class="error-text">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="email" class="form-label">Email:</label>
            <input type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              class="form-control"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" class="form-label">Password:</label>
            <input type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              class="form-control"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="mobile" class="form-label">mobile:</label>
            <input type="text" id="mobile" name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              class="form-control"
            />
            {errors.mobile && <p style={{ color: "red" }}>{errors.mobile}</p>}
          </div>
          <button type="submit" style={{ marginTop: "10px" }} disabled={isLoading} class="btn btn-primary">
            {isLoading ? "Submitting..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
