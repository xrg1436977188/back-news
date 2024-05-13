const express = require('express');

const router = express.Router();

const menuHandle=require('../router_handle/menu.js')
router.post('/getMenus',menuHandle.getMenus)//获取菜单列表
router.post('/getLimitMenus',menuHandle.getLimitMenus)//获取权限列表菜单
// router.post('/getMenuKeys',menuHandle.getMenuKeys)// 获取菜单中所有key值
router.post('/ByIdentityGetMenu',menuHandle.ByIdentityGetMenu)// 通过不同身份获取菜单
module.exports = router;