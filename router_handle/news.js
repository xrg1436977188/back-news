const db = require('../db/index.js')

// 创建文章
exports.createNews = (req, res) => {
    const {
        title,
        category,
        content,
        identity,
        name,
        publish_status,
        audit_status,
    } = req.body
    const star = 0
    const view = 0
    const create_time = new Date()
    const sql = 'insert into news set ?'
    db.query(sql, {
        title,
        category,
        content,
        identity,
        name,
        publish_status,
        star,
        view,
        create_time,
        audit_status
    },
        (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '文章创建成功',
            })
        })
}

// 获取文章分类列表
exports.getCategoryList = (req, res) => {
    const sql = 'select * from setting'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}

// 草稿箱列表-删除
exports.deleteDraftBoxList = (req, res) => {
    const sql = 'delete from news where id = ?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除成功',
        })
    })
}

//携带id--跳转详情页-获取该文章数据详情
exports.getNewsDetail = (req, res) => {
    const sql = 'select * from news where id=?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}

// 更新文章
exports.updateNews = (req, res) => {
    const {
        id,
        title,
        category,
        content,
        identify,
        name,
        audit_status,
    } = req.body
    const update_time = new Date()
    const sql = 'update news set title=?,content=?,category=? ,update_time=?,audit_status=? where id = ?'
    db.query(sql, [
        title,
        category,
        content,
        identify,
        name,
        update_time,
        audit_status,
        id
    ],
        (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '文章更新成功',
            })
        })
}
// 根据audit_status获取列表数据
exports.getTwoStatusList = (req, res) => {
    const sql = 'select * from news where audit_status =0 and publish_status = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}
// 获取审核列表
exports.newsAuditList = (req, res) => {
    const sql = 'select * from news where audit_status > 0 and publish_status > 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}


// [审核列表]发布操作
exports.auditPublish = (req, res) => {
    const sql = 'update news set publish_status = 2 where id = ?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '发布成功',
        })
    })
}

// [审核新闻列表]
exports.getAuditManageList = (req, res) => {
    const sql = 'select * from news where audit_status = 1 and publish_status = 1 or publish_status = 2'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}



// [修改新闻分类]
exports.updateNewsCategory = (req, res) => {
    const { value, id } = req.body
    let title = value
    const sql = 'update setting set title=?, value=? where id = ?'
    db.query(sql, [title, value, id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改成功',
        })
    })
}
// [删除新闻分类]
exports.deleteNewsCategory = (req, res) => {
    const sql = 'delete from setting where id = ?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除成功',
        })
    })
}

// 获取[0 未发布][待发布 1][已发布 2][已下线 3]新闻列表
exports.byStatusGetNews = (req, res) => {
    const sql = 'select * from news where publish_status = ?'
    db.query(sql, [req.body.publish_status], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '操作成功',
            data: results
        })
    })
}
// 修改[0 未发布][待发布 1][已发布 2][已下线 3]新闻状态
exports.byIdupdateNewsStatus = (req, res) => {
    const { publish_status, id } = req.body
    const sql = 'update news set publish_status = ? where id = ?'
    db.query(sql, [publish_status, id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '操作成功',
        })
    })
}

// 修改审核状态[0 未审核][待审核 1][审核通过 2][拒绝审核 3]
// 修改发布状态[0 未发布][待发布 1][已发布 2][已下线 3]
exports.byIdupdateNewsTwoStatus = (req, res) => {
    const { audit_status, publish_status, id } = req.body
    const update_time = new Date()
    const sql = 'update news set audit_status = ? ,publish_status = ? ,update_time= ? where id = ?'
    db.query(sql, [audit_status, publish_status, update_time, id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '操作成功',
        })
    })
}

// [最多观看人数排序]-前提:已发布   5条
exports.getMaxViewOrderBy = (req, res) => {
    const sql = 'select * from news where publish_status = 2 order by view desc limit 12'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}
// [最多点赞人数排序]-前提:已发布   5条
exports.getMaxStarOrderBy = (req, res) => {
    const sql = 'select * from news where publish_status = 2 order by star desc limit 12'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}

// 获取各新闻分类的数量-前提:已发布
exports.getCategoryNumber = (req, res) => {
    const sql = 'select category,count(*) as count from news where publish_status = 2 group by category'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        let category_list = []
        let count_list = []
        results.forEach(item => {
            category_list.push(item.category)
            count_list.push(item.count)
        })
        res.send({
            status: 0,
            message: '获取成功',
            data: {
                category_list,
                count_list
            }
        })
    })
}

// 获取各新闻分类的数量-前提:已发布-本人发布
exports.getCategoryNumberSelf = (req, res) => {
    const sql = 'select category,count(*) as count from news where author=? and publish_status = 2 group by category'
    db.query(sql, req.body.author, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}

// 游客模式,进入新闻详情页观看数量加1
exports.viewAutoAdd = (req, res) => {
    const { id } = req.body
    const sql1 = 'select view from news where id=?'
    db.query(sql1, id, (err, results) => {
        if (err) return res.cc(err)
        let view = results[0].view * 1 + 1
        const sql = 'update news set view = ? where id = ?'
        db.query(sql, [view, id], (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '浏览记录成功',
            })
        })
    })

}

// 游客模式,进入新闻详情页点击图标加1
exports.starAutoAdd = (req, res) => {
    const { id } = req.body
    const sql1 = 'select star from news where id=?'
    db.query(sql1, id, (err, results) => {
        if (err) return res.cc(err)
        let star = results[0].star * 1 + 1
        const sql = 'update news set star = ? where id = ?'
        db.query(sql, [star, id], (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '点赞记录成功',
            })
        })
    })


}

// 根据新闻分类进行筛选并获取新闻分类的所有信息-前提:已发布
exports.getCategoryAndInfo = (req, res) => {
    const sql = 'select * from setting'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        results.forEach(item => {
            if (item.value == '科技') {
                const sql1 = 'select * from news where publish_status=2 and category="科技"'
                db.query(sql1, (err, results1) => {
                    item.value = results1

                })
            }
            if (item.value == '经济') {
                const sql2 = 'select * from news where publish_status=2 and category="经济"'
                db.query(sql2, (err, results2) => {
                    item.value = results2

                })
            }
            if (item.value == '法律') {
                const sql3 = 'select * from news where publish_status=2 and category="法律"'
                db.query(sql3, (err, results3) => {
                    item.value = results3

                })
            }
            if (item.value == '体育') {
                const sql4 = 'select * from news where publish_status=2 and category="体育"'
                db.query(sql4, (err, results4) => {
                    item.value = results4

                })
            }
            if (item.value == '文教') {
                const sql6 = 'select * from news where publish_status=2 and category="文教"'
                db.query(sql6, (err, results6) => {
                    item.value = results6

                })
            }

            if (item.value == '社会') {
                const sql5 = 'select * from news where publish_status=2 and category="文教"'
                db.query(sql5, (err, results5) => {
                    item.value = results5


                })

            }
            if (item.value == '军事') {
                const sql7 = 'select * from news where publish_status=2 and category="军事"'
                db.query(sql7, (err, results7) => {
                    item.value = results7

                })
            }
            if (item.value == '旅游') {
                const sql8 = 'select * from news where publish_status=2 and category="旅游"'
                db.query(sql8, (err, results8) => {
                    item.value = results8
                    const newData = results.map(item => {
                        if (Array.isArray(item.value)) {
                            return {
                                key: item.id,
                                label: item.title,
                                children: item.value.map(child => ({
                                    key: child.id,
                                    label: child.title
                                }))
                            };
                        } else {
                            return {
                                key: item.id,
                                label: item.title
                            };
                        }
                    });
                    res.send({
                        status: 0,
                        message: '获取菜单列表成功',
                        data: newData,
                    })
                })
            }

        });


    })
}

// [添加新闻分类]
exports.addNewsCategory = (req, res) => {
    const { title } = req.body
    const value = title
    const sql = 'select * from setting where title=?'
    db.query(sql, title, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('该新闻分类已存在')
        const sql1 = 'insert into setting set ?'
        db.query(sql1, { title, value }, (err, results1) => {
            if (err) return res.cc(err)
            const sql2 = 'select * from setting where title=?'
            db.query(sql2, title, (err, results2) => {
                if (err) return res.cc(err)
                res.send({
                    status: 0,
                    message: '添加分类成功',
                    data: results2
                })
            })

        })
    })
}

// 获取新闻发布各状态,审核总数
exports.getNewsTotal = (req, res) => {
    const sql = 'select count(*) as total from news'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取总数成功',
            total: result[0].total
        })
    })
}
// 根据publish_status获取新闻发布各状态总数
exports.getNewsStatusTotal = (req, res) => {
    const sql = `select publish_status, count(*) as total from news  group by publish_status `
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取总数成功',
            data: result
        })

    })


}
// 根据status_status获取新闻审核各状态总数
exports.getAuditStatusTotal = (req, res) => {
    const sql = 'select audit_status,count(*) as total from news group by audit_status'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: result
        })
    })
}

exports.byOneCategoryGetList = (req, res) => {
    const sql = 'SELECT * FROM setting WHERE id=?';
    db.query(sql, req.body.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.length !== 0) {
            const categoryId = result[0].value;
            const sql1 = 'SELECT * FROM news WHERE publish_status=2 AND category=?';
            db.query(sql1, categoryId, (err, result1) => {
                if (err) return res.cc(err);

                res.send({
                    status: 0,
                    message: '获取成功',
                    data: result1
                });
            });
        }

    });
};

// 通过标题进行模糊搜索
exports.byNewsTitleSearch = (req, res) => {
    const { title } = req.body
    const sql = `select * from news where audit_status=0 and publish_status=0 and title like '%${title}%'`
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '搜索成功',
            data: result
        })
    })
}

// 通过新闻分类进行搜索
exports.byNewsCategorySearch = (req, res) => {
    const { category } = req.body
    const sql = `select * from news where audit_status=0 and publish_status=0 and category=?`
    db.query(sql, category, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '搜索成功',
            data: result
        })
    })
}




