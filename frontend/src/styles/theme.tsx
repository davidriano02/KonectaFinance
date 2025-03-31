import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#ff9800",
        },
        background: {
            default: "#f4f6f8",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
        button: {
            textTransform: "none",
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                },
            },
        },
    },
});

export default theme;
