import {
  Flex,
  Heading,
  Box,
  HStack,
  Avatar,
  Stack,
  Button,
  Textarea,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useToken } from "../libs/auth";
import { useKudos } from "../libs/hooks";
import { useReducer } from "react";
import { useSWRConfig } from "swr";

export function Kudos({ token, user, forceAppUpdate, isMine = true }) {
  const { kudos } = useKudos(user.username);
  // console.log(`kudos: ${JSON.stringify(kudos)}`);
  return (
    <>
      {/* <pre>{JSON.stringify(kudos, null, 2)}</pre> */}
      {kudos &&
        kudos.map((kudo, i) => (
          <KudosElement
            key={i}
            from={kudo.from_user}
            to={kudo.to_user}
            message={kudo.message}
          />
        ))}
      {!isMine && <KudosForm to_username={user.username} />}
    </>
  );
}

const KudosElement = ({ from, to, message }) => {
  return (
    <Box
      mx="auto"
      borderColor="black"
      borderWidth={1}
      borderRadius="10px"
      boxShadow="md"
      my={1}
      p={1}
      maxWidth="40%"
    >
      <HStack>
        <Avatar size="xs" name={from.username} src={from.profile.pic} />
        <Box>{from.username}:</Box>
      </HStack>
      <HStack pl="15%">
        <Box>{message}</Box>
      </HStack>
    </Box>
  );
};

const KudosForm = ({ to_username }) => {
  const { mutate } = useSWRConfig();
  const token = useToken();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  function onSubmit(values) {
    return fetch("http://127.0.0.1:8000/api/kudos/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        ...values,
        ...{ to_username }
      })
    }).then((response) => {
      // mutate("http://127.0.0.1:8000/api/kudos");
      window.location.reload();
    });
  }
  return (
    <Stack mx="auto" borderColor="black" my={1} p={1} maxWidth="40%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack>
          <FormControl isInvalid={errors.name}>
            {/* <FormLabel htmlFor="message">Message</FormLabel> */}
            <Textarea
              id="message"
              placeholder="Your message goes here"
              {...register("message", {})}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            size="lg"
            colorScheme="yellow"
            variant="outline"
          >
            Kudos!
          </Button>
        </HStack>
      </form>
    </Stack>
  );
};
