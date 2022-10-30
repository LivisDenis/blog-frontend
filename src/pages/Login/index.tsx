import React, {FC} from "react";
import {Navigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "../../axios";
import {UserLoginType, UserRegisterType} from "../../@types/user";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";

const Login: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<UserRegisterType>({mode: "onChange"});

    const onSubmit: SubmitHandler<UserLoginType> = async (values) => {
        const {data} = await axios.post('/auth/login', values)

        if (!data) {
            alert('Не удалось авторизоваться')
        }
        if ('token' in data) {
            localStorage.setItem('token', data.token)
        }
    }

    if (localStorage.getItem('token')) {
       return <Navigate to='/'/>
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register("email",  { required: 'Укажите почту' })}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
                />
                <TextField
                    {...register("password",  { required: 'Укажите пароль' })}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    className={styles.field}
                    type='password'
                    label="Пароль"
                    fullWidth />
                <Button type='submit' size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};

export default Login