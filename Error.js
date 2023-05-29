import React from 'react';
import classes from "../css/index.module.scss";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../utils/const";

const Error = () => {
    const navigate = useNavigate()
    return (
        <section className={classes.error}>
            <div className={classes.container}>

                <div className={classes.flex_center}>
                    <h2>
                        Упс... Такой страницы не существует(
                    </h2>
                </div>

                <div className={classes.flex_center}>
                    <p>
                        Пожалуйста, вернитесь на главную страницу.
                    </p>
                </div>

                <div className={classes.flex_center}>
                    <button
                        onClick={() => navigate(MAIN_ROUTE)}
                        className={classes.button_black}
                    >
                        На главную
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Error;