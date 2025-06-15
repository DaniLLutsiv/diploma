import React from "react";
import styled from "@emotion/styled";
import {IconButton} from "@mui/material";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {ILocation} from "types";
import NavLink from "components/nav_link";

const Wrapper = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    border-radius: 8px;
    background: #ffffff;
    padding: 8px 12px 8px;

    @media (width < 40rem) {
        top: auto;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: min(50vw, 400px);

    @media (width < 40rem) {
        max-width: 100%;
    }

    a {
        width: min-content;
        font-family: var(--fontFamilySecond);
        font-weight: 500;
        color: #3d5dba;
        transition: all .2s ease-in-out;

        &:hover {
            box-shadow: inset 0 -2px 0 0 rgba(61, 93, 186, 0.7);
        }
    }
`;

const ImageContainer = styled.div`
    width: 100%;

    img {
        border-radius: 8px;
    }
`;

const Title = styled.h2`
    font-family: var(--fontFamilySecond);
    font-weight: 700;
    font-size: 18px;
`;

const Desc = styled.p`
    font-family: var(--fontFamilySecond);
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

const CloseBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 8px;

    img {
        width: 20px;
        height: 20px;
    }
`;

const Button = styled(IconButton)`
    background: #ebebeb;
    padding: 4px;
`;

interface ILocationModal {
    location: ILocation | undefined;
    onClose: () => void;
}

export const LocationModal: React.FC<ILocationModal> = ({location, onClose}) => {
    const {i18n, t} = useTranslation();
    const {query} = useRouter();

    if (!location) {
        return null
    }

    const lang = i18n.language;
    const name = location.title[lang];
    const desc = location.description[lang];

    return (
        <Wrapper>
            <CloseBlock>
                <Button onClick={onClose}>
                    <img src="/images/icons/close.svg" alt="close"/>
                </Button>
            </CloseBlock>

            <Content>
                <ImageContainer>
                    <Image
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        width={500}
                        height={500}
                        src={location.images[0]} alt={name}/>
                </ImageContainer>

                <Title>{name}</Title>

                <Desc dangerouslySetInnerHTML={{__html: desc}}/>

                <NavLink href={`/${query.city as string}/${location.id}`}>
                    {t("map.modal_location.more")}
                </NavLink>
            </Content>
        </Wrapper>
    )
}