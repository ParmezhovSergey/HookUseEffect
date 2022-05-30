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



export const Search = () => {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  const [userDetails, setUserDetails] = useState<null | UserType>(null);
  const [users, setUsers] = useState<SearchUserType[]>([]);
  // const [tempSearch, setTempSearch] = useState("it-kamasutra");
  const [searchTerm, setSearchTerm] = useState("it-kamasutra");

  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  useEffect(() => {
    axios
      .get<SearchResault>(`https://api.github.com/search/users?q=${searchTerm}`)
      .then((res) => {
        setUsers(res.data.items);
      });
  }, [searchTerm]);

  useEffect(() => {
    if (!!selectedUser) {
      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then((res) => {
          setUserDetails(res.data);
        });
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
        <button className={style.button}
          onClick={() => {
            setSearchTerm("it-kamasutra");
          }}
        >
          reset
        </button>
        {/* <div>
          <input
            placeholder="search"
            value={tempSearch}
            onChange={(e) => {
              setTempSearch(e.currentTarget.value);
            }}
          />
          <button
            onClick={() => {
              setSearchTerm(tempSearch);
            }}
          >
            find
          </button>
        </div> */}
        <ul>
          {users.map((u) => (
            <li
              key={u.id}
              className={selectedUser === u ? style.selected : ""}
              onClick={() => {
                setSelectedUser(u);
              }}
            >
              {u.login}
            </li>
          ))}
        </ul>
      </div>
      <div className={style.details}>
        <h2 className={style.username}>UserName</h2>
        {userDetails && (
          <div>
            <img alt="" src={userDetails.avatar_url} />
            <br />
            {userDetails.login}, followers: {userDetails.followers}
          </div>
        )}
      </div>
    </div>
  );
};
