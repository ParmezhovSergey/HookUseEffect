import { useEffect, useState } from "react";
import style from "./Hook.module.css";
import { SearchString } from "./SearchString";
import { UserDetails } from "./UserDetails";
import { UserList } from "./UserList";

type SearchUserType = {
  login: string;
  id: number;
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
