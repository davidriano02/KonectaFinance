import { Box, Grid } from "@mui/material";
import AuthCard from "../components/auth/AuthCard.tsx";


const Login = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                px: 2,
                bgcolor: "background.default",
            }}
        >
            <Grid container justifyContent="center">
                <Grid  size={{ xs: 12, sm: 6, md:12 }}>
                    <Box
                        sx={{
                            p: 3,
                            boxShadow: 3,
                            borderRadius: 2,
                            bgcolor: "background.paper",
                        }}
                    >
                        <AuthCard />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;