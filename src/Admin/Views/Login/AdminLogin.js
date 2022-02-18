import React from "react";
import "./AdminLogin.css";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// const server="http://localhost:8000/admin"
const server="https://y-clone.xyz/admin"
export default function AdminLogin() {
let [Error,setError]=useState('')
let [email,setEmail]=useState('')
let [pass,setPass]=useState('')
  const history = useHistory();
  return (
    <div className="containerA">
      <div className="login_formA">
        <h1> ADMIN LOGIN </h1>
        <form onSubmit={(e)=>{
          e.preventDefault()
axios.post(server+'/login',{
  email:email,
  password:pass
}).then(async(data)=>{
  if (data.data){
    let token=await data.data.token
    await localStorage.setItem("admin",token)
    history.push("/admin");
  } else {
    setError("invalid username or password");
  }
})
        }} className="form_inputA">
          <input value={email} onChange={(e)=>{
setEmail(e.target.value)
          }} placeholder="Email" required type="email"  name=""/>
          <input value={pass} onChange={(e)=>{
setPass(e.target.value)
          }} placeholder="Password" minLength="4"  required type="password" name="" />
          <br />
          <button className="login_buttonA" type="submit">
            Login
          </button>
          <Link to="/signup" className="link">
            <p className="exist">{Error}</p>
          </Link>
          <Link to="/signup" className="link">
            <p>Create account ?</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
