import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneNews} from "../http/newsAPI";
import Loader from "../components/Link/loader";
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE, NEWS_ROUTE} from "../utils/const";
import {Helmet} from "react-helmet";
import {Translate} from "../hocks/translate";
import Feedback from "../components/Link/feedback";

const OneNews = () => {
    const navigate = useNavigate()
    const {title} = useParams()
    const {id} = useParams()

    const [dataNews, setDataNews] = useState({img: 'logo.png'})

    const [loader, setLoader] = useState(true)
    useEffect(() => {
        fetchOneNews(title, id).then(data => setDataNews(data)).finally(() => setLoader(true))
    }, [title, id])

    if (!loader) {
        return <Loader/>
    }
    return (
        <section className={classes.one_news}>
            <Helmet>
                <title>{dataNews.title}</title>
                <meta name="description" content={String(dataNews.description).slice(0, 70)}/>

                <meta property="og:title" content={dataNews.title}/>
                <meta property="og:description" content={String(dataNews.description).slice(0, 70)}/>
            </Helmet>

            <div className={classes.container}>
                <Navigation data={[
                    {name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1},
                    {name: 'Новости', href: NEWS_ROUTE, number: Date.now() * 1.2},
                    {name: dataNews.title, href: null, number: Date.now() * 1.3}
                ]}/>
            </div>


            <div className={classes.container}>
                <div className={classes.one_news_min_description}>
                    {dataNews.min_description}
                </div>
            </div>

                <div className={classes.one_news_img}>
                    <img alt={dataNews.title} src={process.env.REACT_APP_API_URL + dataNews.img}/>
                </div>

            <div className={classes.container}>
                <div className={classes.one_news_description}>
                    {/*{JSON.parse(JSON.stringify(dataNews.description)).map(d =>*/}
                    {/*    <div>{d}</div>*/}
                    {/*)}*/}
                    {dataNews.description}
                </div>
            </div>

            <Feedback/>

        </section>
    );
};

export default OneNews;