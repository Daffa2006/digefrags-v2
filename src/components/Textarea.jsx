export default function Textarea(props) {
  const { value, onChange, label, name, placeholder, error } = props;
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <textarea
        className={error && "input-error"}
        onChange={onChange}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
      ></textarea>
      <span className="error-message">{error}</span>
    </div>
  );
}
