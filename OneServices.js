import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../components/Link/loader";
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE, SERVICES_ROUTE} from "../utils/const";
import {fetchOneServices} from "../http/servicesAPI";
import {Helmet} from "react-helmet";
import Feedback from "../components/Link/feedback";

const OneServices = () => {
    const navigate = useNavigate()
    const {title} = useParams()
    const {id} = useParams()

    const [dataServices, setDataServices] = useState({img: 'logo.png'})

    const [loader, setLoader] = useState(true)
    useEffect(() => {
        fetchOneServices(title, id).then(data => setDataServices(data)).finally(() => setLoader(true))
    }, [title, id])



    if (!loader) {
        return <Loader/>
    }

    return (
        <section className={classes.one_news}>

            <Helmet>
                <title>{dataServices.title}</title>
                <meta name="description" content={dataServices.description}/>

                <meta property="og:title" content={dataServices.title}/>
                <meta property="og:description" content={String(dataServices.description).slice(0, 70)}/>
            </Helmet>

            <div className={classes.container}>
                <Navigation data={[
                    {name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1},
                    {name: 'Услуги', href: SERVICES_ROUTE, number: Date.now() * 1.2},
                    {name: dataServices.title, href: null, number: Date.now() * 1.3}
                ]}/>
            </div>



            <div className={classes.one_news_img}>
                <img alt={dataServices.title} src={process.env.REACT_APP_API_URL + dataServices.img}/>
            </div>

            <div className={classes.container}>
                <div className={classes.one_news_description}>
                    {dataServices.description}
                </div>
            </div>

            <Feedback/>

        </section>
    );

};

export default OneServices;