import React from'react';

import LayoutMenu from './layoutMenu';
import LayoutContent from './layoutContent';

const layouts:React.FC = () => {
  return (
    <div className='layoutWapper'>
      <LayoutMenu></LayoutMenu>
      <LayoutContent></LayoutContent>
    </div>
  )
}

export default layouts;