import React, {FC, useEffect, useState} from "react";

import Post from "../components/Post";
import AddComment from "../components/AddComment";
import CommentsBlock from "../components/CommentsBlock";
import {useParams} from "react-router-dom";
import axios from "../axios";
import {PostType} from "../redux/posts/types";
import ReactMarkdown from "react-markdown";

const PostPage: FC = () => {
    const {id} = useParams()
    const [postData, setPostData] = useState<PostType>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(({data}) => setPostData(data))
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }, [id])

    const dateCreated = postData?.createdAt.replace(/T.*/, '')

    if (isLoading) {
        return <Post isLoading={isLoading} />
    }

    return (
        <>
            <Post
                id={id}
                title={postData?.title}
                imageUrl={postData?.imageUrl}
                user={postData?.user}
                createdAt={dateCreated}
                viewsCount={postData?.viewsCount}
                commentsCount={3}
                tags={postData?.tags}
                isFullPost>
                <ReactMarkdown
                    // @ts-ignore
                    children={postData?.text}/>
            </Post>
            <CommentsBlock title={'Комментарии'}
                items={postData}
            >
                <AddComment/>
            </CommentsBlock>
        </>
    );
};

export default PostPage