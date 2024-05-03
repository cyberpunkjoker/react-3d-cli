import React from 'react';
import { Link, matchPath } from 'react-router-dom';
import routes from '@/routes';
import locales from '@/locales';
import '../index.less';
import type RouterItemType from '@/types/routerType';

const { menu } = locales

// 预加载组件
const LinkWithPreload = (props) => {
  const { component, ...rest } = props
  const onMouseEnter = () => {
   
    if (component) {
      component.preload()
    }
  }

  return <Link {...rest} onMouseEnter={onMouseEnter} />
}

const LayoutMenu: React.FC = () => {
  const renderRoutes = () => {
    return routes.map((route: RouterItemType, index: number) => {

      const { path, key, component } = route;
      return (
        <div key={key}>
          <LinkWithPreload to={path} component={component}>{menu[route.key]}</LinkWithPreload>
        </div>
      )
    })
  }


  return (
    <div className='layoutMenu'>
      {renderRoutes()}
    </div>
  )
};

export default LayoutMenu;