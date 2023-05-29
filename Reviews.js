import React from 'react';
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE} from "../utils/const";
import Feedback from "../components/Link/feedback";
import {Helmet} from "react-helmet";

const Reviews = () => {
    return (
        <section className={classes.reviews}>

            <Helmet>
                <title>Отзывы о ТК Ювента</title>
                <meta name="description" content="Оставьте свой отзыв о транспортной компании Ювента"/>

                <meta property="og:title" content="Отзывы о ТК Ювента"/>
                <meta property="og:description" content="Оставьте свой отзыв о транспортной компании Ювента"/>
            </Helmet>

            <div className={classes.container}>
                <Navigation data={[{name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1}, {name: 'Отзывы', href: null, number: Date.now() * 1.2}]}/>
            </div>

            <div className={classes.container}>

                <div className={classes.reviews_grid}>

                    <div className={classes.reviews_child}>

                        <h3>
                            Ваше мнение очень важно для нас
                        </h3>

                        {/*<marquee bgcolor={'#4375f7'} scrollamount="0" loop={'-1'} direction={'left'}>*/}
                        {/*    <h3 style={{color: '#FFF'}}>*/}
                        {/*        ваше мнение*/}
                        {/*    </h3>*/}
                        {/*</marquee>*/}
                        {/*<marquee bgcolor={'#444'} scrollamount="0" loop={'-1'} direction={'right'}>*/}
                        {/*    <h3 style={{color: '#FFF'}}>*/}
                        {/*        очень важно для нас*/}
                        {/*    </h3>*/}
                        {/*</marquee>*/}
                    </div>

                    <div className={classes.reviews_child}>
                        <div className={classes.reviews_child_flex}>
                            <div style={{
                                padding: '0',
                                width: '100%',
                                maxWidth:'700px',
                                height:'800px',
                                overflow:'hidden',
                                position:'relative'}}>
                                <iframe
                                    style={{
                                        width:'100%',
                                        height:'100%',
                                        border:'1px solid #e6e6e6',
                                        borderRadius:'8px',
                                        boxSizing:'border-box'}} src="https://yandex.ru/maps-reviews-widget/6866410167?comments">
                                </iframe>
                                <a href="https://yandex.ru/maps/org/tk_yuventa/6866410167/" target="_blank"
                                   style={{
                                       boxSizing:'border-box',
                                       textDecoration:'none',
                                       color:'#b3b3b3',
                                       fontSize:'10px',
                                       fontFamily:'YS Text,sans-serif',
                                       padding:'0 20px',
                                       position:'absolute',
                                       bottom:'20px',
                                       width:'100%',
                                       textAlign:'center',
                                       left:'0',
                                       overflow:'hidden',
                                       textOverflow:'ellipsis',
                                       display:'block',
                                       maxHeight:'14px',
                                       whiteSpace:'nowrap'}}>
                                    ТК Ювента на карте Саранска — Яндекс Карты
                                </a>
                            </div>
                        </div>
                    </div>


                </div>




            </div>


            <Feedback/>
        </section>
    );
};

export default Reviews;