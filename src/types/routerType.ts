export default interface RouterItemType {
  /** 路由地址 */
  path: string;
  /** 路由名称 */
  key: string;
  /** 组件开启状态 */
  menu: boolean;
  /** 子路由 */
  children: RouterItemType[];
}