import { sum } from "@/utils/test";

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