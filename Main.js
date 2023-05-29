import React, {useContext, useEffect, useMemo, useState} from 'react';
import classes from "../css/index.module.scss";
import AboutCarousel from "../components/Main/AboutCarousel";
import NewsCarousel from "../components/Main/NewsCarousel";
import MainCarousel from "../components/Main/MainCarousel";
import Loader from "../components/Link/loader";
import Feedback from "../components/Link/feedback";
import {
    ABOUT_ROUTE,
    CALCULATION_ROUTE,
    DOCUMENTS_ROUTE,
    PRICES_ROUTE, REVIEWS_ROUTE,
    SERVICES_ROUTE
} from "../utils/const";
import {useNavigate} from "react-router-dom";
import {fetchSliders} from "../http/slidersAPI";
import {Context} from "../index";
import {fetchServices} from "../http/servicesAPI";
import {fetchNews} from "../http/newsAPI";
import {Translate} from "../hocks/translate";
import {Helmet} from "react-helmet";
import {FeedBackOpen} from "../hocks/hideShowFeedBack";


const Main = () => {
    const navigate = useNavigate()
    const {allStore} = useContext(Context)

    // Получаем индех слайда
    const [mainSlideTitle, setMainSlideTitle] = useState(0)
    const [titleSlide, setTitleSlide] = useState([])



    const [loader, setLoader] = useState(false)

    useEffect(() => {
        fetchSliders().then(data => {
            allStore.setSliders(data.rows)
            setTitleSlide(data.rows)
        }).finally(() =>fetchServices(null, 3).then(data => allStore.setServices(data.rows))
            .finally(() => fetchNews(null, 4).then(data => allStore.setNews(data.rows))
                    .finally(() => {
                        setLoader(true)
                    })))
    }, [])





    if (!loader) {
        return <Loader/>
    }

    return (
        <div className={classes.main_gl}>

            <Helmet>
                <title>Грузоперевозки по всей России от транспортной компании Ювента</title>
                <meta name="description" content="Цены ниже на 20% рынка. Пропуска по МКАД и ТТК на всех автомобилях, доставка до двери склада или магазина. Осуществляем грузовые перевозки от 50 килограммов. Имеются холодильные установки и печки."/>

                <meta property="og:title" content="Грузоперевозки по всей России от транспортной компании Ювента"/>
                <meta property="og:description" content="Цены ниже на 20% рынка. Пропуска по МКАД и ТТК на всех автомобилях, доставка до двери склада или магазина. Осуществляем грузовые перевозки от 50 килограммов. Имеются холодильные установки и печки."/>
            </Helmet>

            <section className={classes.main}>
               <div className={classes.main_grid}>
                    <div className={classes.left}>

                        {/*Слайдер текст*/}
                        <div className={classes.slide_offer}>
                            <div className={classes.title}>
                                {titleSlide.length !== 0 ? titleSlide[mainSlideTitle].title : ''}
                            </div>
                            <div className={classes.description}>
                                {titleSlide.length !== 0 ? titleSlide[mainSlideTitle].description : ''}
                            </div>

                            <div className={classes.buttons}>
                                <button onClick={() => FeedBackOpen(true)} className={classes.button_blue}>
                                    Оставить заявку
                                </button>
                                <button onClick={() => {
                                    navigate(CALCULATION_ROUTE)
                                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                                }} className={classes.button_noBack}>
                                    Рассчитать стоимость
                                </button>
                            </div>
                        </div>

                    </div>


                   {/*Слайдер картинка*/}
                   <div className={classes.right}>

                       <MainCarousel data={allStore.getSliders} setMainSlideTitle={setMainSlideTitle}/>

                   </div>

               </div>


                {/*Баннер снизу*/}
                <div className={classes.banner}>
                    <div onClick={() => {
                        navigate(PRICES_ROUTE)
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                    }} className={classes.child}>

                        <div className="icon">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path
                                        d="M25.4999 9.91667H29.7499C30.1256 9.91667 30.486 10.0659 30.7517 10.3316C31.0173 10.5973 31.1666 10.9576 31.1666 11.3333V28.3333C31.1666 28.7091 31.0173 29.0694 30.7517 29.3351C30.486 29.6007 30.1256 29.75 29.7499 29.75H4.24992C3.8742 29.75 3.51386 29.6007 3.24818 29.3351C2.98251 29.0694 2.83325 28.7091 2.83325 28.3333V5.66667C2.83325 5.29094 2.98251 4.93061 3.24818 4.66493C3.51386 4.39926 3.8742 4.25 4.24992 4.25H25.4999V9.91667ZM5.66659 12.75V26.9167H28.3333V12.75H5.66659ZM5.66659 7.08333V9.91667H22.6666V7.08333H5.66659ZM21.2499 18.4167H25.4999V21.25H21.2499V18.4167Z"
                                        fill="#414141"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_346_2851">
                                        <rect width="34" height="34" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        Цены
                    </div>
                    <div onClick={() => {
                        navigate(CALCULATION_ROUTE)
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                    }} className={classes.child}>

                        <div className="icon">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path
                                        d="M24.0833 4.24996H29.7499C30.1256 4.24996 30.486 4.39921 30.7517 4.66489C31.0173 4.93057 31.1666 5.2909 31.1666 5.66663V28.3333C31.1666 28.709 31.0173 29.0694 30.7517 29.335C30.486 29.6007 30.1256 29.75 29.7499 29.75H4.24992C3.8742 29.75 3.51386 29.6007 3.24818 29.335C2.98251 29.0694 2.83325 28.709 2.83325 28.3333V5.66663C2.83325 5.2909 2.98251 4.93057 3.24818 4.66489C3.51386 4.39921 3.8742 4.24996 4.24992 4.24996H9.91659V1.41663H12.7499V4.24996H21.2499V1.41663H24.0833V4.24996ZM21.2499 7.08329H12.7499V9.91663H9.91659V7.08329H5.66659V12.75H28.3333V7.08329H24.0833V9.91663H21.2499V7.08329ZM28.3333 15.5833H5.66659V26.9166H28.3333V15.5833ZM8.49992 19.8333H11.3333V22.6666H8.49992V19.8333ZM14.1666 19.8333H25.4999V22.6666H14.1666V19.8333Z"
                                        fill="#414141"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_346_2867">
                                        <rect width="34" height="34" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        Рассчет стоимости
                    </div>
                    <div onClick={() => {
                        navigate(DOCUMENTS_ROUTE)
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                    }} className={classes.child}>

                        <div className="icon">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path
                                        d="M24.0833 2.83337V5.66671H28.3432C29.1196 5.66671 29.75 6.29712 29.75 7.07346V29.76C29.75 30.5363 29.1196 31.1667 28.3432 31.1667H5.65675C4.88042 31.1667 4.25 30.5363 4.25 29.76V7.07346C4.25 6.29712 4.88042 5.66671 5.65675 5.66671H9.91667V2.83337H24.0833ZM9.91667 8.50004H7.08333V28.3334H26.9167V8.50004H24.0833V11.3334H9.91667V8.50004ZM12.75 22.6667V25.5H9.91667V22.6667H12.75ZM12.75 18.4167V21.25H9.91667V18.4167H12.75ZM12.75 14.1667V17H9.91667V14.1667H12.75ZM21.25 5.66671H12.75V8.50004H21.25V5.66671Z"
                                        fill="#414141"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_346_2859">
                                        <rect width="34" height="34" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        Документы
                    </div>
                    <div onClick={() => {
                        navigate(REVIEWS_ROUTE)
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                    }} className={classes.child}>

                        <div className="icon">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path
                                        d="M7.72788 21.25L1.41663 26.2084V4.25004C1.41663 3.87432 1.56588 3.51398 1.83156 3.24831C2.09723 2.98263 2.45757 2.83337 2.83329 2.83337H24.0833C24.459 2.83337 24.8194 2.98263 25.085 3.24831C25.3507 3.51398 25.5 3.87432 25.5 4.25004V21.25H7.72788ZM6.74754 18.4167H22.6666V5.66671H4.24996V20.3788L6.74754 18.4167ZM11.3333 24.0834H25.8357L28.3333 26.0455V11.3334H29.75C30.1257 11.3334 30.486 11.4826 30.7517 11.7483C31.0174 12.014 31.1666 12.3743 31.1666 12.75V31.875L24.8554 26.9167H12.75C12.3742 26.9167 12.0139 26.7675 11.7482 26.5018C11.4825 26.2361 11.3333 25.8758 11.3333 25.5V24.0834Z"
                                        fill="#414141"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_346_2891">
                                        <rect width="34" height="34" fill="white"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        Отзывы
                    </div>
                </div>
            </section>

        {/*Наши услуги*/}
        <section className={classes.services}>
            <div className={classes.container}>
                <h2>Наши услуги</h2>

                <div className={classes.grid_3}>

                    {allStore.getServices.map(m =>
                        <div key={m.id} onClick={() => {
                            navigate(SERVICES_ROUTE + '/' + Translate(m.title) + '/' + m.id)
                            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                        }} className={classes.service}>
                            <div className={classes.title}>
                                {m.title}
                            </div>
                            <div className={classes.services_item_name_icon}>
                                <img
                                    onDragStart={(e) => e.preventDefault()}
                                    alt={m.title}
                                    src={process.env.REACT_APP_API_URL + m.icon}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <button onClick={() => {
                    navigate(SERVICES_ROUTE)
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                }} style={{margin: '30px auto 0 auto'}} className={classes.button_black}>Смотреть еще</button>

            </div>
        </section>


            {/*О нас*/}
            <section className={classes.about}>

                <div className={classes.about_black}>
                    <div className={classes.container}>
                        <div className={classes.about_left}>
                            <h2>Немного о нас</h2>
                            <div className={classes.description}>
                                Отслеживайте, контролируйте и сохраняйте ваш груз, на всех этапах доставки.
                            </div>
                            <div className={classes.grid_cells}>
                                <div className={classes.cell}>
                                    <div>
                                        <span>>808</span>
                                        <div>довольных клиентов</div>
                                    </div>
                                </div>
                                <div className={classes.cell}>
                                    <div>
                                        <span>5656</span>
                                        <div>перевезли тонн</div>
                                    </div>
                                </div>
                                <div className={classes.cell}>
                                    <div>
                                        <span></span>
                                        <div>Перевозка грузов по всей стране и ближнем зарубежье</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <AboutCarousel/>

                <div className={classes.about_white}>
                    <div className={classes.container}>
                        <div className={classes.about_bottom}>
                            <div className={classes.flex_start}>
                                <button onClick={() => {
                                    navigate(ABOUT_ROUTE)
                                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                                }} className={classes.button_black}>Подробнее</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


            <section className={classes.news}>
                <div className={classes.container}>
                    <div className={classes.news_title_flex}>
                        <h2>
                            Новости
                        </h2>
                    </div>
                </div>

                    <div className={classes.news_slider}>
                        <div style={window.innerWidth > 924 ? {marginLeft: (window.innerWidth - 1220) / 2 + 'px'} : {}} className={classes.container_news_slider}>
                            <div className={classes.slider}>
                                <NewsCarousel data={allStore.getNews}/>
                            </div>
                        </div>
                    </div>
            </section>

            <Feedback/>

    </div>
    );
};

export default Main;