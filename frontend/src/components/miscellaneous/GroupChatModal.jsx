import {
  Box,
  FormControl,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
// import the chat provider here
import { ChatContext } from "../../context/chatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const toast = useToast();
  const chatState = () => {
    return useContext(ChatContext);
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResults(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast({
        title: "Error while searching",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      toast({
        title: "Please enter a group name and select users",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let users = JSON.stringify(selectedUsers.map((user) => user._id));
      const { data } = await axios.post(
        "/api/chat/group",
        { name: groupChatName, users },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "Group chat created",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error while creating group chat",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      //   show a toast the user is already selected
      toast({
        title: "User already selected",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const handleDelete = (userToDelete) => {
    setSelectedUsers(selectedUsers.filter((user) => user !== userToDelete));
  };

  const { user, setSelectedChat, chats, setChats } = chatState();
  return (
    <Fragment>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Group Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  user={u}
                  key={u._id}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <Box w="100%">
                {searchResults?.slice(0, 4).map((user) => (
                  <UserListItem
                    user={user}
                    key={user._id}
                    handleFunction={() => handleGroup(user)}
                  />
                ))}
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default GroupChatModal;
