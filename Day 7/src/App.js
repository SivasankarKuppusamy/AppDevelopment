import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/StudentSignup';
import Home from './Components/Home';
import InstructorSignup from './Components/InstructorSignup';
import SideBar from './Components/SideBar';
import Courses from './Components/Courses';
import Students from './Components/Students';
import Subjects from './Components/Subjects';
import Reports from './Components/Reports';
import Navbar from './Components/Navbar';
import Instructors from './Components/Instructors';
import AdminDashboard from './Components/AdminDashboard';
import UserDashboard from './Components/UserDashboard';
import Activities from './Components/Activities';
import Grades from './Components/Grades';
import Attendence from './Components/Attendence';

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
      <Route path='/instructors' element={<Instructors/>}/>
      <Route path='/attendence' element={<Attendence/>}/>
      <Route path='/activities' element={<Activities/>}/>
      <Route path='/grades' element={<Grades/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/user-dashboard' element={<UserDashboard/>}/>
      <Route path='/subjects' element={<Subjects/>}/>
      <Route path='/reports' element={<Reports/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
