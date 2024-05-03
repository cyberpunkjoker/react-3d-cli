export default interface RouterItemType {
  /** 路由地址 */
  path: string;
  /** 路由名称 - 菜单名称key */
  key: string;
  /** 组件开启状态 */
  menu: boolean;
  /** 子路由 */
  children: RouterItemType[];
  /** 路由组件 */
  Component: any;
  /** 路由权限 */
  authKey: string;
}