const jwt = require('jsonwebtoken');
const config = require('../config/');
const User = require('../model/user');

function notAuthorization(res) {
  return res.status(401).send({
    errors: [
      {
        title: 'ログイン状態チェック',
        detail: 'ログインしてください'
      }
    ]
  });
}


exports.authMiddleWare = function (req, res, next) {
  const token = req.headers.authorization;

  // 必須チェック
  if (!token) {
    return notAuthorization(res);
  }

  // トーク有効性チェック
  jwt.verify(token.split(' ')[1], config.SECRET, function (err, decodedToken) {
    if (err) {
      return res.status(401).send({
        errors: [
          {
            title: 'トークン有効性チェック',
            detail: '不正なトークンです'
          }
        ]
      });
    }
    // ユーザー存在チェック
    User.findById(decodedToken.userId, function (err, foundUser) {
      if (err) {
        return res.status(401).send({
          errors: [
            {
              title: 'ユーザー存在確認異常終了',
              detail: 'ユーザー存在確認処理で異常終了が発生しました'
            }
          ]
        });
      }

      if (!foundUser) {
        return res.status(401).send({
          errors: [
            {
              title: 'ユーザー存在チェックエラー',
              detail: 'このユーザーは登録されていません'
            }
          ]
        });
      }

      next();
    });
  });


}