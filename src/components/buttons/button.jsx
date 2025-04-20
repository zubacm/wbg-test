const Button = ({ className = "", buttonType="button-basic", size = "regular", children, center = false, ...rest }) => {
  return (
    <button
      className={`button ${buttonType} ${className} ${
        size === "regular" ? "regular-btn-padding" : "small-btn-padding"
      } ${center === true ? "center-content-btn" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
