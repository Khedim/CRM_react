import React from "react";

export const MemberForm = (props) => {
  const { formData, formErrors, setFormData, handleSubmit, btnText } = props;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      className="row"
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <div className="mb-3">
        <label htmlFor="first_name" className="form-label">
          First name
        </label>
        <input
          type="text"
          name="first_name"
          className="form-control"
          id="first_name"
          placeholder="Write your first name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="last_name" className="form-label">
          Last name
        </label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          id="last_name"
          placeholder="Write your last name"
          value={formData.last_name}
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
