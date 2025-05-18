import Head from "next/head";
import type {GetServerSideProps, InferGetServerSidePropsType} from "next";
import client from "../../lib/mongodb";
import {Header} from "../../components/header";
import {MapComponent} from "../../components/map/map";

type ConnectionStatus = {
    isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
    ConnectionStatus
> = async () => {
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
            props: {isConnected: true},
        };
    } catch (e) {
        console.error(e);
        return {
            props: {isConnected: false},
        };
    }
};

export default function Map({
                                 isConnected,
                             }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <div className="bg-blue-400 bg-[url(/images/bg.jpg)]">
                    <Header/>
                </div>

                {/*<MapProvider>*/}
                    <MapComponent />
                {/*</MapProvider>*/}
            </main>
        </div>
    );
}
