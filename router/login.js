const express = require('express');

const router = express.Router();

const loginHandle=require('../router_handle/login')
router.post('/login',loginHandle.login)//登录
router.post('/register',loginHandle.register)//注册
router.post('/forget',loginHandle.forget)//修改密码
module.exports = router;