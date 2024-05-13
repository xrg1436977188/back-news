const db = require('../db/index.js')
// 导入fs处理文件
const fs = require('fs')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
// 导入jwt,用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密跟解密
const jwtConfig = require('../jwt_config/index.js')

// 获取角色列表
exports.getRoleList = (req, res) => {
    const sql = 'select * from users where is_delete = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 0) {
            res.send({
                status: 0,
                message: '获取成功',
                data: results
            })
        }
    })
}
// 根据id回显角色信息
exports.getRoleUserInfo = (req, res) => {
    const sql = 'select * from users where id = ?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: results
        })
    })
}
// 获取所有角色列表
exports.getAllRoleList = (req, res) => {
    const sql = 'select * from users'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 0) {
            res.send({
                status: 0,
                message: '获取成功',
                data: results
            })
        }
    })
}

// 添加角色
exports.addRole = (req, res) => {
    const { account, password, identity, name, sex,email } = req.body
    const sql1 = 'select * from users where account = ?'
    db.query(sql1, account, (err, result) => {
        if (err) return res.cc(err)
        if (result.length > 0) {
            return res.send({
                status: 1,
                message: '该账号已存在'
            })
        }
        const is_delete = 0
        const create_time = new Date()
        const status = 0
        let encryptionPassword = bcrypt.hashSync(password, 10)
        const sql = 'insert into users set ? '
        db.query(sql, { account, password: encryptionPassword, identity, name, sex,email, create_time, is_delete, status }, (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '添加失败'
                })
            }
            res.send({
                status: 0,
                message: '添加成功'
            })
        })
    })

}


// 编辑角色
exports.editRole = (req, res) => {
    const { identity, name, sex,email, id } = req.body
    const update_time = new Date()
    const sql = 'update users set identity=?,name=?,sex=?,email=?,update_time=? where id = ?'
    db.query(sql, [identity, name, sex, email,update_time, id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '编辑用户成功'
        })
    })


}

// 删除角色
exports.deleteRole = (req, res) => {
    const { id } = req.body
    const sql = 'update users set is_delete=1 where id = ?'
    db.query(sql, [id], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除成功'
        })
    })
}


// 通过用户名搜索角色
exports.searchRoleByAccount = (req, res) => {
    const { account } = req.body
    const sql = 'select * from users where account = ?'
    db.query(sql, [account], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '搜索成功',
            data: result
        })
    })
}

// 通过身份搜索角色
exports.searchRoleByIdentity = (req, res) => {
    const { identity } = req.body
    const sql = 'select * from users where identity = ?'
    db.query(sql, [identity], (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '搜索成功',
            data: result
        })
    })
}
// 修改角色密码
exports.updateRolePwd = (req, res) => {
    const { oldPassword, newPassword, id } = req.body
    const sql = 'select * from users where id = ?'
    db.query(sql, id, (err, results) => {
        if (err) return res.cc(err)
        const compareResult = bcrypt.compareSync(oldPassword, results[0].password)
        if (!compareResult) {
            return res.send({
                status: 1,
                message: '原密码错误'
            })
        }
        let newsPassword = bcrypt.hashSync(newPassword, 10)
        const sql1 = 'update users set password=? where id = ?'
        db.query(sql1, [newsPassword, id], (err, result) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '密码更新成功'
            })
        })
    }
    )
}

// 上传头像
exports.uploadAvatar = (req, res) => {
    // 生成唯一标识
    const onlyId = crypto.randomUUID()
    let oldName = req.files[0].filename;
    let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
    fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
    const sql = 'insert into image set ?'
    db.query(sql, {
        image_url: `http://127.0.0.1:3000/upload/${newName}`,
        onlyId
    }, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            onlyId,
            status: 0,
            url: 'http://127.0.0.1:3000/upload/' + newName
        })
    })
}
// 绑定账号 onlyId account url
exports.bindAccount = (req, res) => {
    const {
        account,
        onlyId,
        url
    } = req.body
    const sql = 'update image set account = ? where onlyId = ?'
    db.query(sql, [account, onlyId], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows === 1) {
            const sql1 = 'update users set image_url = ? where account = ?'
            db.query(sql1, [url, account], (err, result) => {
                if (err) return res.cc(err)
                res.send({
                    status: 0,
                    message: '修改成功'
                })
            })
        }
    })
}
// 获取身份分类列表

// 通过身份搜索角色
exports.getIdentityCategory = (req, res) => {
    const sql = 'select * from identity'
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取成功',
            data: result
        })
    })
}

//[修改角色身份分类]
exports.updateIdentityCategory = (req, res) => {
    const { value, id } = req.body
    let title = value
    const sql = 'update identity set value=?,title=? where id = ?'
    db.query(sql, [value, title, id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改成功',
        })
    })
}

// [删除角色分类]
exports.deleteIdentityCategory = (req, res) => {
    const sql = 'delete from identity where id = ?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除成功',
        })
    })
}

// [添加角色分类]
exports.addIdentityCategory = (req, res) => {
    const { value } = req.body
    const sql = 'select * from identity where value=?'
    db.query(sql, value, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('该角色分类已存在')
        let label = value
        const sql1 = 'insert into identity set ?'
        db.query(sql1, { label, value }, (err, results1) => {
            if (err) return res.cc(err)

            const sql2 = 'select * from identity where value=?'
            db.query(sql2, value, (err, results2) => {
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

// 修改用户信息

exports.updateSelfUserInfo = (req, res) => {
    const { identity, name, sex,email, intro, id } = req.body
    const sql1 = 'select * from users where id = ?'
    db.query(sql1, id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length > 0) {
            const update_time = new Date()
            const sql = `update users set identity=? ,name=? ,sex=?,intro=?,update_time=? where id =${id}`
            db.query(sql, [identity, name, sex,email, intro, update_time], (err, results) => {
                if (err) return res.cc(err)
                res.send({
                    status: 0,
                    message: '用户信息成功'
                })
            })
        }
    })
}



// 是否禁用角色
exports.banAndHotUser = (req, res) => {
    const { id, status } = req.body
    const sql = 'update users set status=? where id = ?'
    db.query(sql, [status, id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '操作成功',
        })
    })
}



