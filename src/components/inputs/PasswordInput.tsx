import React from "react";
import { TFieldComponentProps } from "~/types";

function PasswordInput(props: TFieldComponentProps) {
  const { onChange, placeholder, label, className, value, error } = props;
  return (
    <React.Fragment>
      <span>{label}</span>
      <span>{error}</span>
      <input
        value={value}
        className={className}
        type="password"
        onChange={onChange}
        placeholder={placeholder}
      />
    </React.Fragment>
  );
}

export default PasswordInput;
