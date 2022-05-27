import { Flex, Avatar, Button, Heading, Box } from "@chakra-ui/react";
import {
  useUser,
  useProfile,
  useProfiles,
  useReceivedKudos,
  useSentKudos
} from "../libs/hooks";
import { Profile } from "./profile";
import { localStorageKey } from "../libs/auth";

export const Footer = ({ user }) => {
  return (
    user && (
      <Flex
        position="fixed"
        left={0}
        bottom={0}
        w="100%"
        h="60px"
        bgColor="red"
        alignItems="center"
        justifyContent="center"
      >
        <Box pr={1}>
          You are logged in as <b>{user.username}</b>{" "}
        </Box>
        <Avatar
          // size="xl"
          name="user name"
          src={
            "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
          }
          // boxSize="200px"
          // objectFit="contain"
          // alt="logo"
        />
      </Flex>
    )
  );
};

export function Layout({
  children,
  token,
  user,
  forceAppUpdate,
  isMine = true
}) {
  return (
    <>
      <Flex bg="linear-gradient(0.25turn, #BD9334,lightyellow)">
        <Profile user={user} />
        <Flex
          alignSelf="center"
          // justifyContent="center"
          pl="50px"
        >
          <Heading
            textShadow="-1px 0 0.2em black, 0 1px 0.2em black, 1px 0 0.2em black, 0 -1px 0.2em black"
            color="white"
          >
            Kudos
          </Heading>
        </Flex>
        <Flex position="absolute" top="0" right="0">
          <Button
            onClick={() => {
              localStorage.removeItem(localStorageKey);
              forceAppUpdate();
            }}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
      {children}
      <Footer user={user} />
    </>
  );
}
