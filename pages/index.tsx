import type {GetServerSideProps} from "next";
import {useRouter} from 'next/router'
import {useLayoutEffect} from "react";

export const getServerSideProps: GetServerSideProps = async () => {
    return {props: {}};
};

export default function Home() {
    const router = useRouter();

    useLayoutEffect(() => {
        void router.push('/zaporizhzhia');
    }, [router]);

    return (
        <div/>
    );
}
