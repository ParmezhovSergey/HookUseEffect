import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Hook.module.css";
import { Timer } from "./Timer";

type SearchUserType = {
  login: string;
  id: number;
};

type UserType = {
  login: string;
  id: number;
  avatar_url: string;
  followers: number;
};

type UserDetailsPropsType = {
  user: SearchUserType | null;
};
export const UserDetails = (props: UserDetailsPropsType) => {
  const [userDetails, setUserDetails] = useState<null | UserType>(null);
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    if (!!props.user) {
      axios
        .get<UserType>(`https://api.github.com/users/${props.user.login}`)
        .then((res) => {
          setSeconds(10);
          setUserDetails(res.data);
        });
    }
  }, [props.user]);

  useEffect(() => {
    if (seconds < 1) {
      setUserDetails(null);
    }
  }, [seconds]);

  return (
    <div className={style.details}>
      {userDetails && (
        <div>
          <Timer
            seconds={seconds}
            onChange={(actualSeconds) => {
              setSeconds(actualSeconds);
            }}
            timerKey={userDetails.id.toString()}
          />
          <h2 className={style.username}>{userDetails.login}</h2>
          <img alt="" src={userDetails.avatar_url} />
          <br />
          {userDetails.login}, followers: {userDetails.followers}
        </div>
      )}
    </div>
  );
};
