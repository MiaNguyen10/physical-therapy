import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";

export const StyleInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    borderRadius: 3,
    position: "relative",
    fontSize: 16,
    width: 500,
    padding: 0,
    height: 50,
    paddingLeft: 20,
  },
  "& .MuiSelect-select": {
    height: 33,
    width: 268,
    paddingTop: "11px",
  },
}));

const LabelledInput = ({
  errors,
  name,
  title,
  register,
  rules,
  required,
  children,
  ...rest
}) => {
  const error = errors && errors[name];
  const errorMessage = error?.message?.toString() ?? "";

  return (
    <Box>
      <StyleInput
        margin='normal'
        required
        fullWidth
        id={`labelled-input-${name}`}
        label={title}
        name={name}
        autoComplete={name}
        autoFocus
        error={!!error}
        helperText={error && errorMessage}
        {...(register && register(name, rules))}
        {...rest}
      >
        {children}
      </StyleInput>
    </Box>
  );
};

export default LabelledInput;
