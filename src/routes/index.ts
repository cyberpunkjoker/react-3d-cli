import type RouterItemType from '@/types/routerType'

export default [
  {
    path: '/home',
    key: 'Home',
    menu: true,
    children: []
  },
  {  
    path: '/snakeGame',
    key: 'SnakeGame',
    menu: true,
    children: []
  },
  {
    path: '/animation',
    key: 'AnimationPage',
    menu: true,
    children: []
  }
] as RouterItemType[]