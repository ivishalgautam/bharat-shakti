import { useEffect, useState } from "react";
import ReactSelect from "react-select";

const MySelect = ({ placeholder, options, isMulti = false, ...props }) => {
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <ReactSelect
      id={id}
      options={options}
      placeholder={placeholder}
      isMulti={isMulti}
      {...props}
      //   className="project-edition-select-container"
      //   classNamePrefix="project-edition-select"
    />
  ) : null;
};

export default MySelect;
