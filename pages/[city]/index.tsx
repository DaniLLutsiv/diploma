import Head from "next/head";
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import type {InferGetServerSidePropsType, GetServerSideProps} from "next";
import client from "lib/mongodb";
import {Header} from "components/header";
import {ImageSlider} from "components/image_slider";
import {Swiper, SwiperSlide} from "swiper/react";
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";

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
    const images = ["/images/bg.jpg", "/images/bg2.png"];

    return (
        <div>
            <Head>
                <title>{t("home.title")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
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
                    {images.map((src) => {
                        return (
                            <SwiperSlide key={src}>
                                <img src={src} alt=""/>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

            </main>
        </div>
    );
}
