import React, { useState } from 'react';
import Button from './components/Elements/Button/Button.js';
import Card from './components/Card/Card.js';
import Tabs from './components/Navigation/Tab/Tabs.js';
import TabPanel from './components/Navigation/Tab/TabPanel.js';
import NavBar from './components/Navigation/NavBar/NavBar.js';
import Header from './components/Elements/Header/Header.js';
import xSvg from './assets/svgs/x.svg';
import './styles/index.scss';

export default function App() {
   const labels = ['Label', 'Label', 'Label'];
   const [value, setValue] = useState(0);
   const identifier = 'panel';
   console.log(xSvg);

   return (
      <div style={{ width: '600px', margin: '1rem' }}>
         <Card />
         <Button type="primary" size="m">
            Primary
         </Button>
         <Button type="secondary" size="p">
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
         <NavBar>
            <h2>Test</h2>
            <Tabs
               identifier={identifier}
               labels={labels}
               setValue={setValue}
               value={value}
            />
            <h2>Test</h2>
         </NavBar>
         <Header title="Interview">
            <img src={xSvg} alt="logo" />
         </Header>
      </div>
   );
}
