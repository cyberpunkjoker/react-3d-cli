import type RouterItemType from '@/types/routerType'
import LoadingPage from '@/components/LoadingPage';

import loadable from '@loadable/component'

const lazyWarpper = (compPath: string) => loadable(() => import(`@/pages${compPath}`))

export default [
  {
    path: '/home',
    key: 'Home',
    component: lazyWarpper('/home'),
    menu: true,
    children: []
  },
  { 
    path: '/snakeGame',
    key: 'SnakeGame',
    component: lazyWarpper('/snakeGame'),
    menu: true,
    children: []
  },
  {
    path: '/animation',
    key: 'AnimationPage',
    component: lazyWarpper('/animation'),
    menu: true,
    children: []
  }
] as RouterItemType[]