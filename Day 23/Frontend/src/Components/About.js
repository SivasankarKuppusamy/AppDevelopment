import React from 'react';
import './About.css'
function About() {


  return (
    <div className="about">
    <div class="container my-5">
  <div class="row">
    <div class="col-md-6 pt-3">
      <small class="text-uppercase" >About us</small>
      <h1 class="h2 mb-4" >About Our <span >Company , MINIATURE </span></h1>
      <p class="text-secondary" >MINIATURE is a leading provider of comprehensive student information management solutions for educational institutions. With a deep commitment to enhancing the efficiency and effectiveness of education administration, we empower schools, colleges, and universities to streamline their operations and better serve their students.</p>
      
    </div>
    <div class="col-md-6 text-center">
      <div class="row">
        <h1 class="h2 mb-4" >Our Mission:</h1>
        <p class="text-secondary" >At MINIATURE, our mission is to simplify and modernize student information management. We believe that every institution should have access to cutting-edge tools that enable them to make data-driven decisions, provide excellent student services, and ultimately, improve educational outcomes.</p>
        <div class="col-md-6 mb-3">
          <img src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="w-100 rounded" alt=""/>
        </div>
        <div class="col-md-6 mb-3">
          <img src="https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="w-100 rounded" alt=""/>
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
  );
}

export default About;
