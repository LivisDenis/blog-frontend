import React, {FC, ReactNode} from "react";

import SideBlock from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import {PostType} from "../redux/posts/types";

type PostUserType = {
    avatarUrl: string
    fullName: string
}

type CommentBlockType = {
    user: PostUserType
    text: string
}

type CommentsBlock = {
    title: string
    items: PostType[] | PostType | undefined
    children?: ReactNode
}

const CommentsBlock: FC<CommentsBlock> = ({ items, children, title }) => {

    return (
        <SideBlock title={title}>
            <List>
                <React.Fragment>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Skeleton variant="circular" width={40} height={40} />
                            {/*<Avatar src={''} />*/}
                        </ListItemAvatar>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Skeleton variant="text" height={25} width={120} />
                            <Skeleton variant="text" height={18} width={230} />
                        </div>
                        <ListItemText
                            primary={''}
                            secondary={''}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            </List>
            {children}
        </SideBlock>
    );
};

export default CommentsBlock