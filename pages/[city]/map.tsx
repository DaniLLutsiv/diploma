import Head from "next/head";
import type {GetServerSideProps, InferGetServerSidePropsType} from "next";
import client from "lib/mongodb";
import {Header} from "components/header";
import {MapComponent} from "components/map/map";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {ICategory, ILocation} from "types";
import {formatCategories, formatLocations} from "lib";
import {Footer} from "components/footer";

type ConnectionStatus = {
    isConnected: boolean;
    locations: ILocation[];
    categories: ICategory[];
};

export const getServerSideProps: GetServerSideProps<
    ConnectionStatus
> = async ({locale = ""}) => {
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
        const categoriesCollection = db.collection('category')
        const categoriesRecords = await categoriesCollection.find().toArray()
        const categories = formatCategories(categoriesRecords);

        return {
            props: {
                ...i18nConfig,
                isConnected: true,
                locations,
                categories,
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: {
                ...i18nConfig,
                isConnected: false,
                locations: [],
                categories: [],
            },
        };
    }
};

export default function Map({locations, categories}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {t} = useTranslation();

    return (
        <div>
            <Head>
                <title>{t("map.title")}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <div className="bg-[#6ba3e8]">
                    <Header/>
                </div>

                <MapComponent locations={locations} categories={categories}/>

                <Footer/>
            </main>
        </div>
    );
}
