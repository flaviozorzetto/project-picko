import './NavBar.scss';

export default function NavBar(props) {
   return (
      <nav className="navbar">
         <ul className="navbar__list">
            {props.children.map((elem, index) => (
               <li key={index}>{elem}</li>
            ))}
         </ul>
      </nav>
   );
}
