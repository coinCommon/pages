import React, {useContext, useState} from 'react';
import classes from "../css/admin.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import HideAndShows from "../hocks/hideAndShow";
import {Context} from "../index";
import {ADMIN_ROUTE, AUTH_ROUTE} from "../utils/const";
import {useLocation, useNavigate} from "react-router-dom";
import {login} from "../http/userAPI";
import {Helmet} from "react-helmet";

const Auth = () => {
    const {allStore} = useContext(Context)
    const navigate = useNavigate()

    const location = useLocation()
    const isLogin = location.pathname === AUTH_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');


    // LOGOUT
    const [hidePassword, setHidePassword] = useState(false)
    const Focus = (id) => {
        document.getElementById(id).style = 'top: -20px; left: 0; font-size: 12px; color: #333;'
    }
    const Blur = (id, value) => {
        let styleLabel = document.getElementById(id)
        if (value !== '') {return false}
        else {styleLabel.style = 'top: 13px; left: 12px; font-size: 16px; color: #FFF; height: 0; margin: 0 auto;'}
    }
    // LOGOUT

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            }
            allStore.setUsers({id: data.id, name: data.name, email: data.email, role: data.role})
            allStore.setIsAuth(true)
            allStore.setIsAdmin(true)
            window.location.href = '/admin'
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <section className={classes.section_admin}>

            <Helmet>
                <title>Авторизация ТК Ювента</title>
                <meta name="description" content="Авторизация ТК Ювента"/>

                <meta property="og:title" content="Авторизация ТК Ювента"/>
                <meta property="og:description" content="Авторизация ТК Ювента"/>
            </Helmet>

            <div className={classes.container}>
            <div className={classes.form_entrance}>
                <div className={classes.display}>
                    <div className={classes.text}>
                        UVENTA
                    </div>
                    <div className={classes.inputs_label}>
                        <input
                            onFocus={() => Focus('login')}
                            onBlur={(e) => Blur('login', e.target.value)}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type={'email'}
                        />
                        <label id={'login'}>Логин</label>
                    </div>
                    <div className={classes.inputs_label}>
                        <input
                            onFocus={() => Focus('password')}
                            onBlur={(e) => Blur('password', e.target.value)}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={hidePassword ? 'text' : 'password'}
                        />
                        <label id={'password'}>Password</label>

                        {/*Показать \ скрыть пароль*/}
                        <div onClick={() => HideAndShows(hidePassword, setHidePassword)} className={classes.hide_password}>
                            {hidePassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                        </div>

                    </div>
                    <div>
                        <button onClick={() => click()} className={classes.button_noBack}>
                            Вход
                        </button>
                    </div>

                </div>
            </div>
            </div>

        </section>
    );
};

export default Auth;