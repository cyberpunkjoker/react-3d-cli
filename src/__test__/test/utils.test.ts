import { sum, storage, getSearchObj } from "@/utils/test";

describe('sum', () => {
  it('可以做加法', () => {
    expect(sum(1, 1)).toEqual(2);
  });

  it("非 number 类型处理", () => {
    expect(sum('1', 1)).toEqual(2)
  })

  it(" null or undefined 类型处理", () => {
    expect(sum(null, undefined)).toEqual(null)
  })
})


describe("storage", () => {
  it("可以缓存值", () => {
    storage.set("newKey", "hello");
    expect(localStorage.getItem("newKey")).toEqual("hello");
  });

  it("可以设置值", () => {
    localStorage.setItem("newKey", "hello");
    expect(storage.get("newKey")).toEqual("hello");
  });
});

describe('getSearchObj test', () => {
  it('可以获取当前网址的查询参数对象', () => {
    window.location.href = "https://www.baidu.com?a=1&b=2";

    expect(window.location.search).toEqual("?a=1&b=2");
    expect(getSearchObj()).toEqual({
      a: "1",
      b: "2",
    });
  })
})