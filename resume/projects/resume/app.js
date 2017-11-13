export default class App {
  constructor() {
    this.prevButtonClickListener;
    this.nextButtonClickListener;
    this.formSwipeContainer;
  }

  setPrevButtonClickListener(listener) {
    this.prevButtonClickListener = listener
  }

  setNextButtonClickListener(listener) {
    this.nextButtonClickListener = listener
  }

  setFormSwipeContainer(container) {
    this.formSwipeContainer = container;
  }

  setDataToStorage(key, data) {
    window.localStorage.setItem(key, data);
  }

  getDataFromStorage(key) {
    return window.localStorage.getItem(key);
  }
}
