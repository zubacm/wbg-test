import { Wrapper } from "./style";

const HorizontalLine = ({color, ...rest}) => {
  return <Wrapper color={color} {...rest} />;
};

export default HorizontalLine;
