import { EdgeMarkDown } from "../../../store/base/markDown";

interface MarkDownParserProps {
  edgeMarkDown: EdgeMarkDown;
}

const MarkDownParser = ({ edgeMarkDown }: MarkDownParserProps) => {
  if (edgeMarkDown.type === "ul" || edgeMarkDown.type === "ol") {
    switch (edgeMarkDown.type) {
      case "ol":
        return (
          <ol>
            {/*{edgeMarkDown..map((listItem) => (*/}
            {/*  <li key={nanoid(5)}>{listItem}</li>*/}
            {/*))}*/}
          </ol>
        );
      case "ul":
        return (
          <ul>
            {/*{edgeMarkDown.listItems.map((listItem) => (*/}
            {/*  <li key={nanoid(5)}>{listItem}</li>*/}
            {/*))}*/}
          </ul>
        );
    }
  } else {
    switch (edgeMarkDown.type) {
      case "h1":
        return <h1>{edgeMarkDown.innerText}</h1>;
      case "h2":
        return <h2>{edgeMarkDown.innerText}</h2>;
      case "h3":
        return <h3>{edgeMarkDown.innerText}</h3>;
      case "h4":
        return <h4>{edgeMarkDown.innerText}</h4>;
      case "p":
        return <p>{edgeMarkDown.innerText}</p>;
      default:
        return <div>unknown markDown Input</div>;
    }
  }
};

export default MarkDownParser;
