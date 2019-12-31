import React, { useRef, useEffect } from 'react';
import styles from './SingleLineForm.module.scss';

/**
 * A single-line input form that consists of one field and a submit button.
 * @param {String} placeholder A placeholder text for the input.
 * @param {String} type The input type, should always be a textual input. 
 * @param {*} buttonContent Anything you'd like the button to display. Can be text or JSX.
 * @param {Function} textChanged A text change callback. Must take a string parameter!
 * @param {Function} onSubmit A submission callback. Must take a string parameter!
 */
const SingleLineForm = (props) => {

    var inputRef = useRef(null);

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.addEventListener('keyup', event => {
                if(event.keyCode === 13 
                    && props.hasOwnProperty("onSubmit")) {
                    props.onSubmit(inputRef.current.value);
                }
            });
        }
    }, [props, inputRef]);

    const textChanged = (e) => {
        if (props.hasOwnProperty("textChanged")) {
            props.textChanged(e.target.value);
        }
    }

    const onSubmit = (e) => {
        if (inputRef.current
            && props.hasOwnProperty("onSubmit")) {
                props.onSubmit(inputRef.current.value)
        }
    }

    return (
        <div className={styles.singleLineForm}>
            <input 
                type={props.type} 
                onChange={textChanged} 
                placeholder={props.placeholder}
                ref={inputRef}
            />
            <button onClick={onSubmit}>
                {props.buttonContent}
            </button>
        </div>
    );
}

export default SingleLineForm;