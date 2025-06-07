import React from "react";
import styled from "@emotion/styled";
import {Checkbox, FormControlLabel, IconButton, Menu, MenuItem} from "@mui/material";
import {ICategory} from "types";
import {useTranslation} from "next-i18next";

const Wrapper = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    background: #ffffff;
    border-radius: 8px;
`;

const Button = styled(IconButton)`
    &:hover {
        background: #f3f3f3;
    }
`;

interface IFilters {
    categories: ICategory[];
}

export const Filters: React.FC<IFilters> = ({categories}) => {
    const {i18n} = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const lang = i18n.language;

    return (
        <Wrapper>
            <Button onClick={handleClick}>
                <img className="w-6 h-6" src={"/images/icons/filters.svg"} alt=""/>
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {categories.map((category) => (
                    <MenuItem key={category.id}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label={category.name[lang]} />
                    </MenuItem>
                ))}
            </Menu>
        </Wrapper>
    )
};