import React, { useState } from 'react'
import "./Home.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GoogleIcon from '@mui/icons-material/Google';
import ContactForm from './ContactForm';
import { Link } from 'react-router-dom';
function Home() {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div class="home">
    <div class="bg">
    <img class="bg-img" src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob29sJTIwbWFuYWdlbWVudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"/>
    <div class="text-over-img"><div id="text-container">
     WELCOME !
    <div id="flip">
      <div><div>Streamline</div></div>
      <div><div>Empower</div></div>
      <div><div>Succeed</div></div>
    </div>
    Your Student Journey.!
  </div>
  <div class="qoutes">"Research suggests that on average, students retain 25-60% more material when learning online compared to only 8-10% in a classroom"
 <br></br> <button class="btn1"><Link to ="/courses">COURSES</Link></button>
  <button class="btn2">FEATURES</button></div>
  </div>
  
    </div>

<div class="footer">
<div class="inner-footer">

  <div class="footer-items">
    <h1>MINIATURE </h1>
    <p>Your Journey, Our Information.</p>
  </div>

  <div class="footer-items">
    <h2>Quick Links</h2>
    <div class="border1"></div> 
      <ul>
        <a href="/"><li>Home</li></a>
       <li class="con" onClick={togglePopup}>Contact  </li>
        {isOpen && <ContactForm
          content={<>
            <b>CONTACT FORM</b>
            <input type="text" placeholder="Email"/>
            <input type="text" placeholder="Name"/>
            <input type="text" id="message" placeholder="Enter Your Message"/>
            <input class="submit-btn" type="button" placeholder='Submit' value="Submit"/>
          </>}
          handleClose={togglePopup} />}
        
        <a href="#"><Link to="/about"><li>About</li></Link></a>
        <a href="#"><Link to="/faq"><li>FAQ</li></Link></a>
      </ul>
  </div>

  <div class="footer-items">
    <h2>Social Media Links</h2>
    <div class="border1"></div>  
      <ul>
      
      <a href="https://www.instagram.com" target="_blank"><InstagramIcon/>  Instagram</a>
      <a href="https://www.facebook.com" target="_blank"><FacebookIcon/> Facebook</a>
      <a href="https://www.youtube.com" target="_blank"><YouTubeIcon/> Youtube</a>
      <a target="_blank" href="https://www.google.com/search?q=miniature+student+portal&sca_esv=567825245&sxsrf=AM9HkKmRuNW70asoWvBf7JX3EQYDuUZ4EQ%3A1695462414813&ei=DrQOZYObMf6u2roPjeKOyAY&ved=0ahUKEwiD2tvXucCBAxV-l1YBHQ2xA2kQ4dUDCBA&uact=5&oq=miniature+student+portal&gs_lp=Egxnd3Mtd2l6LXNlcnAiGG1pbmlhdHVyZSBzdHVkZW50IHBvcnRhbDIFECEYoAFItTNQswZYljBwAXgBkAEAmAHQAaABqRCqAQYwLjE0LjG4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIKEAAYigUYsAMYQ8ICChAAGIoFGLEDGEPCAgoQLhiKBRixAxhDwgINEAAYigUYsQMYgwEYQ8ICBxAAGIoFGEPCAgUQABiABMICCBAuGIAEGLEDwgIIEAAYgAQYyQPCAggQABiKBRiRAsICBhAAGBYYHsICBxAAGA0YgATCAggQABgWGB4YD8ICCBAAGB4YDRgPwgIIEAAYBRgeGA3CAggQABgIGB4YDcICCBAAGIoFGIYDwgIHECEYoAEYCuIDBBgAIEGIBgGQBgo&sclient=gws-wiz-serp"><GoogleIcon/> Google</a>
    
      </ul>
  </div>
  <div class="footer-items">
    <h2>Get in Touch</h2>
    <div class="border1"></div>
      <ul>
        <li><LocationOnIcon/> XYZ, abc</li>
        <li><a href="tel:0422222666"><PhoneIcon/> 0422222666</a></li>
        <li><a href="mailto:feedback@miniature.com"><AlternateEmailIcon/> feedback@miniature.com</a></li>
      </ul> 

      
  </div>
</div>

<div class="footer-bottom">
  Copyright &copy;  Miniature and Companies 2023.<b class="u1"><Link to="/terms">Terms and Conditons</Link> </b><b class="u2"><Link to="/privacy">Privacy Policy</Link></b>
</div>
</div>
    </div>
  )
}

export default Home