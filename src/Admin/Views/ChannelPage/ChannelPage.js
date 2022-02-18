import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import "./bootstrap.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios";
import "./UserPage.css";
// const server="http://localhost:8000/admin"
const server="https://y-clone.xyz/admin"

function ChannelPage() {
    let [user, setUser] = useState([]);
  useEffect(() => {
    axios.get(server+"/channels").then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  }, []);
  return (
    <div className="all_users">
      <Navbar />
      <h1>All Channels</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>channelName</th>
            <th>Subscribers</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.channelName}</td>
                <td>{item.subscribers&&item.subscribers.length}</td>
                {item.verified ? (
                  <td
                    className="btn btn-primary"
                  >
                    Verified
                  </td>
                ) : (
                  <td
                    onClick={() => {
                      axios
                        .get(server+"/channel-verify", {
                          params: {
                            id: item._id,
                          },
                        })
                        .then((response) => {
                          setUser(response.data)
                        });
                    }}
                    className="btn btn-success"
                  >
                    Verify
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ChannelPage
