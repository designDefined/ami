import { NextPage } from "next";
import { useUserStore } from "../store/api/user";
import axios from "axios";

const Login: NextPage = () => {
  const { user_id, password } = useUserStore((state) => state.request);
  const setRequest = useUserStore((state) => state.setRequest);
  return (
    <article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios.post("/api/login", {}).then((res) => console.log(res.data));
        }}
      >
        <input
          type="text"
          value={user_id}
          placeholder="아이디"
          onChange={(e) => {
            setRequest({ user_id: e.target.value });
          }}
        />
        <input
          type="text"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => {
            setRequest({ password: e.target.value });
          }}
        />
        <button type="submit">로그인</button>
      </form>
    </article>
  );
};

export default Login;
