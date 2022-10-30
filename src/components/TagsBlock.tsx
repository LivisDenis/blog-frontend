import React, {FC} from "react";
import SideBlock from "./SideBlock";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

type TagsBlockType = {
    items: string[]
    isLoading: boolean
}

const TagsBlock: FC<TagsBlockType> = ({ items, isLoading }) => {

    return (
        <SideBlock title="Тэги">
            <List>
                <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/tags/`}
                >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TagIcon />
                            </ListItemIcon>
                            {isLoading ? (
                                <Skeleton width={100} />
                            ) : (
                                <ListItemText primary={''} />
                            )}
                        </ListItemButton>
                    </ListItem>
                </a>
            </List>
        </SideBlock>
    );
};

export default TagsBlock