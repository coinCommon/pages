import React, {useContext, useEffect, useState} from 'react';
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE, SERVICES_ROUTE} from "../utils/const";
import Feedback from "../components/Link/feedback";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import Loader from "../components/Link/loader";
import {fetchServices} from "../http/servicesAPI";
import {Translate} from "../hocks/translate";
import {Helmet} from "react-helmet";

const Services = () => {
    const navigate = useNavigate()
    const {allStore} = useContext(Context)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        fetchServices().then(data => allStore.setServices(data.rows)).finally(() => setLoader(true))
    }, [])

    if (!loader) {
        return <Loader/>
    }

    return (
        <section>

            <Helmet>
                <title>Услуги ТК Ювента</title>
                <meta name="description" content="Перевозка грузов, городские перевозки, междугородние перевозки, перевозки рефрижераторами"/>

                <meta property="og:title" content="Услуги ТК Ювента"/>
                <meta property="og:description" content="Перевозка грузов, городские перевозки, междугородние перевозки, перевозки рефрижераторами"/>
            </Helmet>

            <div className={classes.container}>
                <Navigation data={[{name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1}, {name: 'Услуги', href: null, number: Date.now() * 1.2}]}/>
            </div>

            <div className={classes.page_services}>
                <div className={classes.container}>

                    <div className={classes.page_services_grid}>

                        {allStore.getServices.map(s =>
                            <div key={s.id} onClick={() => navigate(SERVICES_ROUTE + '/' + Translate(s.title) + '/' + s.id)} className={classes.page_services_child}>
                                <div className={classes.page_services_title}>
                                    {s.title}
                                </div>
                                <div className={classes.page_services_img}>
                                    <img
                                        onDragStart={(e) => e.preventDefault()}
                                        alt={s.title}
                                        src={process.env.REACT_APP_API_URL + s.icon}
                                    />
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>

            <Feedback/>
        </section>
    );
};

export default Services;