/**
 * Created by Administrator on 2017/6/28.
 */
var setUrl = require("../setUrl.js")
var MongoClient = require('mongodb').MongoClient;

//连接数据库
function connectdb(callback) {
    MongoClient.connect(setUrl.url, function (err, db){
        if(err){
            callback(err,null)
            return
        }
        callback(null,db)
    })
}


exports.selectAll = function (arg1, arg2, arg3, arg4) {
    var collectionName = arg1;
    var condition = {};
    var limit = {
        limitNum:0,
        page:0
    }
    var callback = null

    if(arguments.length == 2){
        callback = arg2;
        // console.log(callback)
    }else if(arguments.length == 3){

        //判断为三个参数时，传递的查询条件还是分页控制

        if(arg2 instanceof Array){
            limit.limitNum = arg2[0]
            limit.page = arg2[1]
        }else{
            condition = arg2;
        }
        callback = arg3;
    }else if(arguments == 4){
        condition = arg2;
        limit.limitNum = arg3[0]
        limit.page = arg3[1]
        callback = arg4;
    }else{
        console.log("参数个数错误")
        return
    }

    connectdb(function (err,db) {
        var totalNum = 0;
        //查询总数
         db.collection(collectionName).find(condition).count(function (err, count) {
            if (err){
                console.log(err)
                return
            }
             totalNum = count
        });

        var cursor = db.collection(collectionName).find(condition).limit(limit.limitNum).skip(limit.limitNum*limit.page);
        var result = [];

        //遍历查询结果
        cursor.each(function (err, doc) {

            if(err){
                callback(err,null,null)
                return
            }

            if(doc != null){
                result.push(doc)
            }else{

                callback(null,result,totalNum)
                db.close();

            }
        })
    })
}



exports.addInfo = function (collectionName, dataJson, callback) {
    connectdb(function (err, db) {
        db.collection(collectionName).insertOne(dataJson,function(err,doc){
            if(err){
               callback(err, null)
                return;
            }
            callback(null, doc)
            db.close();
        })

    })
}


exports.updateMany = function (collectionName, condition, updateJson, callback) {
    connectdb(function (err, db) {
        db.collection(collectionName).updateMany(condition,updateJson, function (err, result) {
            if(err){
                callback(err, null)
                result
            }
            callback(null,result)
            db.close()
        })
    })
}


exports.deleteMany = function (collectionName, condition, callback) {
    connectdb(function (err, db) {
        console.log(condition)
           db.collection(collectionName).deleteMany(condition, function (err,result) {
               if(err){
                   callback(err, null)
                   return
               }
               callback(null,result)
               db.close()
           });
    })
}