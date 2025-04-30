class BiMap {
  constructor() {
    this.forward = new Map();
    this.reverse = new Map();
  }

  set(key, value) {
    if (this.forward.has(key)) {
      const oldValue = this.forward.get(key);
      this.reverse.delete(oldValue);
    }
    if (this.reverse.has(value)) {
      const oldKey = this.reverse.get(value);
      this.forward.delete(oldKey);
    }
    this.forward.set(key, value);
    this.reverse.set(value, key);
  }

  get(key) {
    return this.forward.get(key);
  }

  getKey(value) {
    return this.reverse.get(value);
  }

  delete(key) {
    const value = this.forward.get(key);
    this.forward.delete(key);
    this.reverse.delete(value);
  }

  has(key) {
    return this.forward.has(key);
  }

  hasValue(value) {
    return this.reverse.has(value);
  }

  clone() {
    const clone = new BiMap();
    for (const [key, value] of this.forward.entries()) {
      clone.set(key, value);
    }
    return clone;
  }
}

export default BiMap;
