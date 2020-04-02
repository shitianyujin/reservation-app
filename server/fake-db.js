const Product = require('./model/product');

class FakeDb {
  constructor() {
    this.products = [
      {
        name: 'ユキさん',
        price: 6000,
        description: '新参者',
        icon: '../assets/img/yuki.jpg',
        coverImage: '../assets/img/yuki_cover.jpg',
        heading1: 'もっちりアザラシビッグクッション',
        heading2: '丸いって、平和',
        heading3: '大阪の水族館・海遊館とYOU+MORE!のコラボレーション第三弾',
        heading1text: '高い',
        heading2text: '丸い',
        heading3text: '可愛い'
      },
      {
        name: 'ウォンバットさん',
        price: 3500,
        description: 'ニート',
        icon: '../assets/img/wombat.jpg',
        coverImage: '../assets/img/wombat_cover.jpg',
        heading1: 'ぬいぐるみから生まれたキャラクター',
        heading2: 'おにぎり大好き',
        heading3: '食べることと動かないことが大好き！ ',
        heading1text: 'デブ',
        heading2text: 'ひきこもり',
        heading3text: 'ロングスリーパー'
      },
      {
        name: 'ミ○キー',
        price: 1500,
        description: '扱われ方が雑なやつ',
        icon: '../assets/img/micky.jpg',
        coverImage: '../assets/img/mickey_cover.jpg',
        heading1: '1928年（昭和3年）11月18日にスクリーンデビュー',
        heading2: '中国では「米老鼠」',
        heading3: 'もともとは「モーティマーマウス」と名をつけるつもりだった。',
        heading1text: '人気者',
        heading2text: '世界一',
        heading3text: '超有名'
      }
    ]
  }

  pushProductToDb() {
    this.products.forEach(
      (product) => {
        const newProduct = new Product(product);
        newProduct.save();
      }
    )
  };

  seeDb() {
    this.pushProductToDb();
  }
}

module.exports = FakeDb;