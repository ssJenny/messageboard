/**
 * Created by Administrator on 2017/6/29.
 */
var express = require("express")
var operaDB = require("./model/operaDB.js")
var ObjectID = require('mongodb').ObjectID
var bodyParser  = require("body-parser")
var router = require("./controller/router.js")

var app = express();

app.use(bodyParser.urlencoded({extended:false}))

//设置模板引擎
app.set("view engine","ejs");

//静态化路径
app.use(express.static("./public"));
//
app.get("/", router.showInfo)
app.post("/addMessage" , router.addMessage)
app.get("/del:delid",router.delete)
app.get("/page:num",router.showInfoPage)


app.listen(3000)