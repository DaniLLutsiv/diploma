import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {useLayoutEffect} from "react";

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    res.setHeader('Set-Cookie', `accessToken=""; path=/; httpOnly; max-age=0`)

    return {props: {}}
};

export default function Logout() {
    const router = useRouter();

    useLayoutEffect(() => {
        void router.push('/login');
    }, [router]);

    return (
        <div/>
    );
}
