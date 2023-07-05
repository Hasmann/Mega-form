import "./button.styles.css";

const CustomButton = ({ children, otherButton, ...props }) => {
  return (
    <div className="button-container">
      <button
        {...props}
        className={`${otherButton ? "otherTypes" : "custom-button-default"}`}
      >
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
