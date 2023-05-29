import React, {useContext, useEffect, useState} from 'react';
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE, NEWS_ROUTE} from "../utils/const";
import Feedback from "../components/Link/feedback";
import {fetchSliders} from "../http/slidersAPI";
import {fetchServices} from "../http/servicesAPI";
import {fetchNews} from "../http/newsAPI";
import Loader from "../components/Link/loader";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import dateFormat from "dateformat";
import {Translate} from "../hocks/translate";
import {Helmet} from "react-helmet";

const News = () => {
    const navigate = useNavigate()
    const {allStore} = useContext(Context)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        fetchNews().then(data => allStore.setNews(data.rows)).finally(() => setLoader(true))
    }, [])

    if (!loader) {
        return <Loader/>
    }

    return (
        <section className={classes.page_news}>
            <Helmet>
                <title>Новости ТК Ювента</title>
                <meta name="description" content="Новости Транспортной компании Ювента"/>

                <meta property="og:title" content="Новости ТК Ювента"/>
                <meta property="og:description" content="Новости Транспортной компании Ювента"/>
            </Helmet>

            <div className={classes.container}>
                <Navigation data={[{name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1}, {name: 'Новости', href: null, number: Date.now() * 1.2}]}/>
            </div>

            <div className={classes.container}>

                <div className={classes.page_news_grid}>

                    {allStore.getNews.map(n =>
                        <div key={n.id} onClick={() => navigate(NEWS_ROUTE + '/' + Translate(n.title) + '/' + n.id)} className={classes.page_news_content}>
                            <div>
                                <p className={classes.page_news_date}>
                                    {dateFormat(n.createdAt, "dd mmmm yyyy")}
                                </p>
                                <div className={classes.page_news_title}>
                                    {n.title}
                                </div>
                                <div className={classes.page_news_description}>
                                    {n.description}
                                </div>

                                <div className={classes.page_news_arrow}>
                                    <svg viewBox="0 0 52 50" fill="none">
                                        <path
                                            d="M29.8244 24.0833L24.9074 19.1663L26.2036 17.8701L33.3334 25L26.2036 32.1298L24.9074 30.8336L29.8244 25.9166H18.6667V24.0833H29.8244Z"
                                            fill="#09121F"></path>
                                        <rect x="0.5" y="0.5" width="51" height="49" rx="24.5" stroke="black"></rect>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}

                    {/*<div className={classes.page_news_content}>*/}
                    {/*    <div>*/}
                    {/*        <p className={classes.page_news_date}>*/}
                    {/*            1 апреля 2023*/}
                    {/*        </p>*/}
                    {/*        <div className={classes.page_news_title}>*/}
                    {/*            В Ненецком автономном округе движение грузовиков ограничат на четырех дорогах*/}
                    {/*        </div>*/}
                    {/*        <div className={classes.page_news_description}>*/}
                    {/*            В Ненецком автономном округе (НАО) под традиционную «просушку» подпадут только четыре региональные дороги, сообщили в окружном Департаменте строительства, ЖКХ, энергетики и транспорта. Проезд по ним грузовых автомобилей ограничат с 1-го мая по 14-е июня.*/}
                    {/*        </div>*/}

                    {/*        <div className={classes.page_news_arrow}>*/}
                    {/*            <svg viewBox="0 0 52 50" fill="none">*/}
                    {/*                <path*/}
                    {/*                    d="M29.8244 24.0833L24.9074 19.1663L26.2036 17.8701L33.3334 25L26.2036 32.1298L24.9074 30.8336L29.8244 25.9166H18.6667V24.0833H29.8244Z"*/}
                    {/*                    fill="#09121F"></path>*/}
                    {/*                <rect x="0.5" y="0.5" width="51" height="49" rx="24.5" stroke="black"></rect>*/}
                    {/*            </svg>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={classes.page_news_content}>*/}
                    {/*    <div>*/}
                    {/*        <p className={classes.page_news_date}>*/}
                    {/*            1 апреля 2023*/}
                    {/*        </p>*/}
                    {/*        <div className={classes.page_news_title}>*/}
                    {/*            В Ненецком автономном округе движение грузовиков ограничат на четырех дорогах*/}
                    {/*        </div>*/}
                    {/*        <div className={classes.page_news_description}>*/}
                    {/*            В Ненецком автономном округе (НАО) под традиционную «просушку» подпадут только четыре региональные дороги, сообщили в окружном Департаменте строительства, ЖКХ, энергетики и транспорта. Проезд по ним грузовых автомобилей ограничат с 1-го мая по 14-е июня.*/}
                    {/*        </div>*/}

                    {/*        <div className={classes.page_news_arrow}>*/}
                    {/*            <svg viewBox="0 0 52 50" fill="none">*/}
                    {/*                <path*/}
                    {/*                    d="M29.8244 24.0833L24.9074 19.1663L26.2036 17.8701L33.3334 25L26.2036 32.1298L24.9074 30.8336L29.8244 25.9166H18.6667V24.0833H29.8244Z"*/}
                    {/*                    fill="#09121F"></path>*/}
                    {/*                <rect x="0.5" y="0.5" width="51" height="49" rx="24.5" stroke="black"></rect>*/}
                    {/*            </svg>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={classes.page_news_content}>*/}
                    {/*    <div>*/}
                    {/*        <p className={classes.page_news_date}>*/}
                    {/*            1 апреля 2023*/}
                    {/*        </p>*/}
                    {/*        <div className={classes.page_news_title}>*/}
                    {/*            В Ненецком автономном округе движение грузовиков ограничат на четырех дорогах*/}
                    {/*        </div>*/}
                    {/*        <div className={classes.page_news_description}>*/}
                    {/*            В Ненецком автономном округе (НАО) под традиционную «просушку» подпадут только четыре региональные дороги, сообщили в окружном Департаменте строительства, ЖКХ, энергетики и транспорта. Проезд по ним грузовых автомобилей ограничат с 1-го мая по 14-е июня.*/}
                    {/*        </div>*/}

                    {/*        <div className={classes.page_news_arrow}>*/}
                    {/*            <svg viewBox="0 0 52 50" fill="none">*/}
                    {/*                <path*/}
                    {/*                    d="M29.8244 24.0833L24.9074 19.1663L26.2036 17.8701L33.3334 25L26.2036 32.1298L24.9074 30.8336L29.8244 25.9166H18.6667V24.0833H29.8244Z"*/}
                    {/*                    fill="#09121F"></path>*/}
                    {/*                <rect x="0.5" y="0.5" width="51" height="49" rx="24.5" stroke="black"></rect>*/}
                    {/*            </svg>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                </div>

            </div>

            <Feedback/>
        </section>
    );
};

export default News;