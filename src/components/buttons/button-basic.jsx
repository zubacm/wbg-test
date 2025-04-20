import Button from "./button";

const ButtonBasic = ({ size = "regular", children, ...rest }) => {
  return (
    <Button size={size} buttonType={"button-basic"} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonBasic;
