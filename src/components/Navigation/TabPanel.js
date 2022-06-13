export default function TabPanel(props) {
   return (
      <div
         id={`${props.identifier}-${props.index}`}
         role="tabpanel"
         hidden={props.value !== props.index}
      >
         {props.children}
      </div>
   );
}
