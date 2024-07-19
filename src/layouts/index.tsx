import React from'react';
import {HashRouter as Router } from 'react-router-dom';
import LayoutMenu from './layoutMenu';
import LayoutContent from './layoutContent';
import useShowMenu from '@/hooks/useShowMenu';

const layouts:React.FC = () => {
  const { showMenu } = useShowMenu()

  return (
    <div className='layoutWapper'>
      <Router>
         { !showMenu && <LayoutMenu></LayoutMenu>}
        <LayoutContent></LayoutContent>
      </Router>
    </div>
  )
}

export default layouts;