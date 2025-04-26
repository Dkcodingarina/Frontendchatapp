import React, { useEffect, useRef, useState } from "react";

const Chat = ({ socket, username, room }) => {
  let [currentmsg, setCurrentmsg] = useState("");
  let [messagelist, setMessagelist] = useState([]);

  const sendmsg = async () => {
    if (currentmsg !== "") {
      const massagedata = {
        id: Math.floor(Math.random() * 1000),
        room: room,
        author: username,
        message: currentmsg,
        time:
          new Date().getHours() +
          ":" +
          new Date().getMinutes().toString().padStart(2, "0"),
      };

      await socket.emit("send_message", massagedata);
      setMessagelist((list) => [...list, massagedata]);
      setCurrentmsg("");
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessagelist((list) => [...list, data]);
    };
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  const constainrep = useRef(null);
  useEffect(() => {
    constainrep.current.scrollTop = constainrep.current.scrollHeight;
  }, [messagelist]);

  return (
    <>
      <div className="chat_container">
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.395)", color: "white" , width:"50%",marginLeft:"25%"}}>
          <h1>Welcome {username}</h1>
          <p>
            You're now in the {room} chat room. Crafted with care by Deepanshu
            Pawar.
          </p>
        </div>
        <div className="chat_box">
          <div
            className="auto_scrolling"
            ref={constainrep}
            style={{
              overflowY: "scroll",
              height: "450px",
            }}
          >
            {messagelist.map((data) => (
              <div
                key={data.id}
                className="message_content"
                id={username == data.author ? "you" : "other"}
              >
                <div>
                  <div className="msg" id={username == data.author ? "y" : "b"}>
                    <p>{data.message}</p>
                  </div>
                  <div className="msg_detail">
                    <p>{data.author}</p>
                    <p>{data.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat_body">
            <input
              type="text"
              value={currentmsg}
              placeholder="Type your message"
              className="typeing"
              onChange={(e) => setCurrentmsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendmsg()}
            />
            <button onClick={sendmsg}>&#9658;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
