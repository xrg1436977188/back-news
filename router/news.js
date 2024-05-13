const express = require('express');

const router = express.Router();

const newsHandle = require('../router_handle/news')

router.post('/getCategoryList', newsHandle.getCategoryList)//获取文章分类列表
router.post('/createNews', newsHandle.createNews)//创建文章
router.post('/getTwoStatusList', newsHandle.getTwoStatusList)
router.post('/deleteDraftBoxList', newsHandle.deleteDraftBoxList)//删除草稿箱列表
router.post('/getNewsDetail', newsHandle.getNewsDetail)// 跳转获取文章详情页
router.post('/updateNews', newsHandle.updateNews)// 草稿箱跳转详情页-更新文章

router.post('/newsAuditList', newsHandle.newsAuditList)// [审核列表]获取文章列表
router.post('/auditPublish', newsHandle.auditPublish)// [审核列表]发布操作

router.post('/getAuditManageList', newsHandle.getAuditManageList)// [审核新闻列表]

router.post('/updateNewsCategory', newsHandle.updateNewsCategory)//更新文章分类
router.post('/deleteNewsCategory', newsHandle.deleteNewsCategory)//删除文章分类

router.post('/byStatusGetNews', newsHandle.byStatusGetNews)// 获取[0 未发布][待发布 1][已发布 2][已下线 3]新闻列表
router.post('/byIdupdateNewsStatus', newsHandle.byIdupdateNewsStatus)// 修改[0 未发布][待发布 1][已发布 2][已下线 3]新闻状态
// 修改审核状态[0 未审核][待审核 1][审核通过 2][拒绝审核 3]
// 修改发布状态[0 未发布][待发布 1][已发布 2][已下线 3]
router.post('/byIdupdateNewsTwoStatus', newsHandle.byIdupdateNewsTwoStatus)

router.post('/getMaxViewOrderBy', newsHandle.getMaxViewOrderBy)// [最多观看人数排序]-前提:已发布   5条
router.post('/getMaxStarOrderBy', newsHandle.getMaxStarOrderBy)// [最多点赞人数排序]-前提:已发布   5条

router.post('/getCategoryNumber', newsHandle.getCategoryNumber)// 获取各新闻分类的数量-前提:已发布
router.post('/getCategoryNumberSelf', newsHandle.getCategoryNumberSelf)// 获取各新闻分类的数量-前提:已发布-本人发布

router.post('/viewAutoAdd', newsHandle.viewAutoAdd)//游客模式,进入新闻详情页观看数量加1
router.post('/starAutoAdd', newsHandle.starAutoAdd)// 游客模式,进入新闻详情页点击图标加1

router.post('/getCategoryAndInfo', newsHandle.getCategoryAndInfo)// [审核新闻列表]-驳回操作

router.post('/addNewsCategory', newsHandle.addNewsCategory)// [新闻分类]

router.post('/getNewsTotal', newsHandle.getNewsTotal)// [新闻分类]
router.post('/getNewsStatusTotal', newsHandle.getNewsStatusTotal)// [新闻分类]
router.post('/getAuditStatusTotal', newsHandle.getAuditStatusTotal)// [新闻分类]

router.post('/getAuditStatusTotal', newsHandle.getAuditStatusTotal)// [新闻分类]

router.post('/byOneCategoryGetList', newsHandle.byOneCategoryGetList)// [新闻分类]
router.post('/byNewsTitleSearch', newsHandle.byNewsTitleSearch)// 通过标题进行模糊搜索
router.post('/byNewsCategorySearch', newsHandle.byNewsCategorySearch)// 通过新闻分类进行搜索
module.exports = router;