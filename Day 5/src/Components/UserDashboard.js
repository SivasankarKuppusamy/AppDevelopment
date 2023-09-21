import React from 'react';
import './Admin.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PieChart } from '@mui/x-charts';
import { useSelector } from 'react-redux';
function UserDashboard() {
    const username=useSelector((state)=>state.user.user);
    const userType=useSelector((state)=>state.user.userType);
  return (
    <>
    {userType==="student" ?(<>
    <div id="main">
        <div>
        <div id="det"><h2>OVERVIEW</h2></div>
        <div id="overview">
        <div className="one">
        <img id="student-image" src="https://clipart-library.com/images_k/graduate-silhouette-vector/graduate-silhouette-vector-21.png"/>
        <h5>Certifications Received</h5>
        <h6>5</h6>
        </div>
        </div>   
        <div id="overview">
        <div className="two">
        <img id="student-image" src="https://www.pngarts.com/files/7/School-Education-Course-PNG-Photo.png"/>
        <h5>Total Courses Registered</h5>
        <h6>5</h6>
        </div>
        </div>   
        <div id="overview">
        <div className="three">
        <img id="student-image" src="https://cdn-icons-png.flaticon.com/512/8999/8999099.png" />
        <h5>Attendence   Percentage</h5>
        <h6>75%</h6>
        </div>
        </div>   
        <div id="overview">
        <div className="four">
        <img id="student-image" src="https://static.thenounproject.com/png/2000631-200.png"/>
        <h5>Average Grade</h5>
        <h6>A+</h6>
        </div>
        </div>
        </div>  
    
        <div id="div2">
        <div className="booking-list">
        <h2 id="det">ONGOING COURSES</h2>       <table id="home-table">
        <tr id="home-tr">
        <th id="home-th">COURSE TITLE</th>
        <th id="home-th">STATUS</th>
        <th id="home-th">INSTRUCTOR </th>
        <th id="home-th">VIEW</th>
        </tr>
        <tr>
        <td id="home-td">REACT </td>
        <td id="home-td">ONGOING</td>
        <td id="home-td">Mr. K. Siva</td>
        <td id="home-td"><VisibilityIcon/></td>
        </tr>
        </table>
        </div>
        <h2 id="det">COURSES PERFOMANCE</h2> 
        <PieChart
  series={[
    {
      data: [
        { id: 0, value: 10, label: ' A' },
        { id: 1, value: 15, label: ' B' },
        { id: 2, value: 20, label: ' C' },
      ],
    },
  ]}
  width={400}
  height={200}
/>
        </div>
    </div>
    </>):(<>
        <div id="main">
        <div>
        <div id="det"><h2>OVERVIEW</h2></div>
        <div id="overview">
        <div className="one">
        <img id="student-image" src="https://clipart-library.com/images_k/graduate-silhouette-vector/graduate-silhouette-vector-21.png"/>
        <h5>Students Enrolled</h5>
        <h6>5</h6>
        </div>
        </div>   
        <div id="overview">
        <div className="two">
        <img id="student-image" src="https://www.pngarts.com/files/7/School-Education-Course-PNG-Photo.png"/>
        <h5>Total Courses </h5>
        <h6>5</h6>
        </div>
        </div>   
        <div id="overview">
        <div className="three">
        <img id="student-image" src="https://cdn-icons-png.flaticon.com/512/8999/8999099.png" />
        <h5>Students Perfomance</h5>
        <h6>75%</h6>
        </div>
        </div>   
        <div id="overview">
        <div className="four">
        <img id="student-image" src="https://static.thenounproject.com/png/2000631-200.png"/>
        <h5>Average Grade</h5>
        <h6>A+</h6>
        </div>
        </div>
        </div>  
    
        <div id="div2">
        <div className="booking-list">
        <h2 id="det">STUDENTS DETAILS</h2>       <table id="home-table">
        <tr id="home-tr">
        <th id="home-th">STUDENT ID</th>
        <th id="home-th">STUDENT NAME</th>
        <th id="home-th">COURSE</th>
        <th id="home-th">GRADE </th>
        <th id="home-th">STATUS </th>
        <th id="home-th">VIEW</th>
        </tr>
        <tr>
        <td id="home-td">139 </td>
        <td id="home-td">SIVA</td>
        <td id="home-td">REACT</td>
        <td id="home-td">A+</td>
        <td id="home-td">ONGOING</td>
        <td id="home-td"><VisibilityIcon/></td>
        </tr>
        </table>
        </div>
        <h2 id="det">STUDENTS ENROLLEMENT </h2> 
        <PieChart
  series={[
    {
      data: [
        { id: 0, value: 10, label: ' A' },
        { id: 1, value: 15, label: ' B' },
        { id: 2, value: 20, label: ' C' },
      ],
    },
  ]}
  width={400}
  height={200}
/>
        </div>
    </div>
        </>)}
    </>
  );
}

export default UserDashboard;