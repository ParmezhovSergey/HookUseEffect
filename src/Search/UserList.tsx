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
