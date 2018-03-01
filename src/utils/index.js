export default {
  /** 
   * @description 需要使用 Blob 浏览器兼容性：Blob URLs ✔ 94.48%
  IE ✘ 5.5+ ✔ 10+ Edge ✔ ¹ Firefox ✘ 2+ ✔ 4+ Chrome ✘ 4+ ✔ 8+ᵖ ✔ 23+ Safari
  ✘ 3.1+ ✔ 6+ᵖ ✔ 6.1+ Opera ✘ 9+ ✔ 15+
  */
  downloadJSONFile(){
    console.log(`需要使用 Blob 浏览器兼容性：Blob URLs ✔ 94.48%
IE ✘ 5.5+ ✔ 10+ Edge ✔ ¹ Firefox ✘ 2+ ✔ 4+ Chrome ✘ 4+ ✔ 8+ᵖ ✔ 23+ Safari
✘ 3.1+ ✔ 6+ᵖ ✔ 6.1+ Opera ✘ 9+ ✔ 15+`);
    let blob = new Blob([JSON.stringify(this.localStorage.getItem('memos'))], {type: "application/json"});
    var url = URL.createObjectURL(blob);
    let a = document.createElement('a')
    a.href = url;
    a.download = 'allData.json';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },
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
