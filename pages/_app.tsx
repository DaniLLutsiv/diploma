import {AppProps} from 'next/app';
// import { SessionProvider } from 'next-auth/react';
// import Layout from '@/components/layout';
import "styles/globals.css";
import "styles/theme.css";
import config from 'next-i18next.config';
import {appWithTranslation} from 'next-i18next'
import {ThemeProvider, createTheme, StyledEngineProvider} from "@mui/material/styles";

const theme = createTheme({
    typography: {},
});

const MyApp = ({
                   Component,
                   pageProps: {session, ...pageProps}
               }: AppProps) => {
    return (
        // <SessionProvider session={session}>
        //     <Layout {...pageProps}>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </StyledEngineProvider>
        // </Layout>
        // </SessionProvider>
    );
}

export default appWithTranslation(MyApp, config)
