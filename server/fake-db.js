const Product = require("./model/product");

class FakeDb {
  constructor() {
    this.products = [
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens',
        heading1: 'サンプルテキスト１',
        heading2: 'サンプルテキスト２',
        heading3: 'サンプルテキスト３',
        headingText1: 'サンプル文書１',
        headingText2: 'サンプル文書２',
        headingText3: 'サンプル文書３',
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras',
        heading1: 'サンプルテキスト１',
        heading2: 'サンプルテキスト２',
        heading3: 'サンプルテキスト３',
        headingText1: 'サンプルテキスト１',
        headingText2: 'サンプルテキスト２',
        headingText3: 'サンプルテキスト３',
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Standard',
        price: 299,
        description: 'A normal phone with one of the normal bottun',
        heading1: 'サンプルテキスト１',
        heading2: 'サンプルテキスト２',
        heading3: 'サンプルテキスト３',
        headingText1: 'サンプルテキスト１',
        headingText2: 'サンプルテキスト２',
        headingText3: 'サンプルテキスト３',
      },
      {
        coverImage: './assets/img/phone-cover.jpg',
        name: 'Phone Special',
        price: 999,
        description: 'A special phone with one of the special price',
        heading1: 'サンプルテキスト１',
        heading2: 'サンプルテキスト２',
        heading3: 'サンプルテキスト３',
        headingText1: 'サンプルテキスト１',
        headingText2: 'サンプルテキスト２',
        headingText3: 'サンプルテキスト３',
      }
    ];
  }

  async initDb() {
    await this.cleanDb();
    this.pushProductToDb();
  }

  async cleanDb() {
    await Product.deleteMany({});
  }

  pushProductToDb() {
    this.products.forEach(product => {
      const newProduct = new Product(product);
      newProduct.save();
    })
  }

  seeDb() {
    this.pushProductToDb();
  }
}

module.exports = FakeDb;