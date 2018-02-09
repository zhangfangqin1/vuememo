export default {
  uid() {
    return Date.now().toString(10).substr(6, 7) + Math.random().toString(35).substr(2, 7);
  }
}
