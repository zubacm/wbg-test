import { Wrapper } from "./style";

const CounterCirlce = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default CounterCirlce;
