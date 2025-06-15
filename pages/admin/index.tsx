import Head from "next/head";
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import type {GetServerSideProps, InferGetServerSidePropsType} from "next";
import client from "lib/mongodb";
import styled from "@emotion/styled";
import {Button} from "@mui/material";
import NavLink from "components/nav_link";
import {AdminHeader} from "components/admin_header";
import {formatLocations} from "lib";
import {ILocation} from "types";
import Image from "next/image";

const Wrapper = styled.main`
    background: #f1f0e9;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
`;

type ConnectionStatus = {
    isConnected: boolean;
    locations: ILocation[];
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async ({locale = ""}) => {
    const i18nConfig = await serverSideTranslations(locale, "common");

    try {
        await client.connect();

        const db = await client.db("diploma")
        const locationCollection = db.collection('location')
        const locationRecords = await locationCollection.aggregate([
            {
                $lookup: {
                    from: 'category',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categories'
                }
            }
        ]).toArray()
        const locations = formatLocations(locationRecords);

        return {
            props: {
                ...i18nConfig,
                isConnected: true,
                locations,
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: {
                ...i18nConfig,
                isConnected: false,
                locations: [],
            },
        };
    }
};

const Location = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    border: 1px solid #1b5243;
    border-radius: 4px;
    color: #175040;

    @media (width < 48rem) {
        grid-template-columns: 1fr;
    }
`

const Desc = styled.div`
    font-size: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.2em;
    -webkit-line-clamp: calc(7 * 1.2);

    @media (width < 40rem) {
        -webkit-line-clamp: calc(5 * 1.2);
    }

    @media (height < 600) {
        -webkit-line-clamp: calc(4 * 1.2);
    }
`

export default function Admin({locations}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {t, i18n} = useTranslation();
    const lang = i18n.language;

    return (
        <div>
            <Head>
                <title>{t("admin.title")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Wrapper>
                <div className="flex bg-[#1b5243] w-full">
                    <AdminHeader/>
                </div>

                <div className="p-5 md:p-10">
                    <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold">{t("admin.page.title")}</div>

                        <Button variant="contained" component={NavLink} href={`/admin/add`}>
                            {t("admin.page.add")}
                        </Button>
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        {locations.map((location) => {
                            const title = location.title[lang];
                            const description = location.description[lang];
                            const image = location.images[0];

                            return (
                                <Location key={location.id}>
                                    {image && (
                                        <Image className="md:hidden h-full object-cover" width={500} height={500} src={image} alt=""/>
                                    )}

                                    <div>
                                        <div className="text-xl font-bold mb-2">{title}</div>

                                        <Desc className="mb-2" dangerouslySetInnerHTML={{__html: description}}/>

                                        <Button variant="contained" component={NavLink} href={`/admin/${location.id}/`}>
                                            {t("admin.page.edit")}
                                        </Button>
                                    </div>

                                    {image && (
                                        <Image className="hidden md:block h-full object-cover" width={500} height={500} src={image} alt=""/>
                                    )}
                                </Location>
                            )
                        })}
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
