import "./Booking.css"
import Script from "./Script.js";
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation } from "react-i18next";

class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookings: []
        };

        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        this.getBookings();
    }

    async getBookings() {
        let response = await fetch("http://127.0.0.1:8000/all/bookings/");
        let data = await response.json();
        this.setState({ bookings: data });
    }

    componentDidUpdate(prevProps, prevState) {
        const url=window.location.href;
        if (prevState.bookings !== this.state.bookings) {
            Script(this.state.bookings, url)
        }
    }

    submitForm(event) {
        event.preventDefault();

        const DATA = {
            first_name: event.target.elements.first_name.value,
            last_name: event.target.elements.last_name.value,
            start_date: event.target.elements.start_date.value,
            end_date: event.target.elements.end_date.value,
            adults: event.target.elements.adults.value,
            children: event.target.elements.children.value,
            childrens_age: event.target.elements.childrens_age.value,
            apartment: event.target.elements.apartment.value,
            start_time: event.target.elements.start_time.value,
            end_time: event.target.elements.end_time.value,
        };

        fetch("http://127.0.0.1:8000/all/new/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(DATA),
        })

        window.location.reload()
    }

    hideCalendar() {
        const CALENDAR = document.querySelector(".wrapper");
        CALENDAR.classList.add("hidden");
    }

    render() {

        const { t } = this.props;

        return (
        <div id="calendarOverlay" className="">
            <div className="container" id="calendarContainer">
                <div className="wrapper2">
                    <div className="price">
                        <p>{t('Booking.rates')} 250,00$</p>
                    </div>
                    <form onSubmit={this.submitForm}>
                        <div className="phase-one visible">
                            <div class="display-date">
                                <p>{t('Booking.checkin')}</p>
                                <input type="text" id="id_start_date" name="start_date" readOnly={true}></input>
                            </div>
                            <div class="display-date">
                                <p>{t('Booking.checkout')}</p>
                                <input type="text" id="id_end_date" name="end_date" readOnly={true}></input>
                            </div>
                            <div id="three">
                                <div>
                                    <p>{t('Booking.adults')}</p>
                                    <select id="id_adults" name="adults"></select>
                                </div>
                                <div>
                                    <p>{t('Booking.children')}</p>
                                    <select id="id_children" name="children"></select>
                                </div>
                                <div>
                                    <p>{t('Booking.childAge')}</p>
                                    <input type="text" id="id_childrens_age" name="childrens_age"></input>
                                </div>
                            </div>
                            <div id="apartments">
                                <select id="id_apartment" name="apartment">
                                    <option>Cathedral View</option>
                                    <option>Garden View</option>
                                </select>
                            </div>
                            <a onClick={this.hideCalendar} className="submit" id="next-two">{t('Booking.next')}</a>
                        </div>
                        
                        <div className="phase-two">
                            <div>
                                <p>{t('Booking.fName')}</p>
                                <input type="text" id="id_first_name" name="first_name"></input>
                            </div>
                            <div>
                                <p>{t('Booking.lName')}</p>
                                <input type="text" id="id_last_name" name="last_name"></input>
                            </div>
                            <div class="arrival">
                                <p>{t('Booking.arrivalTime')}</p>
                                <select className="time" name="start_time"></select>
                                <p>-</p>
                                <select className="time" name="end_time"></select>
                            </div>
                            <a className="submit" id="back-one">{t('Booking.back')}</a>
                            <a className="submit" id="next-three">{t('Booking.next')}</a>
                        </div>

                        <div className="phase-three">
                            <p>{t('Booking.payment')}</p>
                            <input className="submit" type="submit" value={t('Booking.bookButton')}></input>
                        </div>

                    </form>
                </div>


                <div className="wrapper hidden">
                    <header>
                        <div className="icons">
                            <FontAwesomeIcon id="prev" icon="chevron-left"/>
                            <div className="current-date">
                                <div className="month">
                                    <a></a>
                                    <select id="month"></select>
                                </div>
                                <div className="year">
                                    <a></a>
                                    <select id="year"></select>
                                </div>
                            </div>
                            <FontAwesomeIcon id="next" icon="chevron-right"/>
                        </div>
                    </header>
                    <div className="calendar">
                        <ul className="weeks">
                            <li>{t('Booking.sun')}</li>
                            <li>{t('Booking.mon')}</li>
                            <li>{t('Booking.tue')}</li>
                            <li>{t('Booking.wed')}</li>
                            <li>{t('Booking.thu')}</li>
                            <li>{t('Booking.fri')}</li>
                            <li>{t('Booking.sat')}</li>
                        </ul>
                        <ul className="days"></ul>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default withTranslation()(Booking);