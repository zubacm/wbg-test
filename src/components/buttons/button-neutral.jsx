import Button from "./button";

const ButtonNeutral = ({ size = "regular", children, ...rest }) => {
  return (
    <Button size={size} buttonType={"button-neutral"} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonNeutral;
