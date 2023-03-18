import React from "react";
import { useEffect, useState } from "react";
import { ChatContext } from "./context/chatProvider";
import { useHistory } from "react-router-dom";

import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import "./App.css";
const App = () => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
  }, [history]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, setSelectedChat, selectedChat, chats, setChats }}
    >
      <div className="App">
        <Route path="/" exact component={HomePage} />
        <Route path="/chat" component={ChatPage} />
      </div>
    </ChatContext.Provider>
  );
};

export default App;
