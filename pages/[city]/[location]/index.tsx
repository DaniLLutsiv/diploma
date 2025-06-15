import Head from "next/head";
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import type {GetServerSideProps, InferGetServerSidePropsType} from "next";
import client from "lib/mongodb";
import {Header} from "components/header";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";
import styled from "@emotion/styled";
import {fixJson, formatLocation} from "lib";
import {ObjectId} from "mongodb";
import {ILocation} from "types";
import {LocationMap} from "components/location_map/map";
import {Footer} from "components/footer";
import {Button, Tooltip} from "@mui/material";
import {useEffect, useState} from "react";

type ConnectionStatus = {
    isConnected: boolean;
    location: ILocation;
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async ({locale = "", params}) => {
    const i18nConfig = await serverSideTranslations(locale, "common");
    const locationId = params?.location as string

    await client.connect();
    const db = await client.db("diploma")
    const locationCollection = db.collection('location')
    // const locationRecord = await locationCollection.findOne({_id: new ObjectId(locationId)})
    const locationRecords = await locationCollection.aggregate([
        {
            $match: { _id: new ObjectId(locationId) }
        },
        {
            $lookup: {
                from: 'category',
                localField: 'categories',
                foreignField: '_id',
                as: 'categories'
            }
        }
    ]).toArray()

    const locationRecord = locationRecords[0]

    if (locationRecord === null) {
        return {notFound: true};
    }

    const location = formatLocation(fixJson(locationRecord));

    return {
        props: {
            ...i18nConfig,
            isConnected: true,
            location,
        },
    };
};

const Wrapper = styled.main`
    background: #F9F9F9;

    .swiper {
        --swiper-navigation-size: 24px;
        --swiper-navigation-top-offset: 50%;
        --swiper-navigation-sides-offset: 20px;
        --swiper-navigation-color: #202020;

        &:after {
            z-index: 1;
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: 1;
            background: linear-gradient(to bottom, rgba(0, 0, 0, .3) 0%, rgba(0, 0, 0, .3) 100%);
            pointer-events: none;
        }
    }
`;

const Img = styled.img`
    min-width: 100%;
    min-height: max(200px, 60vh);
    max-height: 60vh;
    object-fit: cover;
`;

const Title = styled.h1`
    text-align: center;
    font-size: min(36px, 5vw);
    font-family: "Marmelad", sans-serif;
    color: #ffffff;
    text-shadow: -1px 0 rgba(0, 0, 0, 0.5), 0 1px rgba(0, 0, 0, 0.5), 1px 0 rgba(0, 0, 0, 0.5), 0 -1px rgba(0, 0, 0, 0.5);

    @media (width < 48rem) {
        font-size: 24px;
    }
`;

const Content = styled.div`
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;

const Container = styled.div`
    font-family: var(--fontFamilySecond);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 28px;

    @media (width < 48rem) {
        grid-template-columns: 1fr;
        padding: 20px;
    }
`;

const LocationTitle = styled.h2`
    font-size: 30px;
    color: #202020;
    margin-bottom: 16px;
`;

const LocationDescription = styled.div`
    font-size: 18px;
    color: #202020;
    margin-bottom: 16px;
`;

export default function Location({location}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {t, i18n} = useTranslation();
    const [showDirection, setShowDirection] = useState(false);
    const [isLocationDisabled, setIsLocationDisabled] = useState(false);
    const title = location.title[i18n.language];
    const description = location.description[i18n.language];

    useEffect(() => {
        navigator.permissions.query({name: "geolocation"}).then((result) => {
            if (result.state === "denied") {
                setIsLocationDisabled(true)
            }
        })
    }, [setIsLocationDisabled]);

    return (
        <div>
            <Head>
                <title>{t("location.title")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <div className="bg-[#6ba3e8]">
                    <Header/>
                </div>

                <Wrapper>
                    <Swiper
                        speed={500}
                        autoplay={{delay: 5000,}}
                        spaceBetween={0}
                        centeredSlides
                        centeredSlidesBounds
                        loop
                        effect={'fade'}
                        navigation
                        modules={[Navigation, Autoplay, EffectFade]}
                    >
                        <Content>
                            <Title>{title}</Title>
                        </Content>
                        {location.images.map((src) => (
                            <SwiperSlide key={src}>
                                <Img src={src} alt=""/>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Container className="mx-auto max-w-screen-xl">
                        <div>
                            <LocationTitle>{title}</LocationTitle>

                            <LocationDescription dangerouslySetInnerHTML={{__html: description}}/>

                            <Tooltip title={t("location.tooltip")} disableHoverListener={!isLocationDisabled}>
                                <span>
                                    <Button disabled={isLocationDisabled} variant="contained"
                                            onClick={() => setShowDirection(true)}>
                                        {t("location.button")}
                                    </Button>
                                </span>
                            </Tooltip>
                        </div>
                        <div>
                            <LocationMap location={location} showDirection={showDirection}/>
                        </div>
                    </Container>
                </Wrapper>

                <Footer/>
            </main>
        </div>
    );
}
