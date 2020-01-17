import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import styles from './SloganRandomizer.module.scss';

const slogans = [
    {
        title: "Xamarin.Forms, <b>as it should be.</b>",
        subtitle: "A blog about making awesome Xamarin UI!"
    },
    {
        title: "Everything <b>Xamarin.Forms</b> and more...",
        subtitle: "Learn best practices in XAML, C#, mobile and desktop UI."
    },
    {
        title: "<b>Xamarin.Forms</b> simplified.",
        subtitle: "Develop Xamarin UI with little to no effort."
    },
]

const SloganRandomizer = () => {

    const [slogan, setSlogan] = useState(slogans[0]);

    useEffect(() => setSlogan(slogans[Math.floor(Math.random() * slogans.length)]), [])

    return (
        <div className={styles.container}>
            <h2>{ReactHtmlParser(slogan.title)}</h2>
            <h3>{ReactHtmlParser(slogan.subtitle)}</h3>
        </div>
    )
}

export default SloganRandomizer;