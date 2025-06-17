import Head from "next/head";
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import type {GetServerSideProps, InferGetServerSidePropsType} from "next";
import client from "lib/mongodb";
import styled from "@emotion/styled";
import {Button, Checkbox, FormControlLabel, IconButton, TextField} from "@mui/material";
import NavLink from "components/nav_link";
import {AdminHeader} from "components/admin_header";
import {fixJson, formatCategories, formatLocation} from "lib";
import {CategoryType, ICategory, ILocation, Language, MarkerStatus, MarkerType} from "types";
import Image from "next/image";
import {ObjectId} from "mongodb";
import * as React from "react";
import {ChangeEvent, SyntheticEvent, useState} from "react";
import {cloneDeep, set, xor} from "lodash";
import {useRouter} from "next/router";

type ConnectionStatus = {
    isConnected: boolean;
    location?: ILocation;
    categories: ICategory[];
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async ({locale = "", params}) => {
    const i18nConfig = await serverSideTranslations(locale, "common");
    const locationId = params?.location as string

    await client.connect();
    const db = await client.db("diploma")

    const categoriesCollection = db.collection('category')
    const categoriesRecords = await categoriesCollection.find().toArray()
    const categories = formatCategories(categoriesRecords);

    if (!locationId || locationId === "add") {
        return {
            props: {
                ...i18nConfig,
                isConnected: true,
                categories,
            },
        };
    }

    const locationCollection = db.collection('location')
    const locationRecords = await locationCollection.aggregate([
        {
            $match: {_id: new ObjectId(locationId)}
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
            categories,
        },
    };
};

const Wrapper = styled.main`
    background: #f1f0e9;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;

    .Mui-checked.MuiCheckbox-root {
        color: #ffcd25;
    }
`;

const FileInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 164px;
    background-color: #ebeafe;
    transition: background-color 0.1s ease-in-out;

    &.active {
        background-color: #ffffff;
    }
`;

const DeleteButton = styled(IconButton)`
    position: absolute;
    top: 4px;
    right: 4px;
    padding: 4px;
    background: white !important;
`;

const emptyLocation: ILocation = {
    id: "",
    title: {},
    coordinates: {
        lat: 0,
        lng: 0,
    },
    images: [],
    description: {},
    categories: [],
    status: MarkerStatus.Open,
    type: CategoryType.Common,
}

export default function AdminLocation({location = emptyLocation, categories}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const {t, i18n} = useTranslation();
    const router = useRouter();
    const lang = i18n.language;
    const [state, setState] = useState({
        title: location.title,
        description: location.description,
        coordinates: location.coordinates,
        images: location.images,
        categories: location.categories || [],
    })
    const [isDragOver, setIsDragOver] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        setError("");
        const file = event.currentTarget.files?.[0];

        if (!file) return;

        const KB_SIZE = 1024;
        const fileSize = file.size / KB_SIZE / KB_SIZE; // in MiB

        const MAX_FILE_SIZE = 5;
        if (fileSize > MAX_FILE_SIZE) {
            setError(t("admin.form.file_size_error"))
            return;
        }

        setFiles((prev) => [...prev, file])
        event.target.value = "";
    };

    const onChangeHandler = (path: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError("");
        setState((prev) => {
            const newState = cloneDeep(prev);
            set(newState, path, event.target.value)
            return newState;
        });
    }

    const onChangeCategory = (category: string) => () => {
        setError("");
        setState((prev) => ({...prev, categories: xor(prev.categories, [category as CategoryType])}))
    }

    const submitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        setIsLoading(true)

        try {
            const formData = new FormData();
            formData.append('id', location.id);
            formData.append('categories', JSON.stringify(state.categories));
            formData.append('coordinates', JSON.stringify({
                lat: Number(state.coordinates.lat),
                lng: Number(state.coordinates.lng),
            }));
            formData.append('images', JSON.stringify(state.images));
            formData.append('description', JSON.stringify(state.description));
            formData.append('title', JSON.stringify(state.title));
            for (const file of files) {
                formData.append('files', file, file.name)
            }

            const response = await fetch('/api/add', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else if (router.query.location?.includes("add")) {
                void router.push(`/admin/${data.id}`)
            }
        } catch (e: any) {
            console.error(e.message);
        } finally {
            setIsLoading(false);
        }

        return false
    }

    const deleteLocalFile = (name: string) => {
        setError("");
        setFiles((prev) => prev.filter((file) => file.name !== name))
    }

    const deleteFile = (name: string) => {
        setError("");
        setState((prev) => ({
            ...prev,
            images: prev.images.filter((fileName) => fileName !== name)
        }))
    }

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

                <div className="p-5 md:p-10 max-w-[840px] mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <Button variant="contained" component={NavLink} href={`/admin`}>
                            {t("admin.form.back")}
                        </Button>
                    </div>

                    <form noValidate className="max-w-[800px]" onSubmit={submitHandler}>
                        <div className="flex flex-col w-full gap-5 mb-5">
                            <div className="text-xl font-bold">{t("admin.form.title")}</div>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label={t("admin.form.en")}
                                value={state.title[Language.EN]}
                                onChange={onChangeHandler("title.en")}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                label={t("admin.form.ua")}
                                value={state.title[Language.UA]}
                                onChange={onChangeHandler("title.ua")}
                            />
                        </div>

                        <div className="flex flex-col w-full gap-5 mb-5">
                            <div className="text-xl font-bold">{t("admin.form.coordinates")}</div>

                            <div className="flex gap-5">
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={5}
                                    variant="outlined"
                                    label={t("admin.form.lat")}
                                    value={state.coordinates.lat}
                                    onChange={onChangeHandler("coordinates.lat")}
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={5}
                                    variant="outlined"
                                    label={t("admin.form.lng")}
                                    value={state.coordinates.lng}
                                    onChange={onChangeHandler("coordinates.lng")}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-5 mb-5">
                            <div className="text-xl font-bold">{t("admin.form.description")}</div>
                            <TextField
                                fullWidth
                                multiline
                                maxRows={5}
                                variant="outlined"
                                label={t("admin.form.en")}
                                value={state.description[Language.EN]}
                                onChange={onChangeHandler("description.en")}
                            />
                            <TextField
                                fullWidth
                                multiline
                                maxRows={5}
                                variant="outlined"
                                label={t("admin.form.ua")}
                                value={state.description[Language.UA]}
                                onChange={onChangeHandler("description.ua")}
                            />
                        </div>

                        <div className="flex flex-col w-full gap-5 mb-5">
                            <div className="text-xl font-bold">{t("admin.form.image")}</div>

                            <div className="flex gap-2 flex-wrap">
                                {state.images.map((image) => (
                                    <div key={image} className="relative">
                                        <Image className="w-[374px] h-[250px] object-cover" width={450}
                                               height={300}
                                               src={image} alt=""/>
                                        <DeleteButton onClick={() => deleteFile(image)}>
                                            <img src={"/images/icons/delete.svg"} alt="Delete"/>
                                        </DeleteButton>
                                    </div>
                                ))}
                                {files.map((file) => (
                                    <div key={file.name} className="relative">
                                        <Image className="w-[374px] h-[250px] object-cover" width={450}
                                               height={300}
                                               src={URL.createObjectURL(file)} alt=""/>
                                        <DeleteButton onClick={() => deleteLocalFile(file.name)}>
                                            <img src={"/images/icons/delete.svg"} alt="Delete"/>
                                        </DeleteButton>
                                    </div>
                                ))}

                                <FileInputContainer
                                    className={`w-[374px] h-[250px] relative text-center px-4 py-6 text-white cursor-pointer border-dashed border-2 border-[#5E4FF0] rounded ${isDragOver ? "active" : ""}`}
                                    onDragOver={() => setIsDragOver(true)}
                                    onDragEnd={() => setIsDragOver(false)}
                                    onDragLeave={() => setIsDragOver(false)}
                                    onDrop={() => setIsDragOver(false)}
                                >
                                    <input
                                        onChange={onChangeFile}
                                        className="w-full h-full text-[1000%] block opacity-0 appearance-none absolute left-0 top-0"
                                        type="file"
                                        name="mediaFile"
                                        multiple
                                    />
                                    <img src="/images/icons/cloud_upload.svg" className="w-10"/>
                                    <p className="mb-2 text-[#202020] font-bold">
                                        {i18n.t("submission_form.file.upload_text", "Upload file here")}
                                    </p>
                                </FileInputContainer>
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-2 mb-5">
                            <div className="text-xl font-bold">{t("admin.form.categories")}</div>

                            <div>
                                {categories.map((category) => (
                                    <FormControlLabel
                                        control={<Checkbox checked={state.categories.includes(category.type)}
                                                           onChange={onChangeCategory(category.type)}/>}
                                        label={category.name[lang]}
                                        key={category.name[lang]}/>
                                ))}
                            </div>
                        </div>

                        {
                            error && (
                                <div className="mb-5 text-[#d32f2f] font-[500]">{error}</div>
                            )
                        }

                        <Button
                            disabled={Boolean(error || isLoading)}
                            className="md:max-w-[300px]"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            {t("admin.form.submit")}
                        </Button>
                    </form>
                </div>
            </Wrapper>
        </div>
    );
}
