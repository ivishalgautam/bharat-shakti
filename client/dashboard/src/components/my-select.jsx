import { useEffect, useState } from "react";
import ReactSelect from "react-select";

const MySelect = ({
  placeholder,
  options,
  isMulti = false,
  defaultValue,
  ...props
}) => {
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  const customStyles = {
    option: (provided) => ({
      ...provided,
      textTransform: "capitalize",
    }),
    singleValue: (provided) => ({
      ...provided,
      textTransform: "capitalize",
    }),
  };
  useEffect(() => setIsMounted(true), []);
  return isMounted ? (
    <ReactSelect
      id={id}
      options={options}
      placeholder={placeholder}
      isMulti={isMulti}
      {...props}
      styles={customStyles}
    />
  ) : null;
};

export default MySelect;
