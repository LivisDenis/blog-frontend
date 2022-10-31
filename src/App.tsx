import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AddPost from "./pages/AddPost";
import axios from "./axios";

const App = () => {

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.get('/auth/me')
                .then(res => res)
        }
    }, [])

    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/posts/:id' element={<PostPage/>}/>
                    <Route path='/posts/create' element={<AddPost/>}/>
                    <Route path='/posts/:id/edit' element={<AddPost/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path="*" element={<Navigate to="/" replace />}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;
