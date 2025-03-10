import React, { FC, useEffect, useState } from "react";
import { Button, ButtonProps, message } from "antd";
import classnames from "classnames";
import "./test.less";
import { getUserRole, UserRoleType } from "./query";

type Props = ButtonProps;

// 身份文案 Mapper
const mapper: Record<UserRoleType, string> = {
  user: "普通用户",
  admin: "管理员",
};

const AuthButton: FC<Props> = (props) => {
  const { children, className, ...restProps } = props;

  const [userType, setUserType] = useState<UserRoleType>();

  // 获取用户身份并设置
  const getLoginState = async () => {
    const res = await getUserRole();
    setUserType(res.data.userType);
  };

  useEffect(() => {
    getLoginState().catch((e) => message.error(e.message));
  }, []);

  return (
    <Button {...restProps} className={classnames(className, "authButton")}>
      {mapper[userType!] || ""}
      {children}
    </Button>
  );
};

export default AuthButton;