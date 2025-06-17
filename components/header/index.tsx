import {useState} from "react";
import {useTranslation} from 'next-i18next'
import NavLink from "components/nav_link"
import LangSelector from "components/lang_selector"
import {IconButton, SwipeableDrawer} from "@mui/material";
import styled from "@emotion/styled";

const BurgerButton = styled(IconButton)`
    @media (width >= 64rem) {
        display: none;
    }
`

const Links = styled.div`
    display: none;
    font-size: 20px;

    a {
        color: white;
        transition: all .2s ease-in-out;
    }

    a.active, a:hover {
        text-decoration: underline;
        color: white;
    }
    
    @media (width >= 64rem) {
        display: flex;
        gap: 24px;
    }
`

const MobileList = styled.div`
    min-width: min(250px, 70vw);

    a {
        transition: background-color .2s ease-in-out;
        padding: 8px;

        &:hover, &.active {
            background: rgba(0, 0, 0, 0.04);
        }
    }
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
`;

export const Header = () => {
    const {t} = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
        {
            url: `/zaporizhzhia`,
            text: t("header.home"),
        },
        {
            url: `/zaporizhzhia/map`,
            text: t("header.map"),
        }
    ]

    return (
        <header className="z-1 relative">
            <nav className="px-4 lg:px-6 py-2.5">
                <Container className="mx-auto max-w-screen-xl">
                    <BurgerButton className="justify-self-start" onClick={() => setMobileMenuOpen(true)}>
                        <img src={"/images/icons/burger_white.svg"} alt=""/>
                    </BurgerButton>

                    <NavLink href="/" className="justify-self-center lg:justify-self-start sm:flex">
                        <img src="/images/logo_white.png" className="mr-3 h-9 sm:h-12"
                             alt="Лого"/>
                    </NavLink>

                    <Links className="justify-self-center">
                        {links.map(({url, text}) => (
                            <NavLink key={url} href={url} className="block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0">
                                {text}
                            </NavLink>
                        ))}
                    </Links>

                    <SwipeableDrawer
                        anchor={"left"}
                        open={mobileMenuOpen}
                        onClose={() => setMobileMenuOpen(false)}
                        onOpen={() => setMobileMenuOpen(true)}
                        disablePortal
                    >
                        <MobileList className={"px-4 lg:px-6 py-2.5"}>
                            <BurgerButton className="mb-2" onClick={() => setMobileMenuOpen(false)}>
                                <img src={"/images/icons/burger.svg"} alt=""/>
                            </BurgerButton>

                            {links.map(({url, text}) => (
                                <NavLink key={url} href={url} className="block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0">
                                    {text}
                                </NavLink>
                            ))}
                        </MobileList>
                    </SwipeableDrawer>

                    <LangSelector />
                </Container>
            </nav>
        </header>
    )
}