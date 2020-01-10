import React, { useState } from 'react';

const ContactForm = () => {

    const maxLength = 250;

    // #region state

    const [messageBody, setMessageBody] = useState("");

    // #endregion

    // #region UI Event Callbacks

    const formSubmitted = (event) => {
        event.preventDefault();
    }

    const onMessageBodyChanged = (event) => {
        setMessageBody(event.target.value);
        if (messageBody.length > maxLength) {
            setMessageBody(messageBody.substring(0, maxLength));
        }
    }

    // #endregion

    return (
        <form onSubmit={formSubmitted}>
            <div className="mailHeader">
                <span className="inputLabel">Subject:</span>
                <select placeholder="Pick a Subject"> 
                    <option value="complaint">Complaint</option>
                    <option value="compliment">Compliment</option>
                    <option value="siteFeedback">Site Feedback</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="request">Request</option>
                    {/* <option value="jobOffer">Job Offer</option> */}
                </select>
                <span className="inputLabel">Email:</span>
                <input type="email"/>
            </div>
            <span className="inputLabel">Message Body:</span>
            <div className="messageContainer">
                <textarea 
                    cols="100" 
                    rows="10"
                    placeholder="Write something..."
                    maxLength={maxLength}
                    onChange={onMessageBodyChanged}
                />
                <div className="textLimitAndButton">
                    <span>{messageBody.length + "/250"}</span>
                    <input type="submit" value="Send"/>
                </div>
            </div>
        </form>
    );
}

export default ContactForm;