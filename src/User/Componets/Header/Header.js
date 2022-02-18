import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from "./Screenshot 2021-04-29 131214.png";
import MenuIcon from "@material-ui/icons/Menu";
import Video from "@material-ui/icons/VideoCall";
import SearchIcon from "@material-ui/icons/Search";
import NotificatioIcon from "@material-ui/icons/Notifications";
import { useHistory } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import axios from "axios";
import { server } from "../../../server";

export default function Header(props) {
  const history = useHistory();
  const [state, setstate] = useState([]);
  const [inputSearch, setInputSearch] = useState();

  useEffect(() => {
    axios
      .post(
        server,
        { token:localStorage.getItem("token")}
      )
      .then((res) => {
        setstate(res.data);
        console.log("untallo",res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setInputSearch(props.searchValue);
  }, []);
  return (
    <div className="header-h">
      <div className="header_left">
        <MenuIcon />
        <Link to="/">
          <img className="header_logo" src={Logo} alt="" />
        </Link>
      </div>

      <div className="header_input">
        <input
          value={inputSearch}
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
          placeholder="Search"
          type="text"
          name=""
          id=""
        />
        {/* <Link className="Link" to={{
                  pathname:'/search/${inputSearch}',
                  state: {
                  inputSearch
                  }
                }}> */}
        <div
          onClick={
            inputSearch
              ? () => {
                      history.push({
                        pathname: `/search/${inputSearch}`,
                      });
                      window.location.reload()
                }
              : null
          }
          className="Link"
        >
          <SearchIcon className="header_inputButton" />
        </div>
      </div>

      <div className="header_left">
        <Link className="don" to="/channel">
          <Video className="header_icon" />
        </Link>


        <Badge className="header_icon" badgeContent={4} color="secondary">
          <NotificatioIcon  />
        </Badge>
        {/* <Avatar src={data.profile} /> */}
        <Menu
          channel={state&&state.channel}
          userName={state.name}
          picture={state.profile}
        />
      </div>
    </div>
  );
}
