import React, {useEffect, useMemo, useState} from 'react';
import classes from "../css/index.module.scss";
import Navigation from "../components/Link/navigation";
import {MAIN_ROUTE, PRIVACY_ROUTE} from "../utils/const";
import Feedback from "../components/Link/feedback";
import {Switch} from "@mui/material";
import HideAndShows from "../hocks/hideAndShow";
import InputMask from 'react-input-mask';
import {Helmet} from "react-helmet";
import {fetchAmoCRMData, fetchAmoCRMToken, sendTelegram} from "../http/otherAPI";
import {ErrorOpen, FeedBackOpen, SuccessOpen} from "../hocks/hideShowFeedBack";
import Loader from "../components/Link/loader";
import navigation from "../components/Link/navigation";
import {useNavigate} from "react-router-dom";

const CostCalculation = () => {

    const navigate = useNavigate()

    const [loader, setLoader] = useState(false)
    const [dataForm, setDataForm] = useState([{
        typeOfCargo: '',
        cityLoad: '',
        cityUnload: '',
        weight: '',
        volume: '',
        temperature: 0,
        name: '',
        phone: ''
    }])

    const [switchTemperature, setSwitchTemperature] = useState(false)

    const [switchProducts, setSwitchProducts] = useState(false)
    const [switchMedic, setSwitchMedic] = useState(false)
    const [switchMaterials, setSwitchMaterials] = useState(false)
    const [switchOther, setSwitchOther] = useState(false)

    const [privacyCheckbox, setPrivacyCheckbox] = useState(true)

    useMemo(() => {
        if (switchProducts) {setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['typeOfCargo'] : 'Продукты питания'} : m))}
        if (switchMedic) {setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['typeOfCargo'] : 'Медикаменты'} : m))}
        if (switchMaterials) {setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['typeOfCargo'] : 'Стройматериалы'} : m))}
        if (switchOther) {setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['typeOfCargo'] : ''} : m))}
        if (!switchProducts && !switchMedic && !switchMaterials && !switchOther) {setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['typeOfCargo'] : ''} : m))}
    }, [switchProducts, switchMedic, switchMaterials, switchOther])
    useMemo(() => {
        if (!switchTemperature) {setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['temperature'] : 0} : m))}
    }, [switchTemperature])

    const TargetFocus = (id) => {
        document.getElementById(id).style = 'top: -20px; left: 0; font-size: 12px; color: #444;'
        if (id === 'label1' || id === 'label2') {
            document.getElementById('arrow_svg').style = 'opacity: 1; visibility: visible; height: 40px; margin-top: -25px; margin-bottom: 10px; transform: scale(1);'
        }
    }
    const TargetBlur = (id, value) => {
        if (id === 'label1' || id === 'label2') {document.getElementById('arrow_svg').style = 'opacity: 0; visibility: hidden; transform: scale(0.5);'}

        let styleLabel = document.getElementById(id)
        if (value !== '') {return false}
        else {styleLabel.style = 'top: 13px; left: 12px; font-size: 16px; color: #d8d8d8; height: 0; margin: 0 auto;'}
    }


    const SendToTelegram = () => {
        let border = document.querySelectorAll('input')
        // Проверка заполненности полей
        let bool = false
        Object.values(dataForm[0]).map(value => value !== '').filter(f => !f ? bool = true : '')

        // Проверка телефона
        let phoneVerify = false
        const successPhone = [dataForm[0].phone].map(m => m[4, 5, 6, 9, 10, 11, 13, 14, 16, 17] === '_' || m === '').filter(f => f === true ? phoneVerify = false : phoneVerify = true)

        if (!bool && phoneVerify) {
            setLoader(true)
            fetchAmoCRMToken().then(success => {
                fetchAmoCRMData(dataForm[0], 'CALCULATION').then(success => {
                    SuccessOpen(true)
                    document.body.style.overflow = 'hidden'
                    setDataForm([{
                        typeOfCargo: '',
                        cityLoad: '',
                        cityUnload: '',
                        weight: '',
                        volume: '',
                        temperature: 0,
                        name: '',
                        phone: ''
                    }])
                    for (let i = 0; i < 6; i++) {
                        border[i].style.border = 'solid 1px #d8d8d8'
                    }
                    for (let i = 1; i < 7; i++) {
                        document.getElementById('label' + [i]).style = 'top: 13px; left: 12px; font-size: 16px; color: #d8d8d8; height: 0; margin: 0 auto;'
                    }
                    setPrivacyCheckbox(false)
                }).catch(error => {
                    ErrorOpen(true)
                    document.body.style.overflow = 'hidden'})
            }).catch(error => console.log(error)).finally(() => setLoader(false))
            sendTelegram(dataForm[0], 'CALCULATION').then(data => console.log(data)).catch(error => console.log(error))
        } else {
            for (let i = 0; i < 6; i++) {
                if (border[i].value === '') {
                    border[i].style.border = 'solid 1px red'
                }
                else {
                    border[i].style.border = 'solid 1px #d8d8d8'
                }
            }
        }

    }


    if (loader) {
        return <Loader />
    }

    return (
        <section className={classes.page_calculations}>

            <Helmet>
                <title>Рассчет стоимости доставки груза</title>
                <meta name="description" content="Рассчитайте стоимость доставки груза из любого города"/>

                <meta property="og:title" content="Рассчет стоимости доставки груза"/>
                <meta property="og:description" content="Рассчитайте стоимость доставки груза из любого города"/>
            </Helmet>

            <div className={classes.container}>
                <Navigation data={[{name: 'Главная', href: MAIN_ROUTE, number: Date.now() * 1.1}, {name: 'Расчет стоимости', href: null, number: Date.now() * 1.2}]}/>
            </div>

            <div className={classes.container}>

                <div style={{marginBottom: '40px'}}>
                    Для расчета стоимости доставки необходимо заполнить параметры груза.
                </div>

                <div className={classes.page_calculations_grid}>

                    <div className={classes.page_calculations_child}>

                        <div className={classes.flex_space}>

                            <div style={{marginRight: '30px'}} className={classes.page_calculations_input}>
                                <input
                                    type={'name'}
                                    maxLength={30}
                                    value={dataForm[0].cityLoad}
                                    onChange={(e) => setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['cityLoad'] : e.target.value} : m))}
                                    onFocus={() => TargetFocus('label1', dataForm.cityLoad)}
                                    onBlur={(e) => TargetBlur('label1', e.target.value)}
                                />
                                <label id={'label1'}>Из города *</label>
                            </div>

                            <div className={classes.page_calculations_input}>
                                <input
                                    type={'name'}
                                    maxLength={30}
                                    value={dataForm[0].cityUnload}
                                    onChange={(e) => setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['cityUnload'] : e.target.value} : m))}
                                    onFocus={() => TargetFocus('label2', dataForm.cityUnload)}
                                    onBlur={(e) => TargetBlur('label2', e.target.value)}
                                />
                                <label id={'label2'}>В город *</label>
                            </div>

                        </div>


                        <div id={'arrow_svg'} className={classes.arrow_svg}>

                            <svg id="Слой_1" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219 4">
                                <line className={classes.str_cls_1} x1="2" y1="2" x2="216.02" y2="2"/>
                                <polygon className={classes.str_cls_2} points="214.61 3.85 215.4 2 214.61 0.15 219 2 214.61 3.85"/>
                                <circle className={classes.str_cls_2} cx="2" cy="2" r="2"/>
                            </svg>

                        </div>


                        <div className={classes.page_calculations_input}>
                            <input
                                type={'phone'}
                                maxLength={6}
                                value={dataForm[0].weight}
                                onChange={(e) => setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['weight'] : e.target.value.replace(/[^\d]/g,'') === '0' ? '' : e.target.value.replace(/[^\d]/g,'')} : m))}
                                onFocus={() => TargetFocus('label3')}
                                onBlur={(e) => TargetBlur('label3', e.target.value)}
                            />
                            <label id={'label3'}>Вес груза * в кг</label>
                        </div>

                        <div className={classes.page_calculations_input}>
                            <input
                                type={'phone'}
                                maxLength={6}
                                value={dataForm[0].volume}
                                onChange={(e) => setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['volume'] : e.target.value.replace(/[^\d]/g,'') === '0' ? '' : e.target.value.replace(/[^\d]/g,'')} : m))}
                                onFocus={() => TargetFocus('label4')}
                                onBlur={(e) => TargetBlur('label4', e.target.value)}
                            />
                            <label id={'label4'}>Объем груза * в м3</label>
                        </div>

                        <div className={classes.page_calculations_input}>
                            <input
                                type={'name'}
                                maxLength={30}
                                value={dataForm[0].name}
                                onChange={(e) => setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['name'] : e.target.value.replace(/[^a-zа-яё\s]/gi, '')} : m))}
                                onFocus={() => TargetFocus('label5')}
                                onBlur={(e) => TargetBlur('label5', e.target.value)}
                            />
                            <label id={'label5'}>Ваше имя *</label>
                        </div>

                        <div className={classes.page_calculations_input}>
                            <InputMask
                                mask="+7 (999) 999 99 99"
                                value={dataForm[0].phone}
                                onChange={(e) => setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['phone'] : e.target.value} : m))}
                                onFocus={() => TargetFocus('label6')}
                                onBlur={(e) => TargetBlur('label6', e.target.value)}
                            />
                            <label id={'label6'}>Ваш телефон *</label>
                        </div>

                    </div>


                    {/*Колонка справа*/}
                    <div className={classes.page_calculations_child}>

                        <div className={classes.page_calculations_temperature}>
                            <h3>
                                Температурный режим *
                            </h3>
                            <div>
                                <Switch
                                    checked={switchTemperature}
                                    onChange={() => HideAndShows(switchTemperature, setSwitchTemperature)}
                                />
                            </div>
                        </div>

                            <div
                                style={switchTemperature ? {opacity: '1', visibility: 'visible', transform: 'scale(1)', marginBottom: '30px', height: 'auto'} : {}}
                                className={classes.page_calculations_input_temperature}
                            >
                                <div style={{textAlign: 'center', marginBottom: '10px', fontSize: '12px'}}>от -20 до +20</div>

                                <div className={classes.page_calculations_flex}>
                                    <button onClick={() => setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['temperature'] : dataForm[0].temperature === -20 ? -20: dataForm[0].temperature - 1} : m))}>
                                        –
                                    </button>

                                    <div className={classes.temperature}>
                                        {dataForm[0].temperature}
                                    </div>

                                    <button onClick={() => setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['temperature'] : dataForm[0].temperature === 20 ? 20: dataForm[0].temperature + 1} : m))}>
                                        +
                                    </button>
                                </div>
                            </div>




                        {/*Тип груза*/}
                        <div className={classes.change_typeOf_cargo}>

                            <h3>
                                Какой тип груза вы планируете перевозить? *
                            </h3>

                            <div
                                style={!switchOther ? {opacity: '1', visibility: 'visible', transform: 'translateY(0)', marginBottom: '15px', height: 'auto'} : {opacity: '0', visibility: 'hidden', transform: 'translateY(100px)', marginBottom: '0', height: 0}}
                                className={classes.page_calculations_typeOf_cargo}
                            >
                                <div className={classes.type_cargo}>
                                    Продукты питания
                                </div>
                                <div>
                                    <Switch
                                        color="secondary"
                                        size="small"
                                        checked={switchProducts}
                                        onChange={() => {
                                            HideAndShows(switchProducts, setSwitchProducts)
                                            setSwitchMedic(false)
                                            setSwitchMaterials(false)
                                            setSwitchOther(false)
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                style={!switchOther ? {opacity: '1', visibility: 'visible', transform: 'translateY(0)', marginBottom: '15px', height: 'auto'} : {opacity: '0', visibility: 'hidden', transform: 'translateY(100px)', marginBottom: '0', height: 0}}
                                className={classes.page_calculations_typeOf_cargo}
                            >
                                <div className={classes.type_cargo}>
                                    Медикаменты
                                </div>
                                <div>
                                    <Switch
                                        color="secondary"
                                        size="small"
                                        checked={switchMedic}
                                        onChange={() => {
                                            HideAndShows(switchMedic, setSwitchMedic)
                                            setSwitchProducts(false)
                                            setSwitchMaterials(false)
                                            setSwitchOther(false)
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                style={!switchOther ? {opacity: '1', visibility: 'visible', transform: 'translateY(0)', marginBottom: '15px', height: 'auto'} : {opacity: '0', visibility: 'hidden', transform: 'translateY(100px)', marginBottom: '0', height: 0}}
                                className={classes.page_calculations_typeOf_cargo}
                            >
                                <div className={classes.type_cargo}>
                                    Стройматериалы
                                </div>
                                <div>
                                    <Switch
                                        color="secondary"
                                        size="small"
                                        checked={switchMaterials}
                                        onChange={() => {
                                            HideAndShows(switchMaterials, setSwitchMaterials)
                                            setSwitchProducts(false)
                                            setSwitchMedic(false)
                                            setSwitchOther(false)
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                style={switchOther ? {opacity: '1', visibility: 'visible', transform: 'translateY(0)', marginBottom: '15px'} : {}}
                                className={classes.page_calculations_typeOf_cargo}
                            >
                                <div className={classes.type_cargo}>
                                    Нет моего варианта
                                </div>
                                <div>
                                    <Switch
                                        color="secondary"
                                        size="small"
                                        checked={switchOther}
                                        onChange={() => {
                                            HideAndShows(switchOther, setSwitchOther)
                                            setSwitchProducts(false)
                                            setSwitchMedic(false)
                                            setSwitchMaterials(false)
                                        }}
                                    />
                                </div>
                            </div>

                            <div
                                style={switchOther ? {opacity: '1', visibility: 'visible', transform: 'translateY(0)', marginBottom: '15px', marginTop: '25px'} : {}}
                                className={classes.page_calculations_input_temperature}
                            >
                                <input
                                    value={dataForm[0].typeOfCargo}
                                    onChange={(e) => setDataForm(dataForm.map(m => m.cityLoad !== false ? {...m, ['typeOfCargo'] : e.target.value} : m))}
                                    onFocus={() => TargetFocus('label8')}
                                    onBlur={(e) => TargetBlur('label8', e.target.value)}
                                />
                                <label id={'label8'}>Тип груза</label>
                            </div>

                        </div>
                    </div>
                    {/*Тип груза*/}


                    {/*Кнопка*/}
                    <div className={classes.page_calculations_child}>
                        <button
                            disabled={!privacyCheckbox ? true : ''}
                            style={!privacyCheckbox ? {width: '100%', marginTop: '-30px', color: '#b6b6b7', background: '#f1f1f1'} : {width: '100%', marginTop: '-30px'}}
                            className={classes.button_black}
                            onClick={() => SendToTelegram()}
                        >
                            Узнать результат
                        </button>
                        <div className={classes.privacy_policy_checkbox}>
                            <div className={classes.flex_center}>
                                <input checked={privacyCheckbox} onChange={() => HideAndShows(privacyCheckbox, setPrivacyCheckbox)} type={"checkbox"}/>
                                <div className={classes.privacy_policy_text}>
                                    Нажимая на кнопку «Узнать результат», я даю своё согласие на <span onClick={() => {
                                    navigate(PRIVACY_ROUTE)
                                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                                }}>обработку персональных данных.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Кнопка*/}
                    {/*{!privacyCheckbox ? <div>Для отправки данных, нужно принят условия обработки персональных данных</div> : ''}*/}

                </div>
            </div>

            <Feedback />
        </section>
    );
};

export default CostCalculation;