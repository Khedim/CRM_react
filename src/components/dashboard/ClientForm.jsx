import React from "react";

export const ClientForm = (props) => {
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
        <label htmlFor="contact_person" className="form-label">
          Contact person
        </label>
        <input
          type="text"
          name="contact_person"
          className="form-control"
          id="contact_person"
          placeholder="Write your contact"
          value={formData.contact_person}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          placeholder="Write your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="phone"
          name="phone"
          className="form-control"
          id="phone"
          placeholder="Write your phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="website" className="form-label">
          Website
        </label>
        <input
          type="text"
          name="website"
          className="form-control"
          id="website"
          placeholder="Write your website"
          value={formData.website || ""}
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
