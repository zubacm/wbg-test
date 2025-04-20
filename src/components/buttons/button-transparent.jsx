import Button from "./button";

const ButtonTransparent = ({ size = "regular", children, ...rest }) => {
  return (
    <Button size={size} buttonType={"button-transparent"} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonTransparent;
