import React, {FC, useEffect, useState} from 'react';
import Post from '../components/Post';
import TagsBlock from '../components/TagsBlock';
import CommentsBlock from '../components/CommentsBlock';
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../redux/store";
import {fetchPosts} from "../redux/posts/AsyncActions";
import Skeleton from "../components/Post/Skeleton";
import {UserType} from "../@types/user";
import axios from "../axios";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

const Home: FC = () => {
    const dispatch = useAppDispatch()
    const {posts, status} = useSelector((state: RootState) => state.postsSlice)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<UserType>()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.get<UserType>('/auth/me')
                .then(res => setUser(res.data))
                .then(() => setIsLoading(false))
        }
        dispatch(fetchPosts())
    }, [])

    return (
        <>
            <Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {status === 'loading'
                        ? [...Array(3)].map((_, i) => <Skeleton key={i}/>)
                        : posts.map(post =>
                            <Post
                                key={post._id}
                                id={post._id}
                                title={post.title}
                                imageUrl={post.imageUrl}
                                user={post.user}
                                createdAt={post.createdAt}
                                viewsCount={post.viewsCount}
                                tags={post.tags}
                                commentsCount={0}
                                isEditable={user?._id === post.user._id}
                                isFullPost
                            />
                        )}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={isLoading}/>
                    <CommentsBlock title={'Рекомендуемые статьи'}
                        items={posts}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Home