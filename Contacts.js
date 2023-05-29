import React from 'react';
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE} from "../utils/const";
import {Helmet} from "react-helmet";

const Contacts = () => {
    return (
        <section className={classes.contacts}>

            <Helmet>
                <title>Контакты транспортной компании Ювента</title>
                <meta name="description" content="г. Саранск, переулок Кириллова, 2б, офис 514"/>

                <meta property="og:title" content="Контакты транспортной компании Ювента"/>
                <meta property="og:description" content="г. Саранск, переулок Кириллова, 2б, офис 514"/>
            </Helmet>

            <div className={classes.container}>

                <Navigation data={[{name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1}, {name: 'Контакты', href: null, number: Date.now() * 1.2}]}/>

                <div className={classes.contacts_grid}>

                    <div className={classes.child}>

                        <p>Телефон и мессенжеры</p>

                        <div>
                            <a href={'tel:+79603368800'}>+7 (960) 336-88-00</a>
                        </div>

                        <div className={classes.messengers_icons}>
                            <div onClick={() => window.open('https://t.me/+79603368800')} className={classes.messenger_icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                    <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"/>
                                </svg>
                            </div>
                            <div onClick={() => window.open('https://wa.me/79603368800?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!')} className={classes.messenger_icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                </svg>
                            </div>
                        </div>

                    </div>


                    <div className={classes.child}>
                        <p>Адрес офиса и время работы</p>
                        <div style={{marginBottom: '5px'}} className={classes.text}>
                            ПН-ПТ 08:30-17:30
                        </div>
                        <div className={classes.text}>
                            430004, г. Саранск, переулок Кириллова, 2б, офис 514
                        </div>
                    </div>

                    <div className={classes.child}>
                        <button onClick={() => window.open('https://yandex.ru/profile/-/CCU0V6VBCC')} className={classes.button_black}>Проложить маршрут</button>
                    </div>

                </div>
            </div>

            <div className={classes.container}>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A3b89eb087eaa86523d1f9ca075f2dbdcdb5503b7aa09a239664ae8655a2c3289&amp;source=constructor"
                    width="100%" height="426" frameBorder="0">
                </iframe>
            </div>

            {/*<div style={{position:'relative',overflow:'hidden'}}><a*/}
            {/*    href="https://yandex.ru/maps/org/tk_yuventa/6866410167/?utm_medium=mapframe&utm_source=maps"*/}
            {/*    style={{color:'#eee',fontSize:'12px',position:'absolute',top:'0px'}}>ТК Ювента</a><a*/}
            {/*    href="https://yandex.ru/maps/42/saransk/category/haulage/184108175/?utm_medium=mapframe&utm_source=maps"*/}
            {/*    style={{color:'#eee',fontSize:'12px',position:'absolute',top:'14px'}}>Автомобильные грузоперевозки в*/}
            {/*    Саранске</a><a*/}
            {/*    href="https://yandex.ru/maps/42/saransk/category/logistics_company/184108185/?utm_medium=mapframe&utm_source=maps"*/}
            {/*    style={{color:'#eee', fontSize:'12px', position:'absolute', top:'28px',}}>Логистическая компания в Саранске</a>*/}
            {/*    <iframe src="https://yandex.ru/map-widget/v1/org/tk_yuventa/6866410167/?ll=45.176330%2C54.172283&z=16"*/}
            {/*            width="560" height="400" frameBorder="1" allowFullScreen="true"*/}
            {/*            style={{position:'relative'}}></iframe>*/}
            {/*</div>*/}

        </section>
    );
};

export default Contacts;