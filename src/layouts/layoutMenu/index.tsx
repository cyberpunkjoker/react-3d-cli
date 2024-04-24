import React from 'react';
 import { Link } from 'react-router-dom';
import routes from '@/routes';
import locales from '@/locales';
import '../index.less';
import type RouterItemType from '@/types/routerType';

const { menu } = locales

const LayoutMenu: React.FC = () => {
  
  const renderRoutes = () => {
    return routes.map((route: RouterItemType, index: number) => {

      const { path, key } = route;
      return (
        <div key={key}>
          {/* <Link to={path}>{menu[route.key]}</Link> */}
        </div>
      )
    })
  }


  return (
    <div className='layoutMenu'>
      当年的
      {renderRoutes()}
    </div>
  )
};

export default LayoutMenu;