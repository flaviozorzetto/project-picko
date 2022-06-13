import { React } from 'react';
import './Tabs.scss';

export default function Tabs(props) {
   return (
      <div
         className="tabs"
         id={props.identifier}
         role="tablist"
         aria-label="Tabs"
      >
         {props.labels.map((element, index) => {
            const identifier = `${props.identifier}-${index}`;
            const htmlLabel = (
               <button
                  role="tab"
                  className={`tab__label${
                     props.value === index ? ' tab__label_selected' : ''
                  }`}
                  key={index}
                  aria-controls={identifier}
                  aria-selected={props.value === index ? 'true' : 'false'}
                  onClick={() => {
                     props.setValue(index);
                  }}
               >
                  {element}
               </button>
            );

            return htmlLabel;
         })}
      </div>
   );
}
