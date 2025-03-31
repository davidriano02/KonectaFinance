import { useAppDispatch } from "../../store/store";
import { fetchCaptcha, validateCaptcha, setCaptchaData, clearCaptchaData } from "../../store/slices/captchaSlice";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/authValidation.ts";
import { Box, Button, Card, CardContent, Snackbar, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';;


const AuthCard = () => {
    const dispatch = useAppDispatch();
    const { captchaId, captchaImage, captchaText, error } = useSelector((state: RootState) => state.captcha);
    const { handleLogin, loading } = useAuth();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    useEffect(() => {
        dispatch(fetchCaptcha());
        return () => {
            dispatch(clearCaptchaData());
        };
    }, [dispatch]);

    const onSubmit = async (data: { email: string, password: string }) => {
        if (!captchaId || !captchaText) {
            setSnackbarMessage("Por favor, complete el CAPTCHA.");
            setOpenSnackbar(true);
            return;
        }

        try {
            const response = await dispatch(validateCaptcha({ captchaId, captchaText }));

            if (validateCaptcha.fulfilled.match(response) && response.payload.success) {
                await handleLogin(data.email, data.password);
            } else {
                setSnackbarMessage("Captcha incorrecto");
                setOpenSnackbar(true);
                dispatch(fetchCaptcha());
            }
        } catch {
            setSnackbarMessage("Error al validar el captcha.");
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            <Card sx={{ p: 3, textAlign: "center", borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                    {/* Imagen en la parte superior */}
                   < Box display="flex" justifyContent="center" mb={2}>
                    <EmojiPeopleIcon fontSize="large" />
                    </Box>

                    <Typography variant="h5" gutterBottom>
                        Iniciar Sesión
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <Box sx={{ mt: 2 }}>
                            {captchaImage ? (
                                <div dangerouslySetInnerHTML={{ __html: captchaImage }} />
                            ) : (
                                <CircularProgress size={24} />
                            )}
                            <TextField
                                fullWidth
                                label="Ingrese el texto del captcha"
                                margin="normal"
                                variant="outlined"
                                value={captchaText || ""}
                                onChange={(e) => dispatch(setCaptchaData({ captchaId: captchaId || "", captchaText: e.target.value }))}
                            />
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={error || snackbarMessage}
            />
        </>
    );
};

export default AuthCard;
