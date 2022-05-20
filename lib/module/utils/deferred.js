function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export default class Deferred {
  constructor() {
    _defineProperty(this, "promise", void 0);

    _defineProperty(this, "resolve", void 0);

    _defineProperty(this, "reject", void 0);

    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }

  getPromise() {
    return this.promise;
  }

}
//# sourceMappingURL=deferred.js.map