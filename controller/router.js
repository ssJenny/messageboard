/**
 * Created by Administrator on 2017/6/29.
 */

var operaDB = require("../model/operaDB");
//
exports.showInfo = function (req, res) {
    var pageSize = 2;
    var page = 0

    operaDB.selectAll("message",[pageSize,page], function (err, result, totalNum) {

        if(err){
            console.log(err)
            // next()
            return
        }

        if(totalNum % pageSize == 0){
            pageNum = totalNum / pageSize
        }else{
            pageNum = parseInt(totalNum / pageSize + 1)
        }

        // console.log(result)
        res.render("index",{
            "messages":result,
            "pageNum":pageNum,
            "page":page,
            "pageActive":"active"
        })
        res.end()
    })
}
//
exports.showInfoPage = function (req, res) {

    var page = req.params.num.split("=")[1];

    var pageSize = 2;

    operaDB.selectAll("message",[pageSize,page], function (err, result, totalNum) {

        if(err){
            console.log(err)
            return
        }

        if(totalNum % pageSize == 0){
            pageNum = totalNum / pageSize
        }else{
            pageNum = parseInt(totalNum / pageSize + 1)
        }
        res.render("index",{
            "messages":result,
            "pageNum":pageNum,
            "page":page,
            "pageActive":"active"
        })
        res.end()
    })
}

exports.delete = function (req, res) {
    var condition = {
        "_id":new ObjectID(req.params.delid)
    }

    operaDB.deleteMany("message", condition, function (err, result) {
        if(err){
            console.log(err)
            return
        }
        if(result.ok){
            res.redirect("/")
            res.end()
        }
    })
}

exports.addMessage = function (req, res) {
    var date = new Date();
    var dataJson = {
        "name":req.body.name,
        "content":req.body.content,
        "datetime":date
    }
    operaDB.addInfo("message",dataJson,function (err,result) {
        if(err){
            console.log(err)
            return
        }

        res.redirect("/")
        res.end()
    })
}