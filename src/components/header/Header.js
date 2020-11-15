import React, { Component } from 'react'
import './header.css';

export default class Header extends Component {
    render() {
        return (
            <div className='appHeader'>
                <div style={{color: 'white', fontSize: '6vh', paddingLeft:'1em'}}> Social Media Activity - Stock Price Correlator</div>
                
            </div>
        )
    }
}
