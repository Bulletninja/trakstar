import { Button, Input } from "@chakra-ui/react";
import { useState, useReducer } from "react";
import { useSWRConfig } from "swr";
export const localStorageKey = "my-key-321";
export const useToken = () => {
  return localStorage.getItem(localStorageKey);
};
const isEmpty = (obj) => {
  for (var i in obj) return false;
  return true;
};

export const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onClick = (e) => {
    // e.preventDefault();
    fetch("http://127.0.0.1:8000/api-token-auth/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        response.json().then((jsonResponse) => {
          if (isEmpty(jsonResponse)) {
            console.log("Response is empty");
          } else {
            const { username, token } = jsonResponse;
            localStorage.setItem("username", username);
            localStorage.setItem(localStorageKey, token);
            console.log("redirecting");
            window.location.href = `/p/${username}`;
          }
        });
        // .catch((e) => console.log(`Error: ${JSON.stringify(e, null, 4)}`));
      })
      .catch((e) => console.log(`Error: ${JSON.stringify(e, null, 4)}`));
  };
  return (
    <>
      <form>
        <Input
          type="text"
          id="username"
          placeholder="username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <Input
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Button onClick={(e) => onClick(e)}>Login</Button>
      </form>
    </>
  );
};
