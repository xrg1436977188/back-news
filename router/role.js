const express = require('express');

const router = express.Router();

const roleHandle=require('../router_handle/role')
router.post('/getAllRoleList',roleHandle.getAllRoleList)//获取所有角色列表
router.post('/getRoleList',roleHandle.getRoleList)//获取角色列表
router.post('/getRoleUserInfo',roleHandle.getRoleUserInfo)// 根据id回显角色信息
router.post('/addRole',roleHandle.addRole)//添加角色
router.post('/deleteRole',roleHandle.deleteRole)//删除角色
router.post('/editRole',roleHandle.editRole)//编辑角色
router.post('/searchRoleByAccount',roleHandle.searchRoleByAccount)//通过用户名获取角色信息
router.post('/searchRoleByIdentity',roleHandle.searchRoleByIdentity)//通过用户名获取角色信息
router.post('/updateRolePwd',roleHandle.updateRolePwd)//通过用户名获取角色信息

router.post('/uploadAvatar',roleHandle.uploadAvatar)//上传头像
router.post('/bindAccount',roleHandle.bindAccount)//上传头像

router.post('/getIdentityCategory',roleHandle.getIdentityCategory)//上传头像
router.post('/updateIdentityCategory',roleHandle.updateIdentityCategory)//上传头像

router.post('/deleteIdentityCategory',roleHandle.deleteIdentityCategory)// [删除角色分类]
router.post('/addIdentityCategory',roleHandle.addIdentityCategory)// [添加角色分类]

router.post('/updateSelfUserInfo',roleHandle.updateSelfUserInfo)// 修改用户信息
router.post('/banAndHotUser',roleHandle.banAndHotUser)// 是否禁用角色

module.exports = router;