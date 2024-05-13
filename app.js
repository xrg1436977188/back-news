const express = require('express');
const path = require('path');
const app=express()
// Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
const multer = require("multer");
// 在server服务端下新建一个public文件，在public文件下新建upload文件用于存放图片
const upload = multer({
  dest: './public/upload'
})
app.use(upload.any())
// 静态托管
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static("./public"));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// 导入body-parser
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
// 当extended为false时，值为数组或者字符串，当为ture时，值可以为任意类型
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())


// 导入cors  解决跨域问题
const cors = require('cors')
// 全局挂载
app.use(cors())



app.use((req, res, next) => {
  // status=0为成功,=1为失败,默认设为1,方便处理失败的情况
  res.cc = (err, status = 1) => {
    res.send({
      status,
      // 判断这个error是错误对象还是字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

const jwtConfig = require('./jwt_config/index.js')
const {
  expressJwt: jwt
} = require('express-jwt')
// app.use(jwt({
// 	secret:jwtConfig.jwtSecretKey,algorithms:['HS256']
// }).unless({
// 	path:[/^\/api\//]
// }))

const loginRouter=require('./router/login')
app.use('/api',loginRouter)
const roleRouter=require('./router/role')
app.use('/role',roleRouter)
const menuRouter=require('./router/menu')
app.use('/menu',menuRouter)
const newsRouter=require('./router/news')
app.use('/news',newsRouter)

// 对不符合joi规则的情况进行报错
app.use((err,req, res, next) => {
  if (err instanceof Joi.ValidationError){
    return res.send({
      status: 1,
      message:'输入的数据不符合验证规则'
    })
  }
})

//全局中间件
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.send({
      status:401,
      message:'无效的Token',

    })
  }
  res.send({
        status:500,
        message:'未知的错误',
      }
  )
});


app.listen(3000,()=>{
  console.log('http://127.0.0.1:3000')
})