import React, {useContext, useEffect, useState} from 'react';
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE, TECHNOLOGIES_ROUTE} from "../utils/const";
import Feedback from "../components/Link/feedback";
import {Context} from "../index";
import {fetchChapterDocuments} from "../http/chapterDocumentsAPI";
import {fetchDocuments} from "../http/documentsAPI";
import Loader from "../components/Link/loader";
import {fetchTechnologies} from "../http/technologiesAPI";
import {useNavigate} from "react-router-dom";
import {Translate} from "../hocks/translate";
import {Helmet} from "react-helmet";

const Technologies = () => {
    const {allStore} = useContext(Context)
    const navigate = useNavigate()

    const [loader, setLoader] = useState(false)
    useEffect(() => {
        fetchTechnologies().then(data => allStore.setTechnologies(data.rows)).finally(() => setLoader(true))
    }, [])

    if (!loader) {
        return <Loader/>
    }
    return (
        <section className={classes.page_technology}>

            <Helmet>
                <title>Технологии ТК Ювента</title>
                <meta name="description" content="Технологии ТК Ювента, Грузоперевозки по всей России от транспортной компании Ювента"/>

                <meta property="og:title" content="Технологии ТК Ювента"/>
                <meta property="og:description" content="Технологии ТК Ювента, Грузоперевозки по всей России от транспортной компании Ювента"/>
            </Helmet>

            <div className={classes.container}>
                <Navigation data={[{name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1}, {name: 'Технологии', href: null, number: Date.now() * 1.2}]}/>
            </div>

            <div className={classes.container}>

                <div className={classes.technology_grid}>
                    {allStore.getTechnologies.map(t =>
                        <div
                            key={t.id}
                            className={classes.technology_child}
                            onClick={() => navigate(TECHNOLOGIES_ROUTE + '/' + Translate(t.title) + '/' + t.id)}
                        >
                            <div className={classes.technology_child_flex}>
                                <div className={classes.technology_child_block}>
                                    <div className={classes.technology_child_title}>
                                        {t.title}
                                    </div>
                                    <div className={classes.technology_child_description}>
                                        {t.description}
                                    </div>
                                </div>

                                <div className={classes.technology_child_img}>
                                    <img alt={t.title} src={process.env.REACT_APP_API_URL + t.img}/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>


            <Feedback/>
        </section>
    );
};

export default Technologies;