import type {GetServerSideProps} from "next";
import {useRouter} from 'next/router'
import {useLayoutEffect} from "react";

export const getServerSideProps: GetServerSideProps = async () => {
    return {props: {}};
};

export default function Home() {
    const router = useRouter();

    useLayoutEffect(() => {
        router.push('/Zaporizhzhia');
    }, [router]);

    return (
        <div/>
    );
}
