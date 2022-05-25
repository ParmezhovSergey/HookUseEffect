import style from "./Hook.module.css";

export const Search = () => {
  return (
    <div className={style.container}>
      <div>
        <div>
          <input placeholder="search" />
          <button>find</button>
        </div>
        <ul>
          {["Dimych", "Artem"].map((u) => (
            <li>{u}</li>
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
