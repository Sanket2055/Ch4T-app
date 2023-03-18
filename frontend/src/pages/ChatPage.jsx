import React, { useEffect, useState } from "react";
import axios from "axios";
// import { ChatState } from "../context/ChatProvider";
import { Box, Container, Text } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatContext } from "../context/chatProvider";
import { useContext } from "react";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/Mychats";
const ChatPage = () => {
  const ChatState = () => {
    return useContext(ChatContext);
  };
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
