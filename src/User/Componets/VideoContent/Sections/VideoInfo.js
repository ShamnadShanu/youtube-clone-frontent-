import React, { useEffect, useState } from "react";
import "../VideoContent.css";
import ThumbUpAltSharpIcon from "@material-ui/icons/ThumbUpAltSharp";
import ThumbDownSharpIcon from "@material-ui/icons/ThumbDownSharp";
import ShareSharpIcon from "@material-ui/icons/ShareSharp";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Moment from "react-moment";
import { useHistory } from "react-router";
import VerifiedIcon from "@material-ui/icons/CheckCircleOutlineOutlined"
import ReportIcon from "@material-ui/icons/Report";
import { Link } from "react-router-dom";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { server } from "../../../../server";

function VideoInfo(props) {
  const url = window.location.href;
  console.log(props);
  let [Error, setError] = useState();
  let [copy, setCopy] = useState();
  let [True, setTrue] = useState();
  let [more, setMore] = useState(false);
  let history = useHistory();
  let [subCount, setSubCount] = useState();
  let [subscribed, setSubscribed] = useState(false);
  let [liked, setLiked] = useState(false);
  let [disliked, setDisliked] = useState();
  let [likeCount, setLikeCount] = useState(0);
  let [dislikeCount, setDislikeCount] = useState(0);
  let [views, setViews] = useState();
  let [verified,setVerified]=useState()
  function truncateText(item) {
    if (item.title.length > 67) {
      var truncated = item.title.substr(0, 60) + "...";
    } else {
      return item.title;
    }
    return truncated;
  }

  useEffect(() => {
    axios
      .post(server+"/getSubscribers", {
        channelId: props.props.channelId,
        token: localStorage.getItem("token"),
      })
      .then((response) => {
        console.log(response.data);
        setSubCount(response.data.response);
        if (response.data.subscribed) {
          setSubscribed(true);
        }
      });
    axios
      .post(
        server+
        "/getLikes",
        { videoId: props.props._id ,token:localStorage.getItem("token")},
      )
      .then((response) => {
        console.log(response.data);
        setLikeCount(response.data.response.like);
        setDislikeCount(response.data.response.dislike);
        if (response.data.liked) {
          setLiked(true);
        } else if (response.data.disliked) {
          setDisliked(true);
        }
      });
    if (props.props.views) {
      setViews(props.props.views.length);
    } else {
      setViews(0);
    }
    axios
      .post(
        server+"/channelview",
        {
          channelId: props.props.channelId,token:localStorage.getItem("token")
        }
      ).then((response)=>{
setVerified(response.data.response.verified)
      })
      

  }, []);
  return (
    <div className="video-info">
      <h1>{truncateText(props.props)}</h1>
      <div className="flexer">
        <div className="start">
          <span>{views}</span>
          <p>views</p>.
          <p>
            <Moment format="YYYY/MM/DD">{props.props.timestamp}</Moment>
          </p>
        </div>
        <div className="end">
          {liked ? (
            <ThumbUpAltSharpIcon
              className="hoverr"
              style={{ color: "blue" }}
              onClick={() => {
                axios
                  .post(
                    server+
                    "/unlike",
                    { videoId: props.props._id,token: localStorage.getItem("token")}
                  )
                  .then((response) => {
                    setLikeCount(response.data.like);
                    setLiked(false);
                  });
              }}
            />
          ) : (
            <ThumbUpAltSharpIcon
              className="hoverr"
              onClick={() => {
                {
                  localStorage.getItem("token")
                    ? axios
                        .post(
                          server+
                          "/like",
                          { videoId: props.props._id,token: localStorage.getItem("token") }
                        )
                        .then((response) => {
                          setLikeCount(response.data.like);
                          setDislikeCount(response.data.dislike);
                          setLiked(true);
                          setDisliked(false);
                        })
                    : history.push({
                        pathname: "/login",
                        state: {
                          redl: props.props,
                        },
                      });
                }
              }}
            />
          )}
          <span>{likeCount}</span>
          {disliked ? (
            <ThumbDownSharpIcon
              className="hoverr"
              style={{ color: "blue" }}
              onClick={() => {
                axios
                  .post(
                    server+
                    "/undislike",
                    { videoId: props.props._id,token: localStorage.getItem("token") }
                  )
                  .then((response) => {
                    setDislikeCount(response.data.dislike);
                    setDisliked(false);
                  });
              }}
            />
          ) : (
            <ThumbDownSharpIcon
              className="hoverr"
              onClick={() => {
                {
                  localStorage.getItem("token")
                    ? axios
                        .post(
                          server+
                          "/dislike",
                          { videoId: props.props._id,token: localStorage.getItem("token")}
                        )
                        .then((response) => {
                          setDislikeCount(response.data.dislike);
                          setLikeCount(response.data.like);
                          setDisliked(true);
                          setLiked(false);
                        })
                    : history.push({
                        pathname: "/login",
                        state: {
                          reds: props.props,
                        },
                      });
                }
              }}
            />
          )}
          <span>{dislikeCount}</span>
          <CopyToClipboard text={url}>
            <ShareSharpIcon
              onClick={() => {
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 1000);
              }}
            />
          </CopyToClipboard>
          <ReportIcon
            onClick={() => {
              axios
                .post(
                  server+
                  "/report",
                  { videoId: props.props._id,token: localStorage.getItem("token") },
                 
                )
                .then((response) => {
                  if (response.data) {
                    setTrue(true);
                    setTimeout(() => {
                      setTrue(false);
                    }, 1000);
                  } else {
                    setError(true);
                    setTimeout(() => {
                      setError(false);
                    }, 1000);
                  }
                });
            }}
          />
          <Popover
            id="K"
            open={True}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <Typography className="pooop">
              Your request has been submitted
            </Typography>
          </Popover>
          <Popover
            id="K"
            open={Error}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <Typography className="poop">
              You hava already made this request
            </Typography>
          </Popover>
          <Popover
            id="K"
            open={copy}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <Typography className="peop">Link copied</Typography>
          </Popover>
        </div>
      </div>
      <hr />
      <div className="videoCard_info-w">
        <Link
          className="don"
          to={{
            pathname: "/channelview",
            state: {
              channelId: props.props.channelId,
            },
          }}
        >
          <Avatar
            src={props.props.channelImage}
            className="videoCard_avatar-w"
          />
        </Link>

        <div
          style={
            more
              ? {
                  display: "flex",
                  flex: "0.2",
                  flexDirection: "column",
                  height: "auto",
                }
              : null
          }
          className="video_text-w"
        >
          <Link
            className="don"
            to={{
              pathname: "/channelview",
              state: {
                channelId: props.props.channelId,
              },
            }}
          >
              <h4>{props.props.channelName}{verified&&<VerifiedIcon style={{width:"15px"}}/>}</h4>{" "}
          </Link>

          <p>
            <span>{subCount}</span> subscribers
          </p>
          <div
            style={
              more
                ? {
                    display: "flex",
                    width: "600px",
                    overflow: "auto",
                    height: "auto",
                    flexDirection: "column",
                    margin: "0",
                    marginTop: "10px",
                  }
                : {
                    width: "600px",
                    overflow: "hidden",
                    height: "40px",
                    display: "flex",
                    flexDirection: "column",
                    margin: "0",
                    marginTop: "10px",
                  }
            }
          >
            <p>{props.props.discription}</p>
          </div>
          {props.props.discription.length > 90 ? (
            more ? (
              <p
                onClick={() => {
                  setMore(false);
                }}
                className="show"
              >
                SHOW LESS
              </p>
            ) : (
              <p
                onClick={() => {
                  setMore(true);
                }}
                className="show"
              >
                SHOW MORE
              </p>
            )
          ) : null}
        </div>
        <div className="video_text-end">
          {subscribed ? (
            <>
              <Button
                onClick={() => {
                  axios
                    .post(
                      server+
                      "/unsubscribe",
                      { channelId: props.props.channelId ,token: localStorage.getItem("token")}
                    )
                    .then((response) => {
                      setSubCount(response.data);
                      setSubscribed(false);
                    });
                }}
                className="subcribed_button"
              >
                SUBSCRIBED
              </Button>
              
            </>
          ) : (
            <Button
              onClick={() => {
                {
                  localStorage.getItem("token")
                    ? axios
                        .post(
                          server+
                          "/subscribe",
                          { channelId: props.props.channelId ,token: localStorage.getItem("token")}
                        )
                        .then((response) => {
                          setSubCount(response.data);
                          setSubscribed(true);
                        })
                    : history.push({
                        pathname: "/login",
                        state: {
                          red: props.props,
                        },
                      });
                }
              }}
              className="subcribe_button"
            >
              SUBSCRIBE
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoInfo;
