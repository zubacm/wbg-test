import { Wrapper } from "./style";

const VerticalLine = ({color, height, ...rest}) => {
  return <Wrapper color={color} height={height} {...rest} />;
};

export default VerticalLine;
