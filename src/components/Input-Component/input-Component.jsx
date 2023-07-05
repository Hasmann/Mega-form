import "./input.component.styles.css";

const Input = ({
  spanValue,
  inputType,
  inputName,
  inputPlaceHolder,
  Ref,
  ...props
}) => {
  return (
    <div className="input-Container">
      <span className="span-text">{spanValue}:</span>
      <br />
      <input
        className="input-bar"
        type={inputType}
        name={inputName}
        ref={Ref}
        placeholder={inputPlaceHolder}
        {...props}
      />
    </div>
  );
};

export default Input;
