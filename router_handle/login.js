const db = require('../db/index.js')
// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs')
// 导入jwt,用于生成token
const jwt = require('jsonwebtoken')
// 导入jwt配置文件，用于加密跟解密
const jwtConfig = require('../jwt_config/index.js')
// 登录接口

exports.login = (req, res) => {
    const logInfo = req.body
    // 第一步 查看数据表中有没有前端传过来的账号
    const sql = 'select * from users where account = ?'
    db.query(sql, logInfo.account, (err, results) => {
        // 执行sql语句失败的情况 一般在数据库断开的情况会执行失败
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('登录失败')
        if (results[0].status === 1) {
            return res.cc('该账号已被冻结')
        }
        // 第二步 对前端传过来的密码进行解密
        const compareResult = bcrypt.compareSync(logInfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('登录失败')
        }
        // 第四步 生成返回给前端的token
        // 剔除加密后的密码,创建时间,更新时间
        const user = {
            ...results[0],
            password: '',
            create_time: '',
            update_time: '',
        }
        // 设置token的有效时长 有效期为7个小时
        const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey, {
            expiresIn: '7h'
        })
        res.send({
            data: results[0],
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr,
        })
    })
}


exports.register = (req, res) => {
    // req是前端传过来的数据,也就是request,res是返回给前端的数据,也就是response
    const regInfo = req.body
    // 第一步,判断前端传过来的数据有没有空
    if (!regInfo.account || !regInfo.password) {
        return res.send({
            status: 1,
            message: '账号或者密码不能为空'
        })
    }
    // 第二步,判断前端传过来账号有没有已经存在在数据表中
    // 需要使用mysql的select语句
    const sql = 'select * from users where account = ?'
    // 第一个参数是执行语句，第二个是参数，第三个是一个函数，用于处理结果
    db.query(sql, regInfo.account, (err, results) => {
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '账号已存在'
            })
        }
        // 第三步,对密码进行加密
        // 需要使用加密中间件 bcrypt.js
        // bcrypt.hashSync，第二个参数是加密后的长度
        regInfo.password = bcrypt.hashSync(regInfo.password, 10)
        // 第四步,把账号跟密码插入到users表里面
        const sql1 = 'insert into users set ?'
        // 注册身份
        const identity = '用户'
        // 创建时间
        const create_time = new Date()
        db.query(sql1, {
            account: regInfo.account,
            password: regInfo.password,
            // 身份
            identity,
            // 创建时间
            create_time,
            // 初始未冻结状态为0
            status: 0,
        }, (err, results) => {
            // 第一个,插入失败
            // affectedRows为影响的行数，如果插入失败，那么就没有影响到行数，也就是行数不为1
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册账号失败'
                })
            }
            res.send({
                status: 0,
                message: '注册账号成功'
            })
        })
    })
}

// 登录页面实现忘记密码
exports.forget = (req, res) => {
    const {account, email, password} = req.body
    const sql = 'select * from users where account=?'
    db.query(sql, account, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('账号不存在')
        if (result[0].status === 1) return res.cc('账号已被冻结')
        const sql1 = 'select * from users where email=?'
        db.query(sql1, email, (err, result1) => {
            if (err) return res.cc(err)
            if (result1.length !== 1) return res.cc('邮箱错误')
            let syncPassword = bcrypt.hashSync(password, 10)
            const sql2 = 'update users set password=? where account=?'
            db.query(sql2, [syncPassword, account], (err, result3) => {
                if (err) return res.cc(err)
                if (result3.affectedRows !== 1) return res.cc('修改密码失败')
                res.cc('修改密码成功', 0)
            })

        })
    })

}

