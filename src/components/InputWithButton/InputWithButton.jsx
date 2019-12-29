import React from 'react';
import styles from './InputWithButton.module.scss';

/**
 * A single-line input form that consists of one field and a submit button.
 * @param {String} props.placeholder A placeholder text for the input.
 * @param {String} props.type The input type, should always be a textual input. 
 * @param {*} props.buttonContent Anything you'd like the button to display. Can be text or JSX.
 * @param {Function} props.textChanged A text change callback.
 * @param {Function} props.onSubmit A submission callback.
 */
const InputWithButton = (props) => {
    return (
        <div className={styles.singleLineForm}>
            <input 
                type={props.type} 
                onChange={props.textChanged} 
                placeholder={props.placeholder}
            />
            <button onClick={props.onSubmit}>
                {props.buttonContent}
            </button>
        </div>
    );
}

export default InputWithButton;