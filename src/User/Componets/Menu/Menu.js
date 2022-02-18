import React, { useState } from "react";
import "../Menu/Menu.css";
import { IoMdContact } from "react-icons/io"
import Modal from 'react-responsive-modal'
import 'react-responsive-modal/styles.css';
import CreateChannel from "../CreateChannel/CreateChannel";
import { useHistory } from "react-router-dom";
function Menu(props) {
  return (
    <Navbar>
      <NavItem icon={props.picture}>
        <DropdownMenu channel={props.channel}  userName={props.userName} icon={props.picture}/>
      </NavItem>
    </Navbar>
  );
}
function Navbar(props) {
  return (
    <nav className="navbar-m">
      <ul className="navbar-nav-m">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item-m">
      <p href="#" onClick={() => setOpen(!open)} className="icon-button-m">
      {props.icon ? (
        <img className="icon-button-m" src={props.icon} alt=''/>
        ) : (
          <IoMdContact/>
          )}
      </p>
      {open && props.children}
    </li>
  );
}
function DropdownMenu(props) {
    function DropdownItem(props){

      
      let location=useHistory()
      let [isModel,setIsModal]=useState(false)
        return (
            <div>
<Modal classNames="modal"
 center onClose={()=>{
  setIsModal(false)
}} open={isModel}>
  {props.userName?<CreateChannel  picture={props.icon} userName={props.userName} />
:null}
</Modal>
 {props.userName &&  props.channel ?<p onClick={()=>{
   location.push("/channel")
 }}  className="menu-item-m">
                <span className="icon-button-m"><IoMdContact/></span>
                Your Channel
            </p>:props.userName ? (<p  onClick={()=>{
               setIsModal(true)
             }} className="menu-item-m">
          <span className="icon-button-m"><IoMdContact/></span>
          Create Channel 
        </p>):(null)}
             
            {props.userName?
            (<a href="/" onClick={()=>{
              localStorage.removeItem('token');
            }} className="menu-item-m">
                <span className="icon-button-m"><IoMdContact/></span>
                Logout
            </a>)
            :
            (<a href="/login" className="menu-item-m">
                <span className="icon-button-m"><IoMdContact/></span>
                Login
            </a>)
            }
            
            {/*<a href="/" className="menu-item">
                <span className="icon-button"><IoMdContact/></span>
                login
            </a><a href="/" className="menu-item">
                <span className="icon-button"><IoMdContact/></span>
                login
            </a><a href="/" className="menu-item">
                <span className="icon-button"><IoMdContact/></span>
                login
            </a> */}
            </div>
            
        )
    }
  return(
  <div className="dropdown-m">
<DropdownItem channel={props.channel}  userName={props.userName}  icon={props.icon}/>
  </div>
  )}

export default Menu;
