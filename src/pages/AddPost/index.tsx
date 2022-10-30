import React, {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import axios, {baseUrl} from "../../axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {PostType} from "../../redux/posts/types";
import {create} from "../../redux/posts/slice";
import {useAppDispatch} from "../../redux/store";

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

const AddPost: FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [fields, setFields] = useState({
        imageUrl: '',
        title: '',
        tags: ''
    })
    const [valueText, setValueText] = useState<string | undefined>('')
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`)
                .then(res => {
                    setFields({
                        imageUrl: res.data.imageUrl,
                        title: res.data.title,
                        tags: res.data.tags,
                    })
                    setValueText(res.data.text)
                })
        }
    }, [id])

    const onChange = useCallback((value: string) => {
        setValueText(value)
    }, []);

    const options = useMemo(() => {
        return {
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                uniqueId: "text",
                delay: 1000
            }
        };
    }, []);

    const handleChangeFile = async (e: any) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)
            const {data} = await axios.post('/upload', formData)

            setFields({...fields, imageUrl: data.url})
        } catch (err) {
            console.warn(err)
            alert('Не удалось загрузить изображение :(')
        }
    }

    const onClickRemoveImg = () => {
        setFields({...fields, imageUrl: ''})
    }

    const onSubmit = async () => {
        try {
            const postData = {
                imageUrl: fields.imageUrl,
                title: fields.title,
                text: valueText,
                tags: fields.tags
            }

            const {data} = id ? await axios.patch<PostType>(`/posts/${id}`, postData)
                : await axios.post<PostType>('/posts', postData)

            const _id = id ?? data._id

            navigate(`/posts/${_id}`)
            dispatch(create(data))
        } catch (err) {
            console.warn(err)
            alert('Не удалось загрузить пост :(')
        }
    }

    return (
        <Paper style={{padding: 30}}>
            <Button onClick={() => inputFileRef.current!.click()} variant="outlined" size="large">
                Загрузить превью
            </Button>
            <input ref={inputFileRef} onChange={handleChangeFile} type="file" hidden/>
            {fields.imageUrl &&
                <>
                    <Button variant="contained" onClick={onClickRemoveImg} color="error">
                        Удалить
                    </Button>
                    <img className={styles.image} src={baseUrl + fields.imageUrl} alt="Uploaded"/>
                </>
            }
            <br/>
            <br/>
            <TextField
                classes={{root: styles.title}}
                value={fields.title}
                onChange={(e) => setFields({...fields, title: e.target.value})}
                variant="standard"
                placeholder="Заголовок статьи..."
                fullWidth
            />
            <TextField
                classes={{root: styles.tags}}
                value={fields.tags}
                onChange={(e) => setFields({...fields, tags: e.target.value})}
                variant="standard"
                placeholder="Тэги"
                fullWidth/>
            <SimpleMDE
                className={styles.editor}
                value={valueText}
                onChange={onChange}
                options={options}/>
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    {id ? 'Сохранить' : 'Опубликовать'}
                </Button>
                <Link to="/">
                    <Button size="large">Отмена</Button>
                </Link>
            </div>
        </Paper>
    );
};

export default AddPost