import { render, screen } from "@testing-library/react";
import AuthButton from "@/pages/test/button";
import React from "react";
import server from "@/__mock__/server";
import { http, HttpResponse } from 'msw'
import { UserRoleType } from "@/pages/test/query";


// 初始化函数
const setup = (userType: UserRoleType) => {
  server.use(
    http.get("https://mysite.com/api/role", ({ request, params, cookies }) => {
      return HttpResponse.json({
        userType,
      })
    }),
  );
};

describe('AuthButton', () => {
  it('可以正常展示', () => {
    render(<AuthButton>登录</AuthButton>)

    expect(screen.getByText('登录')).toBeInTheDocument();
  });
})


describe("AuthButton Mock Http 请求", () => {
  it("可以正确展示普通用户按钮内容", async () => {
    setup("user");

    render(<AuthButton>你好</AuthButton>);

    expect(await screen.findByText("普通用户你好")).toBeInTheDocument();
  });

  it("可以正确展示管理员按钮内容", async () => {
    setup("admin");

    render(<AuthButton>你好</AuthButton>);

    expect(await screen.findByText("管理员你好")).toBeInTheDocument();
  });
});