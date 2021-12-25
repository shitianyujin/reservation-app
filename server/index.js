// フレームワーク
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// DB
const FakeDb = require('./fake-db');

const config = require('./config/');

// ルーティング
const productRoutes = require('./routes/products');
const path = require('path');

mongoose.connect(config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(

  () => {
    if (process.env.NODE_ENV !== 'production') {
      const fakeDb = new FakeDb();
      fakeDb.initDb();
    }
  }
);

app.use('/api/v1/products', productRoutes);

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist', 'reservation-app');
  app.use(express.static(appPath));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || '3001';
app.listen(PORT, function () {
  console.log("server running...");
});

