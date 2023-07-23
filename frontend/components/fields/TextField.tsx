import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  TextField,
  TextFieldVariants,
} from "@mui/material";

export const TextFieldBorderless = (props: TextFieldBorderlessProps) => {
  const {
    sx,
    placeholder = "start typing...",
    value,
    onChange,
    type = "string",
  } = props;
  return (
    <TextField
      fullWidth
      variant="standard"
      size="small"
      type={type}
      InputProps={{ style: { padding: 0 }, disableUnderline: true }}
      sx={{ input: { padding: 0 }, fontSize: "10px", p: 0, ...sx }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

interface TextFieldBorderlessProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  sx?: any;
  placeholder?: string;
}

const TextFieldComp = (props: TextFieldProps) => {
  const {
    variant,
    sx = {},
    type = "text",
    value,
    onChange,
    label,
    required = false,
    InputProps = {},
    placeholder = "",
  } = props;
  return (
    <TextField
      variant={variant}
      sx={{ m: 1.5, ...sx }}
      type={type}
      label={label}
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
      required={required}
      fullWidth
      InputProps={InputProps}
      placeholder={placeholder}
    />
  );
};

interface TextFieldProps {
  variant?: TextFieldVariants; // "contained" | "outlined" | "filled";
  sx?: any;
  value: string | null;
  onChange: (p: string) => void;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  InputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>;
}

export default TextFieldComp;
