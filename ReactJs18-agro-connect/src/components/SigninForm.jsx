import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SigninForm = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  useEffect(() => {
    const sessionData = window.sessionStorage.getItem("userSession");
    if (sessionData !== null && JSON.parse(sessionData).token) {
      navigate("/dashboard");
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const validate = () => {
    const newErrors = {};

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to login. Please try again.");
      }

      const data = await response.json();
      console.log(data);
      // Save user session data
      sessionStorage.setItem(
        "userSession",
        JSON.stringify({
          mobile: formData.mobile,
          token: data.login_token,
          first_name: data.user[0].first_name,
          last_name: data.user[0].last_name,
        })
      );
      console.log(sessionStorage.getItem("userSession"));
      setMessage(data.message || "Login successful!");

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center title">Sign-In Form</h1>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        {message && <p style={{ color: "red" }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mobile" className="form-label">
              Mobile:
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
            />
            {errors.mobile && <p className="error-message">{errors.mobile}</p>}
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            style={{ marginTop: "10px" }}
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
