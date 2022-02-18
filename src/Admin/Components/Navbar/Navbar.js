import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import  {HiOutlineLogout} from 'react-icons/hi'

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar-u'>
          <Link to='#' className='menu-bars-u'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu-u active' : 'nav-menu-u'}>
          <ul className='nav-menu-items-u' onClick={showSidebar}>
            <li className='navbar-toggle-u'>
              <Link to='#' className='menu-bars-u'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
            <Link to="/admin" onClick={()=>{
                localStorage.removeItem('admin')

            }}>
            <HiOutlineLogout/>
            <span>Logout</span>
                  </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;