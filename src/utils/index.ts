/** 延迟函数  */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/** Promise warpper 配合 suspense 使用 */
export const wrapPromise = (promise: Promise<string>) => {
  let status = "pending";
  let result = "";
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
};