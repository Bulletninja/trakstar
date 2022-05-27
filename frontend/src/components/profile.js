import { Box, HStack, Avatar } from "@chakra-ui/react";
export function Profile({ user }) {
  return (
    <Box minW="300px">
      <HStack>
        <Box>
          <Avatar size="md" name={user.username} src={user.profile.pic} />
        </Box>
        <Box>
          <Box>{user.username}</Box>
          <Box>{user.profile.kudos_budget} kudos left</Box>
        </Box>
      </HStack>
    </Box>
  );
}
