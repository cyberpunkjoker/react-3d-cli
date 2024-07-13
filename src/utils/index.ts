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




const app: DictLimit<{key: string}> = {
  key: 'value'
}

/** 资源请求 结果类*/
export class Result {
  success: boolean;
  message: string;
  data: DictLimit<{key: string}>;
  key: string;

  private constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success(data, message = 'ok', ) {
    return new Result(true, message, data);
  }

  static fail(data, message = '') {
    return new Result(false, message, data);
  }
}

/** 批量下载函数 */
export const batchQuery = async (list: any[], retryTimes = 0) => {
  let cacheList = { }
  let retryList = []
  let retryCount = 0

  const setCache = (name, data) => {
    cacheList[name] = data
  }

  // const queryAssets = async(list) => {
  //   const res = await Promise.allSettled(list)
  //     res.forEach((item, index) => {
  //     const {status, value} = item || {}

  //     if (status === 'fulfilled') {
  //       const data = Result.success(value)
  //       console.log('value', data);
        
  //       setCache(value.key, data)
  //     } else {
  //       retryList.push(list[index])
  //     }
  //   })

  //   if (retryList.length > 0 && retryCount < retryTimes) {

  //     retryCount++;
  //     queryAssets(retryList)
  //   }

  //   if (retryList.length === 0 || retryCount > retryTimes) return cacheList
  // }

  // return queryAssets(list)
}