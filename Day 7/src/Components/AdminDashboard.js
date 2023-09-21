import React from 'react';
import './Admin.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LineChart, PieChart } from '@mui/x-charts';
function AdminDashboard() {
  return (
    <div id="main">
        <div>
        <div id="det"><h2>OVERVIEW</h2></div>
        <div id="overview">
        <div className="one">
        <img id="student-image" src="https://clipart-library.com/images_k/graduate-silhouette-vector/graduate-silhouette-vector-21.png"/>
        <h5>Total number Students</h5>
        <h6>100</h6>
        </div>
        </div>   
        <div id="overview">
        <div className="two">
        <img id="student-image" src="https://www.pngarts.com/files/7/School-Education-Course-PNG-Photo.png"/>
        <h5>Courses Offered</h5>
        <h6>27</h6>
        </div>
        </div>   
        <div id="overview">
        <div className="three">
        <img id="student-image" src="https://w7.pngwing.com/pngs/879/904/png-transparent-subject-international-english-computer-icons-symbol-english-miscellaneous-blue-english-thumbnail.png" />
        <h5>Subjects Available</h5>
        <h6>75</h6>
        </div>
        </div>   
        <div id="overview">
        <div className="four">
        <img id="student-image" src="https://p7.hiclipart.com/preview/396/474/550/teacher-education-school-classroom-computer-icons-teacher.jpg"/>
        <h5>Total number of Instructors</h5>
        <h6>100 </h6>
        </div>
        </div>
        </div>  
    
        <div id="div2">
        <div className="booking-list">
        <h2 id="det">ONGOING COURSES</h2>       <table id="home-table">
        <tr id="home-tr">
        <th id="home-th">COURSE TITLE</th>
        <th id="home-th">STUDENTS ENROLLED</th>
        <th id="home-th">INSTRUCTOR </th>
        <th id="home-th">VIEW</th>
        </tr>
        <tr>
        <td id="home-td">REACT </td>
        <td id="home-td">25</td>
        <td id="home-td">Mr. K. Siva</td>
        <td id="home-td"><VisibilityIcon/></td>
        </tr>
        </table>
        </div>
          <div class="pie">
    
        <PieChart class="Piechart"
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
/></div> 
<h2 id="det">STUDENTS ENROLLMENT AND COURSES OVERVIEW</h2> <div class="line"><LineChart 
xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
series={[
  {
    data: [2, 5.5, 2, 8.5, 1.5, 5],
  },
]}
width={500}
height={300}
/></div>
        </div>
    </div>
  );
}

export default AdminDashboard;