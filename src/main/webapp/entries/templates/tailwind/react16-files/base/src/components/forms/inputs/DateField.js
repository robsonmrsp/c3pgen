import React from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DateField = ({ ...props }) => {
  const { className } = props;
  const [field, _, { setValue }] = useField(props);
  return (
    <DatePicker
      wrapperClassName={className}
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(objectDate) => {
        setValue(objectDate);
      }}
    />
  );
};
