/** 
 * @component app.js
 * @description app的入口配置文件
 * @time 2020-01-16 11:40
 * @author fishYu
 */

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
