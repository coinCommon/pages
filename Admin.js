import React, {useContext, useEffect, useMemo, useState} from 'react';
import classes from "../css/admin.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import HideAndShows from "../hocks/hideAndShow";
import Data from "../components/Admin/data";
import Modals from "../components/Admin/modals";
import {createUser, fetchUser} from "../http/userAPI";
import {createServices, editOneServicesIMG, fetchServices} from "../http/servicesAPI";
import {createPrices, fetchPrices} from "../http/pricesAPI";
import {createChapterDocuments, fetchChapterDocuments} from "../http/chapterDocumentsAPI";
import {createDocuments, fetchDocuments} from "../http/documentsAPI";
import {createTechnologies, fetchTechnologies} from "../http/technologiesAPI";
import {createSliders, fetchSliders} from "../http/slidersAPI";
import {createNews, fetchNews} from "../http/newsAPI";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE} from "../utils/const";
import {createTask, fetchOneTask} from "../http/taskAPI";
import {Translate} from "../hocks/translate";
import {createSitemap, createTokens} from "../http/otherAPI";
import {Helmet} from "react-helmet";
import EditModals from "../components/Admin/editModals";


const Admin = () => {

    const {allStore} = useContext(Context)
    const navigate = useNavigate()


    const [fileIMG, setFileIMG] = useState(null)
    const [filePreviewIMG, setFilePreviewIMG] = useState(null)

    const [fileIconEd, setFileIconEd] = useState(null)
    const [filePreviewIconEd, setFilePreviewIconEd] = useState(null)

    // Если edit !== 0 открываается окно Редактирования данных
    const [edit, setEdit] = useState(0)
    // В это окно загружаются данные см. getDataForEditing
    const [dataEdit, setDataEdit] = useState([{title: 'Заголовок', description: 'Описание'}])
    // ID сохраняемых дынных и ссылка на API сохранения
    const [saveApiAndId, setSaveApiAndId] = useState({api: null, id: 0, apiIMG: null})
    // Загрузка данных при клике на кнопку 'редактировать'
    const getDataForEditing = (fetch, edit, title, id, apiIMG) => {
        if (id === 0) {alert(id + ' Непредвиденная ошибка!')}
        else {
            fetch(title, id).then(data => {
                setDataEdit([data])
                setEdit(edit + 1)
                setFileIMG(null)
                setFilePreviewIMG(null)
                setFileIconEd(null)
                setFilePreviewIconEd(null)
            }).catch(error => console.log(error))
            setSaveApiAndId({api: edit, id: id, apiIMG: apiIMG})
        }
    }
    // Обновление данных при клике на кнопку 'сохранить'
    const SaveData = () => {
        if (saveApiAndId.id === 0) {alert(saveApiAndId.id + ' Непредвиденная ошибка!')}
        else {
            saveApiAndId.api(saveApiAndId.id, dataEdit[0]).then(data => {
                setEdit(0)
                setStateDelete(stateDelete + 1)
                setFileIMG(null)
                setFilePreviewIMG(null)
            }).catch(error => console.log(error))
        }
    }
    // Обновление изображения при клике на кнопку 'сохранить'
    const SaveDataIMG = () => {
        if (saveApiAndId.id === 0) {alert(saveApiAndId.id + ' Непредвиденная ошибка!')}
        else {
            const formData = new FormData()
            formData.append('deleteFile', dataEdit[0].img)
            formData.append('img', fileIMG)
            saveApiAndId.apiIMG(saveApiAndId.id, formData).then(data => {
                setFileIMG(null)
                setStateDelete(stateDelete + 1)
            }).catch(error => alert(error.message))
        }
    }
    // Обновление изображения при клике на кнопку 'сохранить'
    const SaveDataIcon = () => {
        if (saveApiAndId.id === 0) {alert(saveApiAndId.id + ' Непредвиденная ошибка!')}
        else {
            const formData = new FormData()
            formData.append('deleteFile', dataEdit[0].icon)
            formData.append('icon', fileIconEd)
            saveApiAndId.apiIMG(saveApiAndId.id, formData).then(data => {
                setFileIconEd(null)
                setStateDelete(stateDelete + 1)
            }).catch(error => alert(error.message))
        }
    }


    // ADMIN PANEL
    const [menuServices, setMenuServices] = useState(false)
    const [menuPrices, setMenuPrices] = useState(false)
    const [menuDocumentsChapter, setMenuDocumentsChapter] = useState(false)
    const [menuDocuments, setMenuDocuments] = useState(false)
    const [menuTechnology, setMenuTechnology] = useState(false)
    const [menuUsers, setMenuUsers] = useState(false)
    const [menuSlides, setMenuSlides] = useState(false)
    const [menuNews, setMenuNews] = useState(false)
    const [menuToken, setMenuToken] = useState(false)

    const [state, setState] = useState(0) // Для добавления данных
    const [stateData, setStateData] = useState(0) // Для показа данных
    // Услуги - 1
    // Цены - 2
    // Документы - 3
    // Документы - 4
    // Технологии - 5
    // Пользователи - 6
    // Слайдер - 7
    // Новости - 8

    // Данные с INPUTS
    const [file, setFile] = useState('') // Для файла или изображения
    const [fileName, setFileName] = useState('') // Для имени файла
    const [fileIcon, setFileIcon] = useState('') // Для иконки у сервисов
    const [filePreview, setFilePreview] = useState(null) // Для превью изображения
    const [filePreviewIcon, setFilePreviewIcon] = useState(null) // Для превью иконки у сервисов

    // Объект с данными
    const [dataInputs, setDataInputs] = useState([
        {title: '', min_description: '', description: '', name: '', email: '', password: '', role: '', price: ''}
    ])


    // Функции
    const ClearValue = () => {
        setDataInputs([{title: '', min_description: '', description: '', name: '', email: '', password: '', role: '', price: ''}])
        setFile('')
        setFileIcon('')
        setFilePreview(null)
        setFilePreviewIcon(null)
        setFileName('')
        setState(0)
    }

    const addDataUser = () => {
        if (dataInputs[0].email === '' || dataInputs[0].password === '' || dataInputs[0].role === '' || dataInputs[0].name === '') {
            alert('Поля заполненны некорректно')
            return false
        }
        createUser(`${dataInputs[0].email}`, `${dataInputs[0].password}`,
            `${dataInputs[0].role}`, `${dataInputs[0].name}`)
            .then(data => ClearValue()).catch(error => alert(error.message))
    }

    const addDataService = () => {
        if (dataInputs[0].title === '' || dataInputs[0].description === '' || file === '' || fileIcon === '') {
            alert('Поля заполненны некорректно')
            return false
        }
        const formData = new FormData()
        formData.append('title', dataInputs[0].title)
        formData.append('description', dataInputs[0].description)
        formData.append('img', file)
        formData.append('icon', fileIcon)
        createServices(formData).then(data => ClearValue()).catch(error => alert(error.message))
    }

    const addDataPrice = () => {
        if (dataInputs[0].title === '' || dataInputs[0].description === '' || dataInputs[0].price === '') {
            alert('Поля заполненны некорректно')
            return false
        }
        createPrices(`${dataInputs[0].title}`, `${dataInputs[0].description}`, `${dataInputs[0].price}`)
            .then(data => ClearValue()).catch(error => alert(error.message))
    }
    const addDataChapterDocuments = () => {
        if (dataInputs[0].name === '') {
            alert('Поля заполненны некорректно')
            return false
        }
        createChapterDocuments(`${dataInputs[0].name}`)
            .then(data => ClearValue()).catch(error => alert(error.message))
    }

    const addDataDocuments = () => {
        if (dataInputs[0].title === '' || dataInputs[0].description === '' || file === '' || dataInputs[0].name === '' || fileName === '') {
            alert('Поля заполненны некорректно')
            return false
        }
        const formData = new FormData()
        formData.append('title', dataInputs[0].title)
        formData.append('description', dataInputs[0].description)
        formData.append('file', file)
        formData.append('chapter', dataInputs[0].name)
        formData.append('name', fileName)
        createDocuments(formData).then(data => ClearValue()).catch(error => alert(error.message))
    }

    const addDataTechnology = () => {
        if (dataInputs[0].title === '' || dataInputs[0].description === '' || file === '') {
            alert('Поля заполненны некорректно')
            return false
        }
        const formData = new FormData()
        formData.append('title', dataInputs[0].title)
        formData.append('description', dataInputs[0].description)
        formData.append('img', file)
        createTechnologies(formData).then(data => ClearValue()).catch(error => alert(error.message))
    }

    const addDataSlider = () => {
        if (dataInputs[0].title === '' || dataInputs[0].description === '' || file === '') {
            alert('Поля заполненны некорректно')
            return false
        }
        const formData = new FormData()
        formData.append('title', dataInputs[0].title)
        formData.append('description', dataInputs[0].description)
        formData.append('img', file)
        createSliders(formData).then(data => ClearValue()).catch(error => alert(error.message))
    }

    const addDataNews = () => {
        if (dataInputs[0].title === '' || dataInputs[0].min_description === '' || dataInputs[0].description === '' || file === '') {
            alert('Поля заполненны некорректно')
            return false
        }
        const formData = new FormData()
        formData.append('title', dataInputs[0].title)
        formData.append('min_description', dataInputs[0].min_description)
        formData.append('description', dataInputs[0].description)
        formData.append('img', file)
        createNews(formData).then(data => ClearValue()).catch(error => alert(error.message))
    }

    const addDataToken = () => {
        if (dataInputs[0].title === '' || dataInputs[0].description === '') {
            alert('Поля заполненны некорректно')
            return false
        }
        if (dataInputs[0].name !== 'TOKEN') {
            alert('Секретный ключ не верный')
            return false
        }
        createTokens(`${dataInputs[0].title}`, `${dataInputs[0].description}`)
            .then(data => ClearValue()).catch(error => alert(error.message))
    }
    // Функции


    const [dataTypeName, setDataTypeName] = useState([{name: ''}])
    const [nameChapter, setNameChapter] = useState([])

    useMemo( () => {
        if (state === 1 || stateData === 1) {setDataTypeName([{name: 'услуги'}])}
        if (state === 2 || stateData === 2) {setDataTypeName([{name: 'цены'}])}
        if (state === 3 || stateData === 3) {setDataTypeName([{name: 'документы'}])}
        if (state === 4 || stateData === 4) {
            setDataTypeName([{name: 'документы'}])
            fetchChapterDocuments().then(data => setNameChapter(data.rows))
        }
        if (state === 5 || stateData === 5) {setDataTypeName([{name: 'технологии'}])}
        if (state === 6 || stateData === 6) {setDataTypeName([{name: 'пользователи'}])}
        if (state === 7 || stateData === 7) {setDataTypeName([{name: 'слайдер'}])}
        if (state === 8 || stateData === 8) {setDataTypeName([{name: 'новости'}])}
        if (state === 9 || stateData === 9) {setDataTypeName([{name: 'Задача менеджеру'}])}
        if (state === 10) {setDataTypeName([{name: 'TOKEN'}])}
        if (state !== 0) {document.body.style.overflow = 'hidden'}
        if (state === 0) {
            document.body.style.overflow = 'auto'
            setFile('')
            setFilePreview('')
            setFileIcon('')
            setFilePreviewIcon('')
            setFileName('')
        }
    }, [state, stateData])
    // ADMIN PANEL



    // Загрузка данных
    const [load, setLoad] = useState(false)
    const [dataDb, setDataDb] = useState([])
    // Состояние, используемое для обновления данных при удалении
    const [stateDelete, setStateDelete] = useState(0)

    useEffect(() => {
        setLoad(true)
        if (stateData === 1) {
            fetchServices().then(data => setDataDb(data.rows)).finally(() => setLoad(true))
        }
        if (stateData === 2) {
            fetchPrices().then(data => setDataDb(data.rows)).finally(() => setLoad(true))
        }
        if (stateData === 3) {
            fetchChapterDocuments().then(data => setDataDb(data.rows)).finally(() => setLoad(true))
        }
        if (stateData === 4) {
            fetchDocuments().then(data => setDataDb(data.rows)).finally(() => setLoad(true))
        }
        if (stateData === 5) {
            fetchTechnologies().then(data => setDataDb(data.rows)).finally(() => setLoad(true))
        }
        if (stateData === 6) {
            fetchUser().then(data => setDataDb(data)).finally(() => setLoad(true))
        }
        if (stateData === 7) {
            fetchSliders().then(data => setDataDb(data.rows)).finally(() => setLoad(true))
        }
        if (stateData === 8) {
            fetchNews().then(data => setDataDb(data.rows)).finally(() => setLoad(true))
        }
        if (stateData === 10) {
            fetchOneTask(allStore.getUsers.id).then(data => setDataDb(data.rows)).finally(() => setLoad(true))
        }
    }, [state, stateDelete, stateData])



    // Генерерум ссылки для sitemap.xml
    // Объект, передаваемый в otherController (sitemap)
    const [siteMap, setSiteMap] = useState({
        '/about': ['get'],
        '/documents': ['get, post'],
        '/technologies': ['get'],
        '/reviews': ['get'],
        '/news': ['get'],
        '/services': ['get'],
        '/contacts': ['get'],
        '/privacy-policy': ['get'],
        '/prices': ['get'],
        '/cost-calculation': ['get']
    })
    // Формируем ссылки и добавляем в объект
    useEffect(() => {
        fetchServices().then(data => {
            setSiteMap(Object.assign( siteMap, ...data.rows.map(n => n.title !== false ? {['/services/' + Translate(n.title) + '/' + n.id]: ['get']} : n)))
        }).finally(() => fetchTechnologies().then(data => {
            setSiteMap(Object.assign( siteMap, ...data.rows.map(t => t.title !== false ? {['/technologies/' + Translate(t.title) + '/' + t.id]: ['get']} : t)))
        }).finally(() => fetchNews().then(data => {
            setSiteMap(Object.assign( siteMap, ...data.rows.map(n => n.title !== false ? {['/news/' + Translate(n.title) + '/' + n.id]: ['get']} : n)))
        }).finally(() => createSitemap(siteMap).then().catch()))) // Отправляем данные на API sitemap
    }, [])
    // Генерерум ссылки для sitemap.xml


    // Кнопка выйти
    const logOut = () => {
        allStore.setUsers([])
        allStore.setIsAuth(false)
        allStore.setIsAdmin(false)
        localStorage.setItem('token', '')
        navigate(AUTH_ROUTE)
    }
    // Кнопка выйти


    // Сообщение пользователя

    const [userId, setUserId] = useState(null)
    const GetOneTask = (id) => {
        setUserId(id)
        setState(9)
    }
    const addDataTask = () => {
        createTask(userId, dataInputs[0].title, dataInputs[0].description, 'WORK' ).then(data => ClearValue()).catch(error => alert(error.message))
    }

    // Показать сообщения
    const OneMessage = (userId) => {
        setStateData(9)
        fetchOneTask(userId).then(data => setDataDb(data.rows)).finally(() => setLoad(true))
    }
    // Сообщение пользователя


    if (!load) {
        return false
    }



    // Функция удаления
    const DeleteData = (api, id, img) => {
        if (id === 0) {alert(id + ' Непредвиденная ошибка!')}
        else {
            let conf = window.confirm('Данные нельзя восстановить. Вы действительно желате удалить данные?')
            if (conf) {api(id, img).then(data => {setStateDelete(stateDelete + 1)})}
            else {alert('Отменено пользователем')}
        }
    }
    // Функция удаления

    return (
        <section className={classes.section_admin}>

            <Helmet>
                <title>Личный кабинет ТК Ювента</title>
                <meta name="description" content="Личный кабинет ТК Ювента"/>
            </Helmet>

            <div className={classes.admin_data}>

                <div className={classes.admin_line_data}>
                    <h4>
                        uventa-panel v0.1
                    </h4>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <button className={classes.button_message} onClick={() => setStateData(10)}>
                            Мои сообщения
                        </button>
                        <h5>
                            {allStore.getUsers.email}
                        </h5>
                        <h3>
                            {allStore.getUsers.name}
                        </h3>
                        <button onClick={() => logOut()} className={classes.button_logout}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </button>
                    </div>
                </div>


                <div className={classes.admin_grid}>

                    <div className={classes.child_left}>

                        <div className={classes.chapter}>
                            <div onClick={() => HideAndShows(menuServices, setMenuServices)} className={classes.chapter_flex}>
                                <div style={menuServices ? {color: 'limegreen'} : {}} className={classes.name}>
                                    Услуги
                                </div>
                                <div style={menuServices ? {transform: 'rotate(180deg)', left: '-10px'} : {}} className={classes.arrow_4}>
                                    <span className={classes.arrow_4_left}></span>
                                    <span className={classes.arrow_4_right}></span>
                                </div>
                            </div>
                            <div
                                style={menuServices ?
                                    {opacity: 1, visibility: 'visible', height: '50px', marginBottom: '-15px'}
                                    :
                                    {}}
                                className={classes.subsection}
                            >
                                <button onClick={() => setStateData(1)}>
                                    Показать
                                </button>
                                {allStore._isAdmin ?
                                <button
                                    onClick={() => setState(1)}
                                    style={{background: '#4375f7', borderColor: '#4375f7', color: '#FFF'}}>
                                    Добавить
                                </button>
                                    : ''}
                            </div>
                        </div>

                        <div className={classes.chapter}>
                            <div onClick={() => HideAndShows(menuPrices, setMenuPrices)} className={classes.chapter_flex}>
                                <div style={menuPrices ? {color: 'limegreen'} : {}} className={classes.name}>
                                    Цены
                                </div>
                                <div style={menuPrices ? {transform: 'rotate(180deg)', left: '-10px'} : {}} className={classes.arrow_4}>
                                    <span className={classes.arrow_4_left}></span>
                                    <span className={classes.arrow_4_right}></span>
                                </div>
                            </div>
                            <div
                                style={menuPrices ?
                                    {opacity: 1, visibility: 'visible', height: '50px', marginBottom: '-15px'}
                                    :
                                    {}}
                                className={classes.subsection}
                            >
                                <button onClick={() => setStateData(2)}>
                                    Показать
                                </button>
                                {allStore._isAdmin ?
                                <button
                                    onClick={() => setState(2)}
                                    style={{background: '#4375f7', borderColor: '#4375f7', color: '#FFF'}}>
                                    Добавить
                                </button>
                                    : ''}
                            </div>
                        </div>


                        <div className={classes.chapter}>
                            <div onClick={() => HideAndShows(menuDocumentsChapter, setMenuDocumentsChapter)} className={classes.chapter_flex}>
                                <div style={menuDocumentsChapter ? {color: 'limegreen'} : {}} className={classes.name}>
                                    Разделы документов
                                </div>
                                <div style={menuDocumentsChapter ? {transform: 'rotate(180deg)', left: '-10px'} : {}} className={classes.arrow_4}>
                                    <span className={classes.arrow_4_left}></span>
                                    <span className={classes.arrow_4_right}></span>
                                </div>
                            </div>
                            <div
                                style={menuDocumentsChapter ?
                                    {opacity: 1, visibility: 'visible', height: '50px', marginBottom: '-15px'}
                                    :
                                    {}}
                                className={classes.subsection}
                            >
                                <button onClick={() => setStateData(3)}>
                                    Показать
                                </button>
                                {allStore._isAdmin ?
                                <button
                                    onClick={() => setState(3)}
                                    style={{background: '#4375f7', borderColor: '#4375f7', color: '#FFF'}}>
                                    Добавить
                                </button>
                                    : ''}
                            </div>
                        </div>


                        <div className={classes.chapter}>
                            <div onClick={() => HideAndShows(menuDocuments, setMenuDocuments)} className={classes.chapter_flex}>
                                <div style={menuDocuments ? {color: 'limegreen'} : {}} className={classes.name}>
                                    Документы
                                </div>
                                <div style={menuDocuments ? {transform: 'rotate(180deg)', left: '-10px'} : {}} className={classes.arrow_4}>
                                    <span className={classes.arrow_4_left}></span>
                                    <span className={classes.arrow_4_right}></span>
                                </div>
                            </div>
                            <div
                                style={menuDocuments ?
                                    {opacity: 1, visibility: 'visible', height: '50px', marginBottom: '-15px'}
                                    :
                                    {}}
                                className={classes.subsection}
                            >
                                <button onClick={() => setStateData(4)}>
                                    Показать
                                </button>
                                {allStore._isAdmin ?
                                <button
                                    onClick={() => setState(4)}
                                    style={{background: '#4375f7', borderColor: '#4375f7', color: '#FFF'}}>
                                    Добавить
                                </button>
                                    : ''}
                            </div>
                        </div>

                        <div className={classes.chapter}>
                            <div onClick={() => HideAndShows(menuTechnology, setMenuTechnology)} className={classes.chapter_flex}>
                                <div  style={menuTechnology ? {color: 'limegreen'} : {}} className={classes.name}>
                                    Технологии
                                </div>
                                <div style={menuTechnology ? {transform: 'rotate(180deg)', left: '-10px'} : {}} className={classes.arrow_4}>
                                    <span className={classes.arrow_4_left}></span>
                                    <span className={classes.arrow_4_right}></span>
                                </div>
                            </div>
                            <div
                                style={menuTechnology ?
                                    {opacity: 1, visibility: 'visible', height: '50px', marginBottom: '-15px'}
                                    :
                                    {}}
                                className={classes.subsection}
                            >
                                <button onClick={() => setStateData(5)}>
                                    Показать
                                </button>
                                {allStore._isAdmin ?
                                <button
                                    onClick={() => setState(5)}
                                    style={{background: '#4375f7', borderColor: '#4375f7', color: '#FFF'}}>
                                    Добавить
                                </button>
                                    : ''}
                            </div>
                        </div>



                        {allStore._isAdmin ?
                        <div className={classes.chapter}>
                            <div onClick={() => HideAndShows(menuUsers, setMenuUsers)} className={classes.chapter_flex}>
                                <div style={menuUsers ? {color: 'limegreen'} : {}} className={classes.name}>
                                    Пользователи
                                </div>
                                <div style={menuUsers ? {transform: 'rotate(180deg)', left: '-10px'} : {}} className={classes.arrow_4}>
                                    <span className={classes.arrow_4_left}></span>
                                    <span className={classes.arrow_4_right}></span>
                                </div>
                            </div>
                            <div
                                style={menuUsers ?
                                    {opacity: 1, visibility: 'visible', height: '50px', marginBottom: '-15px'}
                                    :
                                    {}}
                                className={classes.subsection}
                            >
                                <button onClick={() => setStateData(6)}>
                                    Показать
                                </button>
                                <button
                                    onClick={() => setState(6)}
                                    style={{background: '#4375f7', borderColor: '#4375f7', color: '#FFF'}}>
                                    Добавить
                                </button>
                            </div>
                        </div>

                            :
                            ''
                        }




                        <div className={classes.chapter}>
                            <div onClick={() => HideAndShows(menuSlides, setMenuSlides)} className={classes.chapter_flex}>
                                <div style={menuSlides ? {color: 'limegreen'} : {}} className={classes.name}>
                                    Слайдер
                                </div>
                                <div style={menuSlides ? {transform: 'rotate(180deg)', left: '-10px'} : {}} className={classes.arrow_4}>
                                    <span className={classes.arrow_4_left}></span>
                                    <span className={classes.arrow_4_right}></span>
                                </div>
                            </div>
                            <div
                                style={menuSlides ?
                                    {opacity: 1, visibility: 'visible', height: '50px', marginBottom: '-15px'}
                                    :
                                    {}}
                                className={classes.subsection}
                            >
                                <button onClick={() => setStateData(7)}>
                                    Показать
                                </button>
                                {allStore._isAdmin ?
                                <button
                                    onClick={() => setState(7)}
                                    style={{background: '#4375f7', borderColor: '#4375f7', color: '#FFF'}}>
                                    Добавить
                                </button>
                                    : ''}
                            </div>
                        </div>

                        <div className={classes.chapter}>
                            <div onClick={() => HideAndShows(menuNews, setMenuNews)} className={classes.chapter_flex}>
                                <div style={menuNews ? {color: 'limegreen'} : {}} className={classes.name}>
                                    Новости
                                </div>
                                <div style={menuNews ? {transform: 'rotate(180deg)', left: '-10px'} : {}} className={classes.arrow_4}>
                                    <span className={classes.arrow_4_left}></span>
                                    <span className={classes.arrow_4_right}></span>
                                </div>
                            </div>
                            <div
                                style={menuNews ?
                                    {opacity: 1, visibility: 'visible', height: '50px', marginBottom: '-15px'}
                                    :
                                    {}}
                                className={classes.subsection}
                            >
                                <button onClick={() => setStateData(8)}>
                                    Показать
                                </button>
                                {allStore._isAdmin ?
                                <button
                                    onClick={() => setState(8)}
                                    style={{background: '#4375f7', borderColor: '#4375f7', color: '#FFF'}}>
                                    Добавить
                                </button>
                                    : ''}
                            </div>
                        </div>

                        <div className={classes.chapter}>
                            <div onClick={() => HideAndShows(menuToken, setMenuToken)} className={classes.chapter_flex}>
                                <div style={menuToken ? {color: 'limegreen'} : {}} className={classes.name}>
                                    TOKEN (Для опытных пользователей)
                                </div>
                                <div style={menuToken ? {transform: 'rotate(180deg)', left: '-10px'} : {}} className={classes.arrow_4}>
                                    <span className={classes.arrow_4_left}></span>
                                    <span className={classes.arrow_4_right}></span>
                                </div>
                            </div>
                            <div
                                style={menuToken ?
                                    {opacity: 1, visibility: 'visible', height: '50px', marginBottom: '-15px'}
                                    :
                                    {}}
                                className={classes.subsection}
                            >
                                {allStore._isAdmin ?
                                    <button
                                        onClick={() => setState(10)}
                                        style={{background: '#4375f7', borderColor: '#4375f7', color: '#FFF'}}>
                                        Добавить
                                    </button>
                                    : ''}
                            </div>
                        </div>


                    </div>

                    {/*Данные*/}
                    <div className={classes.child_right}>
                        <div style={{
                            padding: '15px 0',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '24px',
                            textTransform: 'uppercase'
                        }}>
                            {dataTypeName[0].name}
                        </div>
                        <Data OneMessage={OneMessage} GetOneTask={GetOneTask} stateData={stateData} setStateData={setStateData} dataDb={dataDb} DeleteData={DeleteData} getDataForEditing={getDataForEditing}/>
                    </div>

                </div>

            </div>



            <Modals
                state={state} setState={setState}
                filePreview={filePreview} setFilePreview={setFilePreview}
                filePreviewIcon={filePreviewIcon} setFilePreviewIcon={setFilePreviewIcon}
                file={file} setFile={setFile} fileName={fileName} setFileName={setFileName}
                fileIcon={fileIcon} setFileIcon={setFileIcon}
                data={dataTypeName}
                dataInputs={dataInputs} setDataInputs={setDataInputs}
                nameChapter={nameChapter}

                addDataService={addDataService}
                addDataUser={addDataUser}
                addDataPrice={addDataPrice}
                addDataChapterDocuments={addDataChapterDocuments}
                addDataDocuments={addDataDocuments}
                addDataTechnology={addDataTechnology}
                addDataSlider={addDataSlider}
                addDataNews={addDataNews}

                addDataTask={addDataTask}
                addDataToken={addDataToken}
            />

            <EditModals
                edit={edit} setEdit={setEdit}
                dataEdit={dataEdit} setDataEdit={setDataEdit} SaveData={SaveData}
                fileIMG={fileIMG} setFileIMG={setFileIMG} SaveDataIMG={SaveDataIMG} filePreviewIMG={filePreviewIMG} setFilePreviewIMG={setFilePreviewIMG}
                fileIconEd={fileIconEd} setFileIconEd={setFileIconEd} filePreviewIconEd={filePreviewIconEd} setFilePreviewIconEd={setFilePreviewIconEd} SaveDataIcon={SaveDataIcon}/>



        </section>
    );
};

export default Admin;