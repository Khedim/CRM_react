export const LeadForm = (props) => {
  const {
    formData,
    formErrors,
    setFormData,
    handleSubmit,
    btnText,
    team,
    isAssigned_to,
  } = props;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      className="pb-2 row"
      onSubmit={handleSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            name="company"
            className="form-control"
            id="company"
            placeholder="Write your company"
            value={formData.company}
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
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label htmlFor="confidence" className="form-label">
            Confidence
          </label>
          <input
            type="number"
            name="confidence"
            className="form-control"
            id="confidence"
            placeholder="Write your confidence"
            value={formData.confidence || 0}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estimated_value" className="form-label">
            Estimated Value
          </label>
          <input
            type="number"
            name="estimated_value"
            className="form-control"
            id="estimated_value"
            placeholder="Write your estimated value"
            value={formData.estimated_value || 0}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            name="status"
            className="form-select"
            id="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="inprogress">In progres</option>
            <option value="lost">Lost</option>
            <option value="won">Won</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            name="priority"
            className="form-select"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {isAssigned_to && (
          <div className="mb-3">
            <label htmlFor="assigned_to" className="form-label">
              Assigned to
            </label>
            <select
              name="assigned_to"
              className="form-select"
              id="assigned_to"
              value={formData.assigned_to || ""}
              onChange={handleChange}
            >
              {team.members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.username}
                </option>
              ))}
            </select>
          </div>
        )}
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
