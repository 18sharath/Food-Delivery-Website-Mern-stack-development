import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">

                <div className="footer-content-left">
                 <img src={assets.logo} />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic omnis facilis ipsam dicta accusamus! Quam aut mollitia ut blanditiis reprehenderit! Officiis ex est sequi, delectus numquam praesentium? Voluptate, fuga exercitationem?</p>
                    <div className="footer-social-icons">
                        <img src= {assets.facebook_icon}alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src= {assets.linkedin_icon}alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+91 9972223302</li>
                        <li>+91 9731506871</li>
                    </ul>
                </div>

            </div>
            <hr/>
            <p>@copyright company @tomato</p>
        </div>
    )
}

export default Footer
