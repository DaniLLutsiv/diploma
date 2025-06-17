import type {GetServerSideProps} from "next";
import Head from "next/head";
import {Header} from "components/header";
import {useTranslation} from "next-i18next";
import * as React from "react";
import {FormEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";

export const getServerSideProps: GetServerSideProps = async ({locale = ""}) => {
    const i18nConfig = await serverSideTranslations(locale, "common");

    try {
        return {
            props: {
                ...i18nConfig,
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: {
                ...i18nConfig,
            },
        };
    }
};

interface IForm {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

export default function Login() {
    const {t} = useTranslation();
    const router = useRouter();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (event: FormEvent<HTMLFormElement & IForm>) => {
        event.preventDefault();
        setIsLoading(true)

        try {
            const email = event.currentTarget.email.value;
            const password = event.currentTarget.password.value;

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.status === 200) {
                void router.push(`/admin/`)
            } else {
                setError(data.error);
            }
        } catch (e: any) {
            console.error(e.message);
        } finally {
            setIsLoading(false);
        }

        return false
    }

    return (
        <div>
            <Head>
                <title>{t("login.title")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <div className="bg-[#6ba3e8]">
                    <Header/>
                </div>

                <form
                    className="max-w-[400px] mx-auto w-full mt-8 md:mt-15"
                    noValidate onSubmit={submitHandler} onChange={() => setError("")}>
                    <div className="flex flex-col items-center w-full gap-5 mb-5">
                        <div className="text-xl font-bold">{t("login.form.title")}</div>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={t("login.form.email")}
                            name="email"
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={t("login.form.password")}
                            name="password"
                            type="password"
                        />

                        {
                            error && (
                                <div className="self-start text-[#d32f2f] font-[500]">{error}</div>
                            )
                        }

                        <Button
                            disabled={Boolean(error || isLoading)}
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            {t("login.form.submit")}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
