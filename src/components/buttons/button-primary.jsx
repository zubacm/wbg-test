import Button from "./button";

const ButtonPrimary = ({
  size = "regular",
  children,
  ...rest
}) => {
  return (
    <Button size={size} buttonType={"button-primary"} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonPrimary;
