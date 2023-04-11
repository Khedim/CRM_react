import React from "react";

export const NoteForm = (props) => {
  const { formData, formErrors, setFormData, handleSubmit, btnText } = props;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      className="pb-2 row col-md-8 ms-auto me-auto"
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Write your name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Body
        </label>
        <textarea
          name="body"
          className="form-control"
          id="body"
          placeholder="Write your body"
          value={formData.body}
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
