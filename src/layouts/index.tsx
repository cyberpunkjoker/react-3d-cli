import React from'react';
import {BrowserRouter as Router } from 'react-router-dom';
import LayoutMenu from './layoutMenu';
import LayoutContent from './layoutContent';
import useShowMenu from '@/hooks/useShowMenu';

const layouts:React.FC = () => {
  const { showMenu } = useShowMenu()

  return (
    <div className='layoutWapper'>
      <Router basename="/games">
         { !showMenu && <LayoutMenu></LayoutMenu>}
        <LayoutContent></LayoutContent>
      </Router>
    </div>
  )
}

export default layouts;