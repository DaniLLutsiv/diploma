import {useTranslation} from "next-i18next";
import "node_modules/flag-icons/css/flag-icons.min.css";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

interface FlagIconProps {
    countryCode: string;
}

function FlagIcon({countryCode = ""}: FlagIconProps) {

    if (countryCode === "en") {
        countryCode = "gb";
    }

    return (
        <span
            className={`fi fis fiCircle inline-block mr-2 fi-${countryCode}`}
        />
    );
}

interface Language {
    key: string;
    name: string;
}

const languages = [{key: "ua", name: "ua"}, {key: "en", name: "en"}]

const LangSelector = () => {
    const {i18n} = useTranslation();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const { pathname, asPath, query } = router
    const selectedLanguage = languages.find(language => language.key === i18n.language);
    const LANGUAGE_SELECTOR_ID = 'language-selector';

    useEffect(() => {
        const handleWindowClick = (event: any) => {
            const target = event.target.closest('button');
            if (target && target.id === LANGUAGE_SELECTOR_ID) {
                return;
            }
            setIsOpen(false);
        }
        window.addEventListener('click', handleWindowClick)
        return () => {
            window.removeEventListener('click', handleWindowClick);
        }
    }, []);

    const handleLanguageChange = async (language: Language) => {
        await i18n.changeLanguage(language.key);
        router.push({ pathname, query }, asPath, { locale: language.key })
        setIsOpen(false);
    };

    if (!selectedLanguage) {
        return null;
    }

    return (
        <div className="relative justify-self-end">
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center w-full rounded-md px-4 pr-0 md:pr-4 py-2 text-[18px] text-white hover:cursor-pointer"
                id={LANGUAGE_SELECTOR_ID}
                aria-expanded={isOpen}
            >
                <FlagIcon countryCode={selectedLanguage.key}/>
                {selectedLanguage.name}
                <svg
                    className="-me-1 ms-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && <div
                className="origin-top-right absolute right-5 mt-2 w-20 rounded-md shadow-lg ring-1 ring-[#00000055] ring-opacity-5 bg-white"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby={LANGUAGE_SELECTOR_ID}
            >
                <div className="py-1 grid grid-cols-1 gap-2" role="none">
                    {languages.map((language, index) => {
                        return (
                            <button
                                key={language.key}
                                onClick={() => handleLanguageChange(language)}
                                className={`${
                                    selectedLanguage.key === language.key
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                } px-4 py-2 text-sm text-start items-center hover:cursor-pointer inline-flex hover:bg-gray-100 ${index % 2 === 0 ? 'rounded-r' : 'rounded-l'}`}
                                role="menuitem"
                            >
                                <FlagIcon countryCode={language.key}/>
                                <span className="truncate">{language.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>}
        </div>
    )
}

export default LangSelector