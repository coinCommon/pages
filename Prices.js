import React, {useContext, useEffect, useState} from 'react';
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE} from "../utils/const";
import Feedback from "../components/Link/feedback";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {fetchNews} from "../http/newsAPI";
import Loader from "../components/Link/loader";
import {fetchPrices} from "../http/pricesAPI";
import {Helmet} from "react-helmet";

const Prices = () => {
    const navigate = useNavigate()
    const {allStore} = useContext(Context)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        fetchPrices().then(data => allStore.setPrices(data.rows)).finally(() => setLoader(true))
    }, [])

    if (!loader) {
        return <Loader/>
    }
    return (
        <section className={classes.page_prices}>

            <Helmet>
                <title>Цены ТК Ювента</title>
                <meta name="description" content="Перевозки рефрижераторами 5-тонниками, Перевозки 2-тонниками, Перевозки 10-тонниками"/>

                <meta property="og:title" content="Цены ТК Ювента"/>
                <meta property="og:description" content="Перевозки рефрижераторами 5-тонниками, Перевозки 2-тонниками, Перевозки 10-тонниками"/>
            </Helmet>

            <div className={classes.container}>
                <Navigation data={[{name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1}, {name: 'Цены', href: null, number: Date.now() * 1.2}]}/>
            </div>

            <div className={classes.container}>

                <div className={classes.prices_grid}>

                    {allStore.getPrices.map(p =>
                        <div key={p.id} className={classes.prices_child}>
                            <div className={classes.prices_child_name}>
                                {p.title}
                            </div>
                            <div className={classes.prices_child_description}>
                                {p.description}
                            </div>
                            <div className={classes.prices_child_price}>
                                от {p.price} р
                            </div>
                        </div>
                    )}

                </div>

            </div>

            <Feedback/>
        </section>
    );
};

export default Prices;