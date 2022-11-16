import { NextPage } from "next";
import styles from "./Dev.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface Todo {
  name: string;
}
const todos: Todo[] = [
  { name: "Component Name 정리하기" },
  { name: "Array 조작 함수 고치기" },
];

const Todo = ({ todo, index }: { todo: Todo; index: number }) => {
  return (
    <li>
      <span>{index}. </span>
      <span>{todo.name}</span>
    </li>
  );
};

const Dev: NextPage = () => {
  return (
    <article className={cx("Dev")}>
      <div className={cx("TodosWrapper")}>
        <h1>할일</h1>
        <ol className={cx("Todos")}>
          {todos.map((todo, index) => (
            <Todo todo={todo} index={index} />
          ))}
        </ol>
      </div>
    </article>
  );
};

export default Dev;
