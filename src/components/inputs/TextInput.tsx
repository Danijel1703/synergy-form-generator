import { observer } from "mobx-react";
import React from "react";
import { TFieldComponentProps } from "~/types";

function TextInput(props: TFieldComponentProps) {
  const { error, placeholder, label, value, onChange, className } = props;
  return (
    <React.Fragment>
      <span>{label}</span>
      <span>{error}</span>
      <input
        className={className}
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </React.Fragment>
  );
}

export default observer(TextInput);
