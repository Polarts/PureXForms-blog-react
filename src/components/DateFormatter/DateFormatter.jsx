import React from 'react';
import moment from 'moment';
import styles from './DateFormatter.module.scss';

const DateFormatter = (props) => {
    return (
        <time dateTime={moment(props.date).format("YYYY-MM-DD")} 
              className={styles.date}>
            { moment(props.date).format("MMM Do, YYYY") }
        </time>
    )
}

export default DateFormatter;