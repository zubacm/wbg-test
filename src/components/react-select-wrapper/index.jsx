import AsyncSelect from "react-select/async";
import { customStyles } from "./custom-style";

const ReactSelectWrapper = ({ ...rest }) => {
  return (
    <AsyncSelect
      styles={customStyles}
      {...rest}
      // menuIsOpen={true}
      // defaultMenuIsOpen={true}
      menuPortalTarget={document.body}
      menuPlacement={"auto"}
    />
  );
};

export default ReactSelectWrapper;
