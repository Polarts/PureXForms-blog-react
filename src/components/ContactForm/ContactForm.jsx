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
                <span className="input-label">Subject:</span>
                <select className="u-rounded dropdown" placeholder="Pick a Subject"> 
                    <option value="complaint">Complaint</option>
                    <option value="compliment">Compliment</option>
                    <option value="siteFeedback">Site Feedback</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="request">Request</option>
                    {/* <option value="jobOffer">Job Offer</option> */}
                </select>
                <span className="input-label">Email:</span>
                <input type="email"/>
            </div>
            <span className="input-label">Message Body:</span>
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
                    <input 
                        className="u-rounded primary button" 
                        type="submit" 
                        value="Send"
                    />
                </div>
            </div>
        </form>
    );
}

export default ContactForm;