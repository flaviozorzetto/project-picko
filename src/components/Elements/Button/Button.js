import './Button.scss';

export default function Button(props) {
   return (
      <button
         onClick={props.onClick}
         className={`button_${props.type} button_${props.type}_${props.size}`}
      >
         {props.children}
      </button>
   );
}
