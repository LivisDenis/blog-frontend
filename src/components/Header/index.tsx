import React, {FC} from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {Link, useNavigate} from "react-router-dom";

const Header: FC = () => {
    const navigate = useNavigate()
    const user = Boolean(localStorage.getItem('token'))

    const onClickLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link to="/" className={styles.logo}>
                        <div>BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {user ? (
                            <>
                                <Link to="/posts/create">
                                    <Button variant="contained">Написать статью</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant="contained" color="error">
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Войти</Button>
                                </Link>
                                <Link to="/registration">
                                    <Button variant="contained">Создать аккаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header