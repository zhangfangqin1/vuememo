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
  }
}
