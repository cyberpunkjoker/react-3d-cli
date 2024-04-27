import React from'react';
import {BrowserRouter as Router } from 'react-router-dom';
import LayoutMenu from './layoutMenu';
import LayoutContent from './layoutContent';

const layouts:React.FC = () => {
  return (
    <div className='layoutWapper'>
      <Router>
        <LayoutMenu></LayoutMenu>
        <LayoutContent></LayoutContent>
      </Router>
    </div>
  )
}

export default layouts;