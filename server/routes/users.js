const express = require('express');
const jwt = require('jsonwebtoken');
const { createEmitAndSemanticDiagnosticsBuilderProgram } = require('typescript');
const router = express.Router();
const config = require('../config');
const User = require('../model/user');


router.post('/login', function (req, res) {
  const { username, email, password, confirmPassword } = req.body;

  /** メールアドレス必須チェック */
  if (!email) {
    return res.status(422).send({
      errors: [
        {
          title: 'メールアドレス必須エラー',
          detail: 'メールアドレスは必須です'
        }
      ]
    });
  }

  /** パスワード必須チェック */
  if (!password) {
    return res.status(422).send({
      errors: [
        {
          title: 'パスワード必須エラー',
          detail: 'パスワードは必須です'
        }
      ]
    });
  }

  /** ユーザー存在チェック */
  User.findOne({ email }, function (err, foundUser) {
    if (err) {
      return res.status(422).send({
        errors: [
          {
            title: 'ユーザー重複確認異常終了',
            detail: 'ユーザー重複確認処理で異常終了が発生しました'
          }
        ]
      });
    }

    if (!foundUser) {
      return res.status(422).send({
        errors: [
          {
            title: 'ユーザー存在チェックエラー',
            detail: 'このメールアドレスは登録されていません'
          }
        ]
      });
    }

    /** パスワード整合性チェック */
    if (!foundUser.hasSamePassword(password)) {
      return res.status(422).send({
        errors: [
          {
            title: 'パスワード整合性チェックエラー',
            detail: 'パスワードが間違っています'
          }
        ]
      });
    }

    const token = jwt.sign({
      userId: foundUser.id,
      userName: foundUser.username
    }, config.SECRET, { expiresIn: '1h' });
    return res.json(token);
  });



});

/**
 * 登録処理
 */
router.post('/register', function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  /**
   * ユーザー名必須チェック
   */
  if (!username) {
    return res.status(422).send({
      errors: [
        {
          title: 'ユーザー名必須エラー',
          detail: 'ユーザー名は必須です'
        }
      ]
    });
  }

  /**
   * メールアドレス必須チェック
   */
  if (!email) {
    return res.status(422).send({
      errors: [
        {
          title: 'メールアドレス必須エラー',
          detail: 'メールアドレスは必須です'
        }
      ]
    });
  }

  /**
   * パスワード必須チェック
   */
  if (!password) {
    return res.status(422).send({
      errors: [
        {
          title: 'パスワード必須エラー',
          detail: 'パスワードは必須です'
        }
      ]
    });
  }

  /**
   * パスワード整合性チェック
   */
  if (password !== confirmPassword) {
    return res.status(422).send({
      errors: [
        {
          title: 'パスワード確認エラー',
          detail: 'パスワードが一致しません'
        }
      ]
    });
  }

  /**
   * ユーザー重複チェック
   */
  User.findOne({ email }, function (err, foundUser) {
    if (err) {
      return res.status(422).send({
        errors: [
          {
            title: 'ユーザー重複確認異常終了',
            detail: 'ユーザー重複確認処理で異常終了が発生しました'
          }
        ]
      });
    }

    if (foundUser) {
      return res.status(422).send({
        errors: [
          {
            title: 'ユーザー重複エラー',
            detail: 'このメールアドレスは既に登録済みです'
          }
        ]
      });
    }

    const user = new User({
      username,
      email,
      password
    });
    console.log(user);
    user.save(function (err) {
      if (err) {
        return res.status(422).send({
          errors: [
            {
              title: 'ユーザー登録処理異常終了',
              detail: '登録処理で異常終了が発生しました',
            }
          ]
        });
      }

      return res.json({
        "register": true
      });
    });

  });


});


module.exports = router;