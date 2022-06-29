import "./Banner.scss";
import loadIcon from "../Elements/IconLoader/icon-loader.js";

export default function Banner(props) {
  const svgProps = {
    width: props.size === "m" ? 24 : 16,
    height: props.size === "m" ? 24 : 16,
    "stroke-width": 1.5,
  };

  return (
    <div
      className={`banner_${props.theme}`}
    >
      {props.iconLeft || props.iconRight ? (
        <div className="banner__content">
          {props.iconLeft && loadIcon(props.iconLeft, {width: 24, height: 24})}
          <span>{props.content}</span>
          {props.iconRight && loadIcon(props.iconRight, svgProps)}
        </div>
      ) : (
        <span>{props.content}</span>
      )}
    </div>
  );
}
