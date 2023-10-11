import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/StudentSignup';
import Home from './Components/Home';
import InstructorSignup from './Components/InstructorSignup';
import SideBar from './Components/SideBar';
import Courses from './Components/Courses';
import Students from './Components/Students';

import Navbar from './Components/Navbar';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import Activities from './Components/Activities';

import Attendence from './Components/Attendence';
import Faq from './Components/faq';
import Terms from './Components/Terms';
import Privacy from './Components/Privacy';
import About from './Components/About';
import AdminFee from './Components/AdminFee';
import InstructorDashboard from './Components/InstructorDashboard';
import Grading from './Components/Grading';
import InstructorAttendance from './Components/InstructorAttendance ';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <SideBar/>
      <Navbar/>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/student-signup' element={<Signup/>}/>
      <Route path='/instructor-signup' element={<InstructorSignup/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/courses' element={<Courses/>}/>
      <Route path='/students' element={<Students/>}/>

      <Route path='/attendence' element={<Attendence/>}/>
      <Route path='/activities' element={<Activities/>}/>
   
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/user-dashboard' element={<UserDashboard/>}/>
      <Route path='/ins-dashboard' element={<InstructorDashboard/>}/>
  
      <Route path='/faq' element={<Faq/>}/>
      <Route path='/terms' element={<Terms/>}/>
      <Route path='/privacy' element={<Privacy/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/admin-fee' element={<AdminFee/>}/>
      <Route path='/grading' element={<Grading/>}/>
      <Route path='/ins-attendence' element={<InstructorAttendance/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
