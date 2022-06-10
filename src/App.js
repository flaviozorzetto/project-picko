import React from 'react';
import Button from './components/Button/Button.js';
import Card from './components/Card/Card.js';
import './styles/index.scss';

export default function App() {
   return (
      <div style={{ width: '1000px', margin: '1rem' }}>
         <Card />
         <Button type="primary" size="m">
            Primary
         </Button>
      </div>
   );
}
