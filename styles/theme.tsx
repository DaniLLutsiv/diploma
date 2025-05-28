import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    typography: {},
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    fontSize: "16px",
                    fontFamily: "var(--fontFamilySecond)",
                    textTransform: "none",
                    height: 44,
                    lineHeight: "150%",
                    borderRadius: "4px",
                    cursor: "pointer",
                    boxShadow: "none",
                    ":disabled": {
                        opacity: 0.3,
                    },
                },
                contained: {
                    color: "#3F3F44",
                    background: "#FFD422",
                    ":disabled": {
                        color: "#AAA",
                        background: "#E5E5E5",
                        opacity: 1,
                    },
                    "&:hover": {
                        boxShadow: "none",
                        background: "#ffcd25",
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    "&.Mui-checked": {
                        color: "#6ba3e8"
                    }
                }
            }
        }
    }
});