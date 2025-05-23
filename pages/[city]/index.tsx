import Head from "next/head";
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import type {InferGetServerSidePropsType, GetServerSideProps} from "next";
import client from "lib/mongodb";
import {Header} from "components/header";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";
import styled from "@emotion/styled";
import {Landing} from "components/landing";
import {Button} from "@mui/material";

const Wrapper = styled.main`
    background: #F9F9F9;

    .swiper {
        &:after {
            z-index: 1;
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: 1;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, #00000000 20%);
            pointer-events: none;
        }
    }
`;

const Img = styled.img`
    min-width: 100%;
    min-height: max(400px, 70vh);
    max-height: 100vh;
    object-fit: cover;
`;

const Title = styled.h1`
    font-size: min(130px, 10vw);
    font-family: "Marmelad", sans-serif;
    color: #ffffff;
    z-index: 1;
    text-shadow: -1px 0 rgba(0, 0, 0, 0.5), 0 1px rgba(0, 0, 0, 0.5), 1px 0 rgba(0, 0, 0, 0.5), 0 -1px rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

type ConnectionStatus = {
    isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async ({locale = ""}) => {
    const i18nConfig = await serverSideTranslations(locale, "common");

    try {
        await client.connect();
        // `await client.connect()` will use the default database passed in the MONGODB_URI
        // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
        //
        // `const client = await clientPromise`
        // `const db = client.db("myDatabase")`
        //
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands

        return {
            props: {
                isConnected: true,
                ...i18nConfig,
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: {
                isConnected: false,
                ...i18nConfig,
            },
        };
    }
};

export default function Home({
                                 isConnected,
                             }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {t} = useTranslation();
    const images = ["/images/zaporizhzhia/bg.jpg", "/images/zaporizhzhia/bg-2.png"];

    return (
        <div>
            <Head>
                <title>{t("home.title")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Wrapper>
                <Swiper
                    speed={1000}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={0}
                    centeredSlides
                    centeredSlidesBounds
                    effect={'fade'}
                    modules={[Autoplay, EffectFade]}
                >
                    <div className="absolute z-20 top-0 left-0 right-0">
                        <Header/>
                    </div>

                    <Content>
                        <Title>{t("home.landing.title")}</Title>
                        <Button variant="contained">{t("home.landing.cta")}</Button>
                    </Content>
                    {images.map((src) => (
                        <SwiperSlide key={src}>
                            <Img src={src} alt=""/>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Landing/>
            </Wrapper>
        </div>
    );
}
