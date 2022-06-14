import './Card.scss';
import Badge from '../Elements/Badge/Badge';

export default function Card(props) {
   return (
      <div className="card">
         <div className="card__content">
            <div className="card__content__main">
               <span className="card__title">Senior UI Designer</span>
               <Badge type="completed" />
            </div>
            <div className="card__content__details">
               <p>
                  Creation date: <span>February 8, 2022</span>
               </p>
            </div>
         </div>
         <div className="card__status">
            <div>
               <span className="card__status__title">20</span>
               <p className="card__status__subtitle">Candidates</p>
            </div>
            <div>
               <span className="card__status__title">12</span>
               <p className="card__status__subtitle">Interviews done</p>
            </div>
         </div>
      </div>
   );
}
