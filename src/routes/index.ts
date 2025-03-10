import type RouterItemType from '@/types/routerType'
import loadable from '@loadable/component'

const lazyWarpper = (compPath: string) => loadable(() => import(`@/pages${compPath}`))

export default [
  {
    path: '/home',
    key: 'Home',
    Component: lazyWarpper('/home'),
    menu: true,
    authKey: 'test-key',
    children: []
  },
  {
    path: '/snakeGame',
    key: 'SnakeGame',
    Component: lazyWarpper('/snakeGame'),
    menu: true,
    children: []
  },
  {
    path: '/treasureHunter',
    key: 'TreasureHunter',
    Component: lazyWarpper('/treasureHunter'),
    menu: true,
    children: []
  },
  {
    path: '/animation',
    key: 'AnimationPage',
    Component: lazyWarpper('/animation'),
    menu: true,
    children: []
  },
  {
    path: '/panorama',
    key: 'panorama',
    Component: lazyWarpper('/panorama'),
    menu: true,
    children: []
  },
  {
    path: '/showModels',
    key: 'showModels',
    Component: lazyWarpper('/showModels'),
    menu: true,
    children: []
  },
  {
    path: '/test',
    key: 'test',
    Component: lazyWarpper('/test'),
    menu: true,
    children: []
  }
] as RouterItemType[]