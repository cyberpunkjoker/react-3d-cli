/**
 * 1. 页面基本Ui组件
 * 2. 充当路由守卫，控制页面的权限 等
 */
import React from 'react';
import { Navigate } from "react-router-dom";
import locales from "@/locales"

interface IProps {
  children?: React.ReactNode;
  routeInfo: {
    /** 页面路径 */
    path: string;
    /** 页面名称-key */
    key: string;
    /** 页面权限 */
    authKey: string;
  };
}

const { menu } = locales;

const BaseCard:React.FC<IProps> = (props) => {
  const { children, routeInfo } = props;
  const { authKey, key, path } = routeInfo;

  const hasAuth = () => {
    // authKey
    return true
  }
  
  // 页面权限控制
  if (!hasAuth()) {
    return <Navigate to={'/home'} replace/>;
  }

  return (
    <div>
      <div>{ menu[key] }</div>
      { children }
    </div>
  );
};

export default BaseCard;