import styled from "@emotion/styled";
import {useTranslation} from "next-i18next";
import NavLink from "components/nav_link";

const Wrapper = styled.footer`
    padding: 20px;
    background: #0d2339;
    font-family: var(--fontFamilySecond);
    font-weight: 600;
    color: #ffffff;
`;

export const Footer = () => {
    const {t} = useTranslation();

    return (
        <Wrapper>
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 mx-auto max-w-screen-xl">
                <div className="flex flex-col gap-2">
                    <div>{t("footer.about_title")}</div>
                    <div className="font-normal max-w-[15rem]">{t("footer.about_text")}</div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <div>{t("footer.nav_title")}</div>
                        <NavLink href="/" className="font-normal">
                            {t("footer.nav_link")}
                        </NavLink>
                    </div>
                    <div>
                        <img src="/images/logo_white.png" className="h-20 sm:h-16 my-auto mr-auto md:hidden"
                             alt="Лого"/>
                    </div>
                </div>
                <img src="/images/logo_white.png" className="hidden md:block h-16 mr-3 my-auto ml-auto"
                     alt="Лого"/>
            </div>
        </Wrapper>
    )
}