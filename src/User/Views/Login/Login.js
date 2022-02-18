import React from "react";
import "./Login.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { server } from "../../../server";


export default function Login(props) {
  console.log(props,"loginnnnnnnnnnnn");
  let [Error, setError] = useState("");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  let [block,setBlock]=useState("")
  let location = useLocation();
  console.log(location.state);
  const history = useHistory();
  const responseFacebook = (response) => {
    console.log(response);
    axios
      .post(server+"/login", {
        name: response.name,
        email: response.email,
        profile: response.picture.data.url,
      })
      .then((data) => {
        if (data.data) {
          if(data.data.block){
setBlock("This account is blocked")
          }else{
            console.log(data.data);
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("userId", data.data.user_id);
            localStorage.setItem("user", data.data.username);
            if (location.state) {
              if(location.state.red){
                axios
                .post(
                  server+"/subscribe",
                  { channelId:location.state.red.channelId,token:localStorage.getItem("token")}
                 
                )
                .then((response) => {
                  history.push({
                    pathname:  `/watch/${location.state.red._id}`,
                  });
                })
              }else if(location.state.redl){
                axios
                .post(
                  server+"/like",
                  { videoId: location.state.redl._id,token:localStorage.getItem("token") },
                  
                )
                .then((response) => {
                  history.push({
                    pathname:`/watch/${location.state.redl._id}`,
                  });
                })
              }else if(location.state.reds){
                axios
                .post(
                  server+"/dislike",
                  { videoId: location.state.reds._id ,token:localStorage.getItem("token")}
                  
                )
                .then((response) => {
                  history.push({
                    pathname:`/watch/${location.state.reds._id}`,
                  });
                })
              }
                 
            } else {
              history.push("/");
            }
          }
        
        } else {
          setError("Account doesn't exist please signup");
        }
      });
  };
  const responseGoogle = (response) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      profile: response.profileObj.imageUrl,
      method: "Google",
    };
    axios.post(server+"/login", data, { headers: headers }).then((data) => {
      if (data.data) {
        if(data.data.block){
          setBlock("This account is blocked")
        }else{
          console.log(data.data);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userId", data.data.user_id);
          localStorage.setItem("user", data.data.username);
          if (location.state) {
        if(location.state.red){
          axios
          .post(
            server+"/subscribe",
            { channelId:location.state.red.channelId,token:localStorage.getItem("token")},
            
          )
          .then((response) => {
            history.push({
              pathname: `/watch/${location.state.red._id}`,
             
            });
          })
        }else if(location.state.redl){
          axios
          .post(
            server+"/like",
            { videoId: location.state.redl._id,token:localStorage.getItem("token")}
           
          )
          .then((response) => {
            history.push({
              pathname:`/watch/${location.state.redl._id}`,
    
            });
          })
        }else if(location.state.reds){
          axios
          .post(
            server+"/dislike",
            { videoId: location.state.reds._id,token:localStorage.getItem("token") },
           
          )
          .then((response) => {
            history.push({
              pathname: `/watch/${location.state.reds._id}`,
             
            });
          })
        }
           
          } else {
            history.push("/");
          }
        }
      } else {
        setError("Account doesn't exist please signup");
      }
    });
  };

  return (
    <div className="container">
      <div className="login_form">
        <h1>LOGIN </h1>
        <div className="social">
          <GoogleLogin
            clientId="1049478099659-tqnfn81cvjjsj84ajiup3r95am1tb6ou.apps.googleusercontent.com"
            buttonText="Login"
            className="my_google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="329412992038265"
            cssClass="my_facebooklogin"
            textButton="Login"
            icon="fa-facebook"
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("fd");
            axios
              .post(server+"/login", {
                email: email,
                password: pass,
              })
              .then((data) => {
                console.log(data.data);
                if (data.data) {
                  if(data.data.block){
setBlock("This account is blocked")
                  }else{
                    console.log(data.data);
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("userId", data.data.user_id);
                    localStorage.setItem("user", data.data.username);
                    if (location.state) {
                      if(location.state.red){
                        axios
                        .post(
                          server+"/subscribe",
                          { channelId:location.state.red.channelId,token:localStorage.getItem("token")},
                          
                        )
                        .then((response) => {
                          history.push({
                            pathname: `/watch/${location.state.red._id}`,
                           
                          });
                        })
                      }else if(location.state.redl){
                        axios
                        .post(
                          server+"/like",
                          { videoId: location.state.redl._id ,token:localStorage.getItem("token")}
                        )
                        .then((response) => {
                          history.push({
                            pathname: `/watch/${location.state.red._id}`,
                          });
                        })
                      }else if(location.state.reds){
                        axios
                        .post(
                          server+"/dislike",
                          { videoId: location.state.reds._id,token:localStorage.getItem("token") },
                          
                        )
                        .then((response) => {
                          history.push({
                            pathname:`/watch/${location.state.red._id}`,
                            state: {
                              item: location.state.reds,
                            },
                          });
                        })
                      }
                         
                    } else {
                      history.push("/");
                    }
                  }
                } else {
                  setError("Account doesn't exist please signup");
                }
              });
          }}
          className="form_input"
        >
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder=" Email"
            type="email"
            name=""
            id=""
          />
          <input
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            required
            placeholder=" Password"
            type="password"
            minLength="4"
            name=""
            id=""
          />
          <br />
          <button className="login_button" type="submit">
            Login
          </button>
          {location.state?location.state.red?<Link
            to={{
              pathname: "/signup",
              state: {
                red: location.state.red,
              },
            }}
            className="link"
          >
            <p>{Error}</p>
            <p>{block}</p>
          </Link>:location.state.redl?<Link
            to={{
              pathname: "/signup",
              state: {
                redl: location.state.redl,
              },
            }}
            className="link"
          >
            <p>{Error}</p>
            <p>{block}</p>
          </Link>:location.state.reds?<Link
            to={{
              pathname: "/signup",
              state: {
                reds: location.state.reds,
              },
            }}
            className="link"
          >
            <p>{Error}</p>
            <p>{block}</p>
          </Link>:<Link
            to="/signup"className="link"
          >
            <p>{Error}</p>
            <p>{Error}</p>
          </Link>: <Link
            to="/signup"className="link"
          >
            <p>{Error}</p>
            <p>{block}</p>
          </Link>}
          {location.state?location.state.red?<Link
            to={{
              pathname: "/signup",
              state: {
                red: location.state.red,
              },
            }}
            className="link"
          >
            <p>Create account?</p>
          </Link>:location.state.redl?<Link
            to={{
              pathname: "/signup",
              state: {
                redl: location.state.redl,
              },
            }}
            className="link"
          >
            <p>Create account?</p>
          </Link>:location.state.reds?<Link
            to={{
              pathname: "/signup",
              state: {
                reds: location.state.reds,
              },
            }}
            className="link"
          >
            <p>Create account?</p>
          </Link>:<Link
            to="/signup"className="link"
          >
            <p>Create account?</p>
          </Link>: <Link
            to="/signup"className="link"
          >
            <p>Create account?</p>
          </Link>}
        </form>
      </div>
    </div>
  );
}
