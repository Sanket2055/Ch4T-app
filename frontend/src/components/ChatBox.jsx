import { Box } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context/chatProvider";
import { useMediaQuery } from "@chakra-ui/react";
import SingleChat from "./SingleChat.jsx";
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const chatState = () => {
    return useContext(ChatContext);
  };
  const { selectedChat } = chatState();
  const isMd = useMediaQuery("(max-width: 767px)");

  return (
    <Box
      display={{ base: selectedChat ? "flex" : isMd[0] ? "flex" : "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
