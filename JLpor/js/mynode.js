let express = require("express")();
let mysql = require("mysql");
let port = 8081;

// Node解决跨域问题
express.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

// 引入数据库
var sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    // port: 8081,
    password: "980504",
    database: "my",
})

sql.connect();

// 1.注册接口
express.get("/zhuce", (request, response) => {
    let username = request.query.username;
    let password = request.query.password;

    sql.query(`INSERT INTO denglu (username,password) VALUES ("${username}","${password}")`, (error) => {
        if (error) {
            response.send("error");
            // console.log(error);

        } else {
            // console.log("111")
            response.send("success")
                // console.log(success);
        }
    })
})

// 2.登录接口

express.get("/denglu", (request, response) => {
    let username = request.query.username;
    let password = request.query.password;

    sql.query(`SELECT * FROM denglu WHERE username="${username}" AND password="${password}"`, (error, data) => {
        if (error) {
            response.send("error");
        } else {
            if (!data.length) {
                response.send("error");
            } else {
                response.send("success");
            }
        }
    })
})


//3.列表页数据1
express.get("/libiaolist", function(request, response) {
    let name = request.query.phonename;
    sql.query('SELECT * FROM customer', function(error, data) {
        if (error) {
            console.log(error);
            response.end("error");
        } else {
            response.send(JSON.stringify(data))
        }
    })

})


// 4.列表数据2
express.get("/peijian", function(request, response) {
    let name = request.query.pjname;
    sql.query('SELECT * FROM peijian', function(error, data) {
        if (error) {
            console.log(error);
            response.end("error");
        } else {
            response.send(JSON.stringify(data))
        }
    })

})


// express.get("/selet", function(request, response) {
//         sou = request.query.sou;

//         sql.query(`SELECT * FROM customer WHERE phonename="${sou}"`, function(error, data) {
//             if (error) {
//                 console.log(error);
//                 response.end("error");
//             } else {
//                 response.send(JSON.stringify(data))
//             }
//         })
//     })
//     // 搜索页面
// express.get("/sousuo", function(request, response) {
//     // let name = request.query.phonename;
//     // let pic = request.query.pic;
//     sou = request.query.sou;


// })

// 5.搜索页面
express.get("/sousuo", function(request, response) {
    sou = request.query.sou
    express.get("/selet", function(request, response) {
        sql.query(`SELECT * FROM customer WHERE phonename="${sou}"`, function(error, data) {
            if (error) {
                console.log(error)
                response.send("error")
                return;
            }
            response.send(JSON.stringify(data));
        })
    })
})

// 6.详情页1
express.get("/xiangqing", function(request, response) {
    // let name = request.query.phonename;
    sql.query('SELECT * FROM xiangqing', function(error, data) {
        if (error) {
            console.log(error);
            response.send("error");
        } else {
            response.send(JSON.stringify(data));
        }
    })

})


// 7.详情页2
express.get("/xiangqingtk", function(request, response) {
    // let name = request.query.phonename;
    sql.query('SELECT * FROM xqtk', function(error, data) {
        if (error) {
            console.log(error);
            response.send("error");
        } else {
            response.send(JSON.stringify(data));
        }
    })

})


express.get("/shopping", function(request, response) {
    // let name = request.query.phonename;
    sql.query('SELECT * FROM xqtk', function(error, data) {
        if (error) {
            console.log(error);
            response.send("error");
        } else {
            response.send(JSON.stringify(data));
        }
    })

})


express.listen(port)
console.log("server is running at " + port)