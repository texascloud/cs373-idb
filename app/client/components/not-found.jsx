import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

export default class NotFound extends React.Component {
    render() {
        return (
        <section id="banner">
            <div className="inner">
                <h2>404</h2>
                <p>Hello</p>
                <p>It seems that the page you're looking for does not exist. Please return to the battlefield or killzone shall greet you.</p>
            </div>
        </section>
        );
    }
}
