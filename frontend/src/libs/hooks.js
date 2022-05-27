import { useToken } from "../libs/auth";
import useSWR from "swr";
const useUser = () => {
  const token = useToken();
  const { data: user } = useSWR(
    ["http://127.0.0.1:8000/api/me", token],
    (url, token) => {
      return fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      })
        .then((response) =>
          response
            .json()
            .then((jsonResponse) => {
              return { ...jsonResponse[0] };
            })
            .catch((e) => console.log(`Error: ${e}`))
        )
        .catch((e) => console.log(`Error: ${e}`));
    }
  );
  return { user, token };
};

const useKudos = (username) => {
  const token = useToken();
  const { data: kudos } = useSWR(
    [`http://127.0.0.1:8000/api/kudos`, token, username],
    (url, token) => {
      return fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      })
        .then((response) =>
          response
            .json()
            .then((jsonResponse) => {
              return jsonResponse.filter(
                (kudo) => kudo?.to_user?.username === username
              );
            })
            .catch((e) => console.log(`Error: ${e}`))
        )
        .catch((e) => console.log(`Error: ${e}`));
    }
  );

  return { kudos };
};
const useProfile = (username) => {
  const token = useToken();
  // const { username } = useParams();
  // console.log(`username: ${username}`);
  const { data: profile } = useSWR(
    [`http://127.0.0.1:8000/api/profiles/${username}`, token],
    (url, token) => {
      return fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      })
        .then((response) =>
          response
            .json()
            .then((jsonResponse) => {
              return jsonResponse;
            })
            .catch((e) => console.log(`Error: ${e}`))
        )
        .catch((e) => console.log(`Error: ${e}`));
    }
  );
  return profile;
};

const useProfiles = () => {
  const users = [
    {
      username: "jon",
      picture:
        "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      kudosBudget: 3
    },
    { username: "luis", picture: "", kudosBudget: 3 },
    {
      username: "dmitry",
      picture:
        "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      kudosBudget: 3
    },
    {
      username: "fernando",
      picture:
        "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
      kudosBudget: 3
    }
  ];
  return users;
};

let kudos = [
  {
    from_user: "luis",
    to_user: "jon",
    message: "excelent week! Kudos!"
  },
  {
    from_user: "jon",
    to_user: "dmitry",
    message: "excelent week! Kudos!"
  },
  {
    from_user: "jon",
    to_user: "luis",
    message: "excelent week! Kudos!"
  },
  {
    from_user: "dmitry",
    to_user: "luis",
    message: "excelent week! Kudos!"
  }
];
const useReceivedKudos = () => {
  const username = "luis";
  return kudos.filter((aKudos) => aKudos.to_user === username);
};

const useSentKudos = () => {
  const username = "luis";
  return kudos.filter((aKudos) => aKudos.from_user === username);
};

export {
  useUser,
  useProfile,
  useProfiles,
  useReceivedKudos,
  useSentKudos,
  useKudos
};
