import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Hook.module.css";

type SearchUserType = {
  login: string;
  id: number;
};
type SearchResault = {
  items: SearchUserType[];
};
type UserType = {
  login: string;
  id: number;
  avatar_url: string;
  followers: number;
};

type SearchPropsType = {
  value: string;
  onSubmit: (fixedValue: string) => void;
};

export const SearchString = (props: SearchPropsType) => {
  const [tempSearch, setTempSearch] = useState("");

  useEffect(() => {
    setTempSearch(props.value);
  }, [props.value]);

  return (
    <div>
      <input
        placeholder="search"
        value={tempSearch}
        onChange={(e) => {
          setTempSearch(e.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          props.onSubmit(tempSearch);
        }}
      >
        find
      </button>
    </div>
  );
};

type UserListPropsTtpe = {
  term: string;
  selectedUser: SearchUserType | null;
  onUserSelect: (user: SearchUserType) => void;
};

export const UserList = (props: UserListPropsTtpe) => {
  const [users, setUsers] = useState<SearchUserType[]>([]);

  useEffect(() => {
    axios
      .get<SearchResault>(`https://api.github.com/search/users?q=${props.term}`)
      .then((res) => {
        setUsers(res.data.items);
      });
  }, [props.term]);

  return (
    <ul>
      {users.map((u) => (
        <li
          key={u.id}
          className={props.selectedUser === u ? style.selected : ""}
          onClick={() => {
            props.onUserSelect(u);
          }}
        >
          {u.login}
        </li>
      ))}
    </ul>
  );
};

type TimerProps = {
  seconds: number;
  onChange: (actualSeconds: number) => void;
  timerKey: string;
};

export const Timer = (props: TimerProps) => {
  const [seconds, setSeconds] = useState(props.seconds);

  useEffect(() => {
    setSeconds(props.seconds);
  }, [props.seconds]);

  useEffect(() => {
    props.onChange(seconds);
  }, [seconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [props.timerKey]);

  return <div>{seconds}</div>;
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

export const Search = () => {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);

  const [searchTerm, setSearchTerm] = useState("it-kamasutra");

  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  return (
    <div className={style.container}>
      <div>
        <SearchString
          value={searchTerm}
          onSubmit={(value: string) => {
            setSearchTerm(value);
          }}
        />

        <button
          className={style.button}
          onClick={() => {
            setSearchTerm("it-kamasutra");
          }}
        >
          reset
        </button>

        <UserList
          term={searchTerm}
          selectedUser={selectedUser}
          onUserSelect={(user) => {
            setSelectedUser(user);
          }}
        />
      </div>

      <UserDetails user={selectedUser} />
    </div>
  );
};
