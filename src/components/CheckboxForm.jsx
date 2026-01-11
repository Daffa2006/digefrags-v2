const CheckboxForm = ({ label, name, checked, onChange, error }) => {
  return (
    <div className="mb-4 checkbox-wrapper">
      <label className="checkbox-label">{label}</label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default CheckboxForm;
