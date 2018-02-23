export default {
  /**
   * @description 创建uid
   * @returns {String}
   */
  uid() {
    return Date.now().toString(10).substr(6, 7) + Math.random().toString(35).substr(2, 7);
  },
  /**
   * @description bubbleSort排序
   * @param {Array} arr
   * @param {String} name
   * @param {String} type
   * @returns {Array}
   */
  bubbleSort(arr, name, type) { // array, propName, asc/desc
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (type === 'asc' ? arr[j][name] > arr[i][name] : arr[j][name] < arr[i][name]) {
          let tem = arr[j];
          arr[j] = arr[i];
          arr[i] = tem;
        }
      }
    }
    return arr;
  },
  localStorage: {
    /**
     * @description 读取对应 key 的 parsed arr 数组
     * @param {String} key
     * @returns {Array}
     */
    getItem: function (key) {
      return JSON.parse(window.localStorage.getItem(key))
    },
    /**
     * @description 写入对应 key 的 stringified arr 字符串
     * @param {String} key
     * @param {Array} arr
     */
    setItem: function (key, arr) {
      window.localStorage.setItem(key, JSON.stringify(arr));
    },
  }
}
