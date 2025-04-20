import Button from "./button";

const ButtonSecondary = ({ size = "regular", children, ...rest }) => {
  return (
    <Button size={size} buttonType={"button-secondary"} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonSecondary;
