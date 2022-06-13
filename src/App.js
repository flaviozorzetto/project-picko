import React, { useState } from 'react';
import Button from './components/Button/Button.js';
import Card from './components/Card/Card.js';
import Tabs from './components/Navigation/Tabs.js';
import TabPanel from './components/Navigation/TabPanel.js';
import './styles/index.scss';

export default function App() {
   const labels = ['Label', 'Label', 'Label'];
   const [value, setValue] = useState(0);
   const identifier = 'panel';

   return (
      <div style={{ width: '600px', margin: '1rem' }}>
         <Card />
         <Button type="primary" size="m">
            Primary
         </Button>
         <Tabs
            identifier={identifier}
            labels={labels}
            setValue={setValue}
            value={value}
         />
         <TabPanel identifier={identifier} value={value} index={0}>
            Item 1
         </TabPanel>
         <TabPanel identifier={identifier} value={value} index={1}>
            Item 2
         </TabPanel>
         <TabPanel identifier={identifier} value={value} index={2}>
            Item 3
         </TabPanel>
      </div>
   );
}
