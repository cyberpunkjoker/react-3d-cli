/**
 *  *** 使用hook jest 要注意的点 ***
 * 1. hook 要在react 环境中使用，不然会报错
 * 1.1 使用组件的方式测试
 * 1.2 @testing-library/react-hooks 库可以帮助我们测试hook
 * */
import { renderHook } from "@testing-library/react-hooks";
import useCounter from "@/hooks/test/useCountTest";
import { act } from "@testing-library/react";

describe("useCounterTest test", () => {
  it("可以正确计算减法", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].dec(1);
    })

    expect(result.current[0]).toEqual(-1);
  })

  it("可以正确计算加法", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].inc(1);
    })

    expect(result.current[0]).toEqual(1);
  })
})