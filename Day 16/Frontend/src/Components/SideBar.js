import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SubjectIcon from '@mui/icons-material/Subject';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import BadgeIcon from '@mui/icons-material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebarState } from '../redux/sidebarSlice';
import CloseIcon from '@mui/icons-material/Close';
import { logout } from '../redux/userSlice';
import { getEmail, getRole } from './LocalStorage';

function SideBar() {
  const username = getEmail();
  const userType = getRole();

  const nav = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const handleMenuItemClick = (menuItemId, route) => {
    setActiveMenuItem(menuItemId);
    nav(route);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    if (window.confirm("Are You sure to logout?")) {
      localStorage.clear();
   
      nav("/");
    }
  };

  const isSidebarOpen = useSelector(selectSidebarState);

  return (
    <>
      {username ? (
        <>
          <div className={`sidebar-container ${isSidebarOpen ? 'open' : 'menu2'}`}>
            <Sidebar>
              {isSidebarOpen ? (
                <Menu className="menu">
                  <>
                    {userType === "ADMIN" ? (
                      <>
                        <MenuItem
                          style={{
                            backgroundColor: activeMenuItem === 'Dashboard' ? 'rgb(51, 51, 241)' : 'transparent',
                            borderRadius: 50
                          }}
                          component={<Link to="/admin-dashboard" />}
                          icon={<SpaceDashboardIcon />}
                          onClick={() => handleMenuItemClick('Dashboard', '/admin-dashboard')}
                        >
                          Dashboard
                        </MenuItem>
                        <MenuItem
                          style={{
                            backgroundColor: activeMenuItem === 'Courses' ? 'rgb(51, 51, 241)' : 'transparent',
                            borderRadius: 50
                          }}
                          component={<Link to="/courses" />}
                          icon={<LibraryBooksIcon />}
                          onClick={() => handleMenuItemClick('Courses', '/courses')}
                        >
                          Courses
                        </MenuItem>
                        <MenuItem
                          style={{
                            backgroundColor: activeMenuItem === 'Students' ? 'rgb(51, 51, 241)' : 'transparent',
                            borderRadius: 50
                          }}
                          component={<Link to="/students" />}
                          icon={<PeopleOutlineIcon />}
                          onClick={() => handleMenuItemClick('Students', '/students')}
                        >
                          Students
                        </MenuItem>
                       
                        <MenuItem
                          style={{
                            backgroundColor: activeMenuItem === 'Subjects' ? 'rgb(51, 51, 241)' : 'transparent',
                            borderRadius: 50
                          }}
                          component={<Link to="/admin-fee" />}
                          icon={<SubjectIcon />}
                          onClick={() => handleMenuItemClick('Subjects', '/admin-fee')}
                        >
                          Fee Management
                        </MenuItem>
                        <MenuItem
                          style={{
                            backgroundColor: activeMenuItem === 'Reports' ? 'rgb(51, 51, 241)' : 'transparent',
                            borderRadius: 50
                          }}
                          component={<Link to="/attendence" />}
                          icon={<ImportContactsIcon />}
                          onClick={() => handleMenuItemClick('Reports', '/reports')}
                        >
                          Attendance
                        </MenuItem>
                        <MenuItem onClick={handleLogout} icon={<LogoutIcon />} className="menu-item-l">Logout</MenuItem>
                        <footer>&copy; Copyright 2023 123.abc</footer>
                      </>
                    ) : (
                      <>
                        {userType === "STUDENT" ? (
                          <>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'Dashboard' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/user-dashboard" />}
                              icon={<SpaceDashboardIcon />}
                              onClick={() => handleMenuItemClick('Dashboard', '/user-dashboard')}
                            >
                              Dashboard
                            </MenuItem>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'Courses' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/courses" />}
                              icon={<LibraryBooksIcon />}
                              onClick={() => handleMenuItemClick('Courses', '/courses')}
                            >
                              Courses
                            </MenuItem>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'grades' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/grades" />}
                              icon={<BadgeIcon />}
                              onClick={() => handleMenuItemClick('grades', '/grades')}
                            >
                              Grades
                            </MenuItem>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'activities' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/activities" />}
                              icon={<PeopleOutlineIcon />}
                              onClick={() => handleMenuItemClick('activities', '/activities')}
                            >
                              Activities
                            </MenuItem>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'attendance' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/subjects" />}
                              icon={<SubjectIcon />}
                              onClick={() => handleMenuItemClick('attendance', '/attendance')}
                            >
                              Attendance
                            </MenuItem>
                            <MenuItem onClick={handleLogout} icon={<LogoutIcon />} className="menu-item-l">Logout</MenuItem>
                            <footer>&copy; Copyright 2023 123.abc</footer>
                          </>
                        ) : (
                          <>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'Dashboard' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/ins-dashboard" />}
                              icon={<SpaceDashboardIcon />}
                              onClick={() => handleMenuItemClick('Dashboard', '/ins-dashboard')}
                            >
                              Dashboard
                            </MenuItem>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'Courses' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/courses" />}
                              icon={<LibraryBooksIcon />}
                              onClick={() => handleMenuItemClick('Courses', '/courses')}
                            >
                              Courses
                            </MenuItem>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'Students' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/students" />}
                              icon={<BadgeIcon />}
                              onClick={() => handleMenuItemClick('Students', '/students')}
                            >
                              Students
                            </MenuItem>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'activities' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/grading" />}
                              icon={<PeopleOutlineIcon />}
                              onClick={() => handleMenuItemClick('activities', '/activities')}
                            >
                              Grading
                            </MenuItem>
                            <MenuItem
                              style={{
                                backgroundColor: activeMenuItem === 'attendance' ? 'rgb(51, 51, 241)' : 'transparent',
                                borderRadius: 50
                              }}
                              component={<Link to="/ins-attendence" />}
                              icon={<SubjectIcon />}
                              onClick={() => handleMenuItemClick('attendance', '/attendance')}
                            >
                              Attendance
                            </MenuItem>
                            <MenuItem onClick={handleLogout} icon={<LogoutIcon />} className="menu-item-l">Logout</MenuItem>
                            <footer>&copy; Copyright 2023 123.abc</footer>
                          </>
                        )}
                      </>
                    )}
                  </>
                </Menu>
              ) : (
                <Menu className="menu2">
                  <>
                    <MenuItem
                      style={{
                        color: activeMenuItem === 'Dashboard' ? 'rgb(51, 51, 241)' : 'black',
                        borderRadius: 50
                      }}
                      component={<Link to="/admin-dashboard" />}
                      icon={<SpaceDashboardIcon />}
                      onClick={() => handleMenuItemClick('Dashboard', '/admin-dashboard')}
                    ></MenuItem>
                    <MenuItem
                      style={{
                        color: activeMenuItem === 'Courses' ? 'rgb(51, 51, 241)' : 'black',
                        borderRadius: 50
                      }}
                      component={<Link to="/courses" />}
                      icon={<LibraryBooksIcon />}
                      onClick={() => handleMenuItemClick('Courses', '/courses')}
                    ></MenuItem>
                    <MenuItem
                      style={{
                        color: activeMenuItem === 'ins' ? 'rgb(51, 51, 241)' : 'black',
                        borderRadius: 50
                      }}
                      component={<Link to="/instructors" />}
                      icon={<BadgeIcon />}
                      onClick={() => handleMenuItemClick('ins', '/instructors')}
                    ></MenuItem>
                    <MenuItem
                      style={{
                        color: activeMenuItem === 'Students' ? 'rgb(51, 51, 241)' : 'black',
                        borderRadius: 50
                      }}
                      component={<Link to="/students" />}
                      icon={<PeopleOutlineIcon />}
                      onClick={() => handleMenuItemClick('Students', '/students')}
                    ></MenuItem>
                    <MenuItem
                      style={{
                        color: activeMenuItem === 'Subjects' ? 'rgb(51, 51, 241)' : 'black',
                        borderRadius: 50
                      }}
                      component={<Link to="/subjects" />}
                      icon={<SubjectIcon />}
                      onClick={() => handleMenuItemClick('Subjects', '/subjects')}
                    ></MenuItem>
                    <MenuItem
                      style={{
                        color: activeMenuItem === 'Reports' ? 'rgb(51, 51, 241)' : 'black',
                        borderRadius: 50
                      }}
                      component={<Link to="/reports" />}
                      icon={<ImportContactsIcon />}
                      onClick={() => handleMenuItemClick('Reports', '/reports')}
                    ></MenuItem>
                    <MenuItem onClick={handleLogout} icon={<LogoutIcon />} className="menu-item-l">Logout</MenuItem>
                  </>
                </Menu>
              )}
            </Sidebar>
          </div>
        </>
      ) : (<></>)}
    </>
  );
}

export default SideBar;
