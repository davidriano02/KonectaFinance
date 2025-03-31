import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import useForm, { FormValues } from "../../hooks/useForm.ts";
import { loginSchema } from "../../utils/authValidation.ts";

interface AuthFormProps {
    onSubmit: (values: FormValues) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
    const initialValues = { email: "", password: "" };
    const { values, errors, handleChange, validate } = useForm(initialValues, loginSchema);

    const handleSubmit = () => {
        if (validate()) {
            onSubmit(values);
        }
    };

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 3, p: 3, width: "100%", maxWidth: 400 }}>
            <CardContent>
                <Typography variant="h5" fontWeight={600} textAlign="center">
                    Iniciar Sesión
                </Typography>

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    margin="normal"
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, py: 1.5, fontWeight: "bold", textTransform: "none" }}
                    onClick={handleSubmit}
                >
                    Entrar
                </Button>
            </CardContent>
        </Card>
    );
};

export default AuthForm;
