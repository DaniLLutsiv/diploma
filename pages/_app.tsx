import {AppProps} from 'next/app';
// import { SessionProvider } from 'next-auth/react';
// import Layout from '@/components/layout';
import "styles/globals.css";
import "styles/theme.css";
import config from 'next-i18next.config';
import {appWithTranslation} from 'next-i18next'
import {StyledEngineProvider, ThemeProvider} from "@mui/material/styles";
import {AppCacheProvider} from '@mui/material-nextjs/v15-pagesRouter';
import {theme} from "styles/theme";

const MyApp = ({
                   Component,
                   pageProps: {session, ...pageProps}
               }: AppProps) => {
    return (
        // <SessionProvider session={session}>
        //     <Layout {...pageProps}>
        <StyledEngineProvider injectFirst>
            <AppCacheProvider>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </AppCacheProvider>
        </StyledEngineProvider>
        // </Layout>
        // </SessionProvider>
    );
}

export default appWithTranslation(MyApp, config)
