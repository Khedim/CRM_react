import React from "react";

export const SignUpForm = (props) => {
  const { formData, setFormData, formErrors, handleSubmit, btnText } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  return (
    <form className="pb-2" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="username"
          className="form-control"
          id="username"
          placeholder="Enter your email"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Repeat Password
        </label>
        <input
          type="password"
          name="password2"
          className="form-control"
          id="password2"
          placeholder="Repeat password"
          value={formData.password2}
          onChange={handleChange}
        />
      </div>
      {formErrors.length > 0 && (
        <div className="bg-danger bg-opacity-25 p-1 text-danger border border-danger rounded mb-3">
          {formErrors.map((err) => (
            <p className="p-0 m-0" key={err}>
              {err}
            </p>
          ))}
        </div>
      )}
      <button type="submit" className="btn btn-success">
        {btnText}
      </button>
    </form>
  );
};
