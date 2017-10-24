class MangoTree {
  constructor() {
    this.umur          = 0;
    this.tinggi        = 0;
    this.max           = 30;
    this.kumpulanbuah  = [];
    this.petik         = 0;
    this.healthy       = true;
  }

  getAge() {
    return this.umur;
  }

  getFruits() {
    return this.kumpulanbuah;
  }

  getHealth() {
    return this.healthy;
  }
}
