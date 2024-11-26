import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const ContactUs = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate()

    return (
        <div id="modal" className="contact modal" style={{ display: store.showModal ? "block" : "none" }}>

            <div className="modal-content">
                <span className="close" id="closeModal">&times;</span>
                <h2>Contact Us</h2>
                <form id="contactForm">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />

                    <label for="message"></label>
                    <textarea className="text" id="message" name="message" placeholder="Enter your message" rows="5" required></textarea>

                    <button type="submit" id="submitBtn" class="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
};


