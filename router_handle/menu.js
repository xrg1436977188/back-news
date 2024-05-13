const db = require('../db/index.js')
// 获取layout菜单
exports.getMenus = (req, res) => {
    const sql = 'select * from menu where grade=1 and is_menu=0 and status=0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        results.forEach(item => {
            if (item.children == 'user') {
                const sql1 = 'select * from menu where grade=2 and children="user"'
                db.query(sql1, (err, results1) => {
                    item.children = results1

                })
            }
            if (item.children == 'permission') {
                const sql2 = 'select * from menu where grade=2 and children="permission"'
                db.query(sql2, (err, results2) => {
                    item.children = results2

                })
            }
            if (item.children == 'news') {
                const sql3 = 'select * from menu where grade=2 and children="news"'
                db.query(sql3, (err, results3) => {
                    item.children = results3
                })
            }
            if (item.children == 'audit') {
                const sql4 = 'select * from menu where grade=2 and children="audit"'
                db.query(sql4, (err, results4) => {
                    item.children = results4
                })
            }
            if (item.children == 'publish') {
                const sql5 = 'select * from menu where grade=2 and children="publish"'
                db.query(sql5, (err, results5) => {
                    item.children = results5
                    const newData = results.map(item => {
                        if (Array.isArray(item.children)) {
                            return {
                                key: item.key,
                                label: item.label,
                                children: item.children.map(child => ({
                                    key: child.key,
                                    label: child.label
                                }))
                            };
                        } else {
                            return {
                                key: item.key,
                                label: item.label
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
// 获取权限列表菜单
exports.getLimitMenus = (req, res) => {
    const sql = 'select * from menu where grade=1 and is_menu=0 and status=0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        results.forEach(item => {
            if (item.children == 'user') {
                const sql1 = 'select * from menu where grade=2 and children="user"'
                db.query(sql1, (err, results1) => {
                    item.children = results1

                })
            }
            if (item.children == 'permission') {
                const sql2 = 'select * from menu where grade=2 and children="permission"'
                db.query(sql2, (err, results2) => {
                    item.children = results2

                })
            }
            if (item.children == 'news') {
                const sql3 = 'select * from menu where grade=2 and children="news"'
                db.query(sql3, (err, results3) => {
                    item.children = results3
                })
            }
            if (item.children == 'audit') {
                const sql4 = 'select * from menu where grade=2 and children="audit"'
                db.query(sql4, (err, results4) => {
                    item.children = results4
                })
            }
            if (item.children == 'publish') {
                const sql5 = 'select * from menu where grade=2 and children="publish"'
                db.query(sql5, (err, results5) => {
                    item.children = results5

                    res.send({
                        status: 0,
                        message: '获取菜单列表成功',
                        data: results,
                    })

                })
            }
        });

    })
}


// 获取菜单中所有key值
// exports.getMenuKeys = (req, res) => {
//     const sql = 'select * from menu where is_'
//     db.query(sql, (err, results) => {
//         if (err) return res.cc(err)
//         res.send({
//             status: 0,
//             message: '获取成功',
//             data: results
//         })

//     })
// }

const superAdminRouter = [
    {
        "key": "/home",
        "label": "首页",
        "icon": "icon-jia"
    },
    {
        "key": "/user_manage",
        "label": "用户管理",
        "icon": "icon-yonghuguanli",
        "children": [
            {
                "key": "/user_manage/role_manage",
                "label": "角色管理",
                "icon": "icon-jiaoseguanli"
            },
            {
                "key": "/user_manage/user_list",
                "label": "用户列表",
                "icon": "icon-yonghuliebiao"
            }
        ]
    },
    {
        "key": "/permission_manage",
        "label": "权限管理",
        "icon": "icon-quanxianguanli",
        "children": [
            {
                "key": "/permission_manage/role_list",
                "label": "角色分类",
                "icon": "icon-tubiao-248"
            },
            {
                "key": "/permission_manage/limit_list",
                "label": "权限列表",
                "icon": "icon-quanxianliebiao"
            }
        ]
    },
    {
        "key": "/news_manage",
        "label": "新闻管理",
        "icon":"icon-xinwenguanli",
        "children": [
            {
                "key": "/news_manage/write_news",
                "label": "撰写新闻",
                "icon": "icon-bianji"
            },
            {
                "key": "/news_manage/draft_box",
                "label": "草稿箱",
                "icon": "icon-caogaoxiang"
            },
            {
                "key": "/news_manage/news_category",
                "label": "新闻分类",
                "icon": "icon-xinwenfenlei"
            }
        ]
    },
    {
        "key": "/audit_manage",
        "label": "审核管理",
        "icon": "icon-shenheguanli",
        "children": [
            {
                "key": "/audit_manage/audit_news",
                "label": "审核新闻",
                "icon": "icon-shenhexinwen",

            },
            {
                "key": "/audit_manage/audit_list",
                "label": "审核列表",
                "icon": "icon-shenheliebiao",
            }
        ]
    },
    {
        "key": "/publish_manage",
        "label": "发布管理",
        "icon": "icon-fabuguanli",
        "children": [
            {
                "key": "/publish_manage/tobe_publish",
                "label": "待发布",
                "icon": "icon-daifabu",
            },
            {
                "key": "/publish_manage/did_publish",
                "label": "已发布",
                "icon": "icon-yifabu",
            },
            {
                "key": "/publish_manage/inserting_winding",
                "label": "已下线",
                "icon": "icon-yixiaxian",
            }
        ]
    }
]
// 用户管理员路由
const userAdminRouter = [
    {
        "key": "/home",
        "label": "首页",
        "icon": "HomeOutlined"
    },
    {
        "key": "/user_manage",
        "label": "用户管理",
        "icon": "UserSwitchOutlined",
        "children": [
            {
                "key": "/user_manage/role_manage",
                "label": "角色管理",
                "icon": "UsergroupAddOutlined"
            },
            {
                "key": "/user_manage/user_list",
                "label": "用户列表",
                "icon": "UserOutlined"
            }
        ]
    },

    {
        "key": "/news_manage",
        "label": "新闻管理",
        "icon": "TwitchOutlined",
        "children": [
            {
                "key": "/news_manage/write_news",
                "label": "撰写新闻",
                "icon": "FileAddOutlined"
            },
            {
                "key": "/news_manage/draft_box",
                "label": "草稿箱",
                "icon": "InboxOutlined"
            },
        ]
    },
]
// 新闻管理员路由
const newsdminRouter = [
    {
        "key": "/home",
        "label": "首页",
        "icon": "HomeOutlined"
    },
    {
        "key": "/user_manage",
        "label": "用户管理",
        "icon": "UserSwitchOutlined",
        "children": [
            {
                "key": "/user_manage/user_list",
                "label": "用户列表",
                "icon": "UserOutlined"
            }
        ]
    },
    {
        "key": "/news_manage",
        "label": "新闻管理",
        "icon": "InsertRowRightOutlined",
        "children": [
            {
                "key": "/news_manage/write_news",
                "label": "撰写新闻",
                "icon": "FileAddOutlined"
            },
            {
                "key": "/news_manage/draft_box",
                "label": "草稿箱",
                "icon": "InboxOutlined"
            },
            {
                "key": "/news_manage/news_category",
                "label": "新闻分类",
                "icon": "AppstoreOutlined"
            }
        ]
    },
    {
        "key": "/audit_manage",
        "label": "审核管理",
        "icon": "AuditOutlined",
        "children": [
            {
                "key": "/audit_manage/audit_news",
                "label": "审核新闻",
                "icon": "ContainerOutlined",

            },
            {
                "key": "/audit_manage/audit_list",
                "label": "审核列表",
                "icon": "FileSearchOutlined",
            }
        ]
    },
    {
        "key": "/publish_manage",
        "label": "发布管理",
        "icon": "InsertRowRightOutlined",
        "children": [
            {
                "key": "/publish_manage/tobe_publish",
                "label": "待发布",
                "icon": "HourglassOutlined",
            },
            {
                "key": "/publish_manage/did_publish",
                "label": "已发布",
                "icon": "SafetyCertificateOutlined",
            },
            {
                "key": "/publish_manage/inserting_winding",
                "label": "已下线",
                "icon": "ImportOutlined",
            }
        ]
    }
]
// 普通用户路由
const userRouter = [
    {
        "key": "/home",
        "label": "首页",
        "icon": "HomeOutlined"
    },
    {
        "key": "/user_manage",
        "label": "用户管理",
        "icon": "UserSwitchOutlined",
        "children": [
            {
                "key": "/user_manage/user_list",
                "label": "用户列表",
                "icon": "UserOutlined"
            }
        ]
    },

    {
        "key": "/news_manage",
        "label": "新闻管理",
        "icon": "InsertRowRightOutlined",
        "children": [
            {
                "key": "/news_manage/write_news",
                "label": "撰写新闻",
                "icon": "FileAddOutlined"
            },
            {
                "key": "/news_manage/draft_box",
                "label": "草稿箱",
                "icon": "InboxOutlined"
            },
        ]
    },
]

// 获取不同角色的菜单
exports.ByIdentityGetMenu = (req, res) => {
    const sql = 'select identity from users where id=?'
    db.query(sql, req.body.id, (err, result) => {
        if (err) return res.cc(err)
        let menu = []
        if (result[0].identity == '超级管理员') {
            menu = superAdminRouter
        }
        if (result[0].identity == '用户管理员') {
            menu = userAdminRouter
        }
        if (result[0].identity == '新闻管理员') {
            menu = newsdminRouter
        }
        if (result[0].identity == '用户') {
            menu = userRouter
        }
        res.send({
            status: 0,
            message: '获取成功',
            data: menu
        })

    })
}

