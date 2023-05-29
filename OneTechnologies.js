import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneServices} from "../http/servicesAPI";
import Loader from "../components/Link/loader";
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE, SERVICES_ROUTE, TECHNOLOGIES_ROUTE} from "../utils/const";
import {fetchOneTechnologies} from "../http/technologiesAPI";
import {Helmet} from "react-helmet";
import Feedback from "../components/Link/feedback";

const OneTechnologies = () => {
    const navigate = useNavigate()
    const {title} = useParams()
    const {id} = useParams()

    const [dataTechnology, setDataTechnology] = useState({img: 'logo.png'})

    const [loader, setLoader] = useState(true)
    useEffect(() => {
        fetchOneTechnologies(title, id).then(data => setDataTechnology(data)).finally(() => setLoader(true))
    }, [title, id])



    if (!loader) {
        return <Loader/>
    }

    return (
        <section className={classes.one_news}>

            <Helmet>
                <title>{dataTechnology.title}</title>
                <meta name="description" content={dataTechnology.description}/>

                <meta property="og:title" content={dataTechnology.title}/>
                <meta property="og:description" content={String(dataTechnology.description).slice(0, 70)}/>
            </Helmet>

            <div className={classes.container}>
                <Navigation data={[
                    {name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1},
                    {name: 'Технологии', href: TECHNOLOGIES_ROUTE, number: Date.now() * 1.2},
                    {name: dataTechnology.title, href: null, number: Date.now() * 1.3}
                ]}/>
            </div>



            <div className={classes.one_news_img}>
                <img alt={dataTechnology.title} src={process.env.REACT_APP_API_URL + dataTechnology.img}/>
            </div>

            <div className={classes.container}>
                <div className={classes.one_news_description}>
                    {dataTechnology.description}
                </div>
            </div>

            <Feedback/>

        </section>
    );
};

export default OneTechnologies;