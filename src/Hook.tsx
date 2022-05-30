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

export const Search = () => {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [tempSearch, setTempSearch] = useState("it-kamasutra");
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

  return (
    <div className={style.container}>
      <div>
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
              setSearchTerm(tempSearch);
            }}
          >
            find
          </button>
        </div>
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
        <div>Details</div>
      </div>
    </div>
  );
};
