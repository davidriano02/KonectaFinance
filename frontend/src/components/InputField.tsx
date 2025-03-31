import { TextField } from "@mui/material";

interface InputFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type = "text", value, onChange }: InputFieldProps) => {
    return (
        <TextField
            fullWidth
            label={label}
            type={type}
            margin="normal"
            variant="outlined"
            value={value}
            onChange={onChange}
        />
    );
};

export default InputField;
