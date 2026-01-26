const InputForm = (props) => {
  const {
    value,
    onChange,
    label,
    type = "text",
    name,
    placeholder,
    error,
    required = false,
  } = props;
  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      <Input
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        error={error}
        value={value}
        required={required}
      />
    </div>
  );
};

const Label = (props) => {
  const { htmlFor, children } = props;
  return <label htmlFor={htmlFor}>{children}</label>;
};

const Input = (props) => {
  const { value, onChange, type, placeholder, name, error, required } = props;
  return (
    <>
      <input
        className={error && "input-error"}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
      />
      <span className="error-message">{error}</span>
    </>
  );
};

export default InputForm;
