import {useTranslation} from "next-i18next";
import styled from "@emotion/styled";
import Image from "next/image";

const SubTitle = styled.h2`
    font-family: var(--fontFamilySecond);
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin: 0 16px;

    @media (width < 64rem) {
        font-size: 20px;
    }
`;

const Img = styled.img`
    max-width: 300px;
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border: 2px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;

    @media (width < 48rem) {
        display: none;
    }

    @media (width < 64rem) {
        max-width: 200px;
    }
`;

const Item = styled.a`
    max-width: 500px;
    width: 100%;
    height: 275px;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    img {
        transition: all .2s ease-in-out;
        width: 100%;
        object-fit: cover;
    }

    &:hover {
        img {
            scale: 1.1;
        }
    }

    h3 {
        z-index: 1;
        position: absolute;
        font-family: var(--fontFamilyBase);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 32px;
        color: #ffca01;
        width: 100%;
        text-align: center;

        @media (width < 40rem) {
            font-size: 28px;
        }
    }

    &:after {
        z-index: 0;
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 1;
        background: rgba(0, 0, 0, 0.3);
        pointer-events: none;
    }
`;

const HistoricalConatiner = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    width: 80%;
    font-family: var(--fontFamilyBase);
    z-index: 1;

    @media (width < 48rem) {
        top: 50%;
    }

    h3 {
        font-size: 50px;
        margin-bottom: 16px;

        @media (width < 48rem) {
            font-size: 40px;
        }

        @media (width < 40rem) {
            font-size: 32px;
        }
    }
    
    h4 {
        font-size: 20px;

        @media (width < 48rem) {
            font-size: 18px;
        }
        
        @media (width < 40rem) {
            font-size: 16px;
        }
    }
`

export const Landing = () => {
    const {t} = useTranslation();

    return (
        <div>
            <div className="mt-2 p-4 md:p-8">
                <div className="flex flex-col items-center justify-center mx-auto max-w-screen-xl">
                    <SubTitle className="mb-5 md:mb-10">{t("home.landing.about_city")}</SubTitle>

                    <div className="flex justify-center flex-col md:flex-row">
                        <Img src="/images/zaporizhzhia/zp-2.png" alt=""/>
                        <div className="my-2 mx-10 text-center self-center md:text-lg lg:text-xl">
                            {t("home.landing.about_city_copy")}
                        </div>
                        <Img className="object-[30%]" src="/images/zaporizhzhia/zp-3.png" alt=""/>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8 bg-[#f2f2f2]">
                <div
                    className="flex flex-col items-center justify-center mx-auto max-w-screen-xl">
                    <SubTitle className="mb-5 md:mb-10">{t("home.landing.popular_places")}</SubTitle>

                    <div className="flex justify-center items-center flex-col gap-4 md:flex-row md:gap-5 w-full">
                        <Item>
                            <Image fill src="/images/zaporizhzhia/zp-4.png" alt=""/>
                            <h3>{t("home.landing.popular_place_1")}</h3>
                        </Item>

                        <Item>
                            <Image fill src="/images/zaporizhzhia/zp-5.png" alt=""/>
                            <h3>{t("home.landing.popular_place_2")}</h3>
                        </Item>

                        <Item>
                            <Image fill src="/images/zaporizhzhia/zp-6.png" alt=""/>
                            <h3>{t("home.landing.popular_place_3")}</h3>
                        </Item>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8 relative min-h-[600px] bg-after">
                <div className="flex flex-col items-center justify-center mx-auto max-w-screen-xl">
                    <Image fill objectFit="cover" objectPosition="top" style={{width: '100%'}}
                           src="/images/zaporizhzhia/bg-3.png" alt=""/>
                    <HistoricalConatiner>
                        <h3>{t("home.landing.historical")}</h3>
                        <h4>{t("home.landing.historical_copy")}</h4>
                    </HistoricalConatiner>
                </div>
            </div>
        </div>
    )
}