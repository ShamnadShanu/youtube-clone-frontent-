import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./Signup.css";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { server } from "../../../server";


function Signup() {
  let location = useLocation();
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  let [name, setName] = useState("");
  let [exist, setExist] = useState("");
  let history = useHistory();
  let data = {
    name: name,
    email: email,
    password: pass,
    method: "Normal",
  };
  const responseFacebook = (response) => {
    console.log(response);
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      name: response.name,
      email: response.email,
      profile: response.picture.data.url,
      method: "Facebook",
    };
    axios.post(server+"/signup", data, { headers: headers }).then((data) => {
      if (data.data) {
        console.log(data.data);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.user_id);
        localStorage.setItem("user", data.data.username);
        if (location.state) {
          if (location.state.red) {
            axios
              .post(
                server+"/subscribe",
                { channelId: location.state.red.channelId,token:localStorage.getItem("token") },
                
              )
              .then((response) => {
                history.push({
                  pathname:`/watch/${location.state.red._id}`,
                 
                });
              });
          } else if (location.state.redl) {
            axios
              .post(
                server+"/like",
                { videoId:location.state.redl._id,token:localStorage.getItem("token") },
                
              )
              .then((response) => {
                history.push({
                  pathname: `/watch/${location.state.redl._id}`,
                 
                });
              });
          } else if (location.state.reds) {
            axios
              .post(
                server+"/dislike",
                { videoId: location.state.reds._id ,token:localStorage.getItem("token")},
              
              )
              .then((response) => {
                history.push({
                  pathname: `/watch/${location.state.reds._id}`,
                 
                });
              });
          }
        } else {
          history.push("/");
        }
      } else {
        setExist("Existing account please login");
      }
    });
  };
  const responseGoogle = (response) => {
    console.log(response.profileObj.imageUrl);
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      profile: response.profileObj.imageUrl,
      method: "Google",
    };
    axios.post(server+"/signup", data, { headers: headers }).then((data) => {
      if (data.data) {
        console.log(data.data);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data.user_id);
        localStorage.setItem("user", data.data.username);
        if (location.state) {
          if (location.state.red) {
            axios
              .post(
                server+"subscribe",
                { channelId: location.state.red.channelId ,token:localStorage.getItem("token")},
               
              )
              .then((response) => {
                history.push({
                  pathname: `/watch/${location.state.red._id}`
                });
              });
          } else if (location.state.redl) {
            axios
              .post(
                server+"/like",
                { videoId: location.state.redl._id ,token:localStorage.getItem("token")},
                
              )
              .then((response) => {
                history.push({
                  pathname: `/watch/${location.state.redl._id}`,
                 
                });
              });
          } else if (location.state.reds) {
            axios
              .post(
                server+"/dislike",
                { videoId: location.state.reds._id,token:localStorage.getItem("token") },
               
              )
              .then((response) => {
                history.push({
                  pathname:`/watch/${location.state.reds._id}`,
                  
                });
              });
          }
        } else {
          history.push("/");
        }
      } else {
        setExist("Existing account please login");
      }
    });
  };

  return (
    <div className="container-s">
      <div className="signup_form">
        <h1>SIGNUP PAGE</h1>
        <GoogleLogin
          clientId="388631232662-2t0luoa6p5ng7pc3tiao1ja2umv5h915.apps.googleusercontent.com"
          buttonText="Signup"
          className="google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="1460486637623573"
          cssClass="facebook"
          textButton="Signup"
          icon="fa-facebook"
          fields="name,email,picture"
          callback={responseFacebook}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("fd");
            axios.post(server+"/signup", data).then((data) => {
              if (data.data) {
                console.log(data.data);
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("userId", data.data.user_id);
                localStorage.setItem("user", data.data.username);
                if (location.state) {
                  if (location.state.red) {
                    axios
                      .post(
                        server+"/subscribe",
                        { channelId: location.state.red.channelId,token:localStorage.getItem("token") },
                        
                      )
                      .then((response) => {
                        history.push({
                          pathname: `/watch/${location.state.red._id}`
                         
                        });
                      });
                  } else if (location.state.redl) {
                    axios
                      .post(
                        server+"/like",
                        { videoId:location.state.redl._id ,token:localStorage.getItem("token")},
                       
                      )
                      .then((response) => {
                        history.push({
                          pathname: `/watch/${location.state.redl._id}`,
                         
                        });
                      });
                  } else if (location.state.reds) {
                    axios
                      .post(
                        server+"/dislike",
                        { videoId: location.state.reds._id,token:localStorage.getItem("token") },
                       
                      )
                      .then((response) => {
                        history.push({
                          pathname: `/watch/${location.state.reds._id}`,
                        
                        });
                      });
                  }
                } else {
                  history.push("/");
                }
              } else {
                setExist("Existing account please login");
              }
            });
          }}
          className="form_input"
        >
          <input
            value={name}
            required
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            name=""
            id=""
          />
          <input
            value={email}
            required
            placeholder=" Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name=""
            id=""
          />
          <input
            value={pass}
            required
            placeholder=" Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            minLength="4"
            name=""
            id=""
          />
          <br />
          <button className="login_button" type="submit">
            Signup
          </button>
          {location.state ? (
            location.state.red ? (
              <Link
                to={{
                  pathname: "/login",
                  state: {
                    red: location.state.red,
                  },
                }}
                className="link"
              >
                <p className="exist">{exist}</p>
                <p>Already have an acccount ?</p>{" "}
              </Link>
            ) : location.state.redl ? (
              <Link
                to={{
                  pathname: "/login",
                  state: {
                    redl: location.state.redl,
                  },
                }}
                className="link"
              >
                <p className="exist">{exist}</p>
                <p>Already have an acccount ?</p>{" "}
              </Link>
            ) : location.state.reds ? (
              <Link
                to={{
                  pathname: "/login",
                  state: {
                    reds: location.state.reds,
                  },
                }}
                className="link"
              >
                <p className="exist">{exist}</p>
                <p>Already have an acccount ?</p>{" "}
              </Link>
            ) : (
              <Link to="/login" className="link">
                <p className="exist">{exist}</p>
                <p>Already have an acccount ?</p>{" "}
              </Link>
            )
          ) : (
            <Link to="/login" className="link">
              <p className="exist">{exist}</p>
              <p>Already have an acccount ?</p>{" "}
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
