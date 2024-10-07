const dboperation = require('./dpoperations')
var student = require('./student')
var account = require('./account')
const bcrypt = require('bcrypt');
//import libraries
var express = require('express');   //tạo api
var bodyParser = require('body-parser');    //parse request và response
var cors = require('cors');     //bật share source gốc
const { request, response } = require('express/lib/express');
const dpoperations = require('./dpoperations');
var app = express();       //tạo object express để xử dụng các lệnh
var router = express.Router();      //router để tổ chức và tách các route thành các module, giúp mã nguồn rõ ràng và dễ quản lý hơn


//import ở trên ròi dưới này khai báo sử dụng nó
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


//route này sẽ luôn được gọi đầu tiên. Hàm next để chạy xong nó sẽ chạy method kế
router.use((request, response, next) => {
    console.log("MIDDLEWARE")
    next()
})


//route nó sẽ hiện thanh url trang mình đang thấy là tên gì. Và method này sẽ return cái getUsers
router.route('/student').get((request, response) => {

    // dboperation.getUsers().then(result => console.log(result))
    dboperation.getUsers().then(result => response.json(result[0]))
})


router.route('/student/:id').get((request, response) => {
    dboperation.getUserByID(request.params.id).then(result => response.json(result[0]))
})


router.route('/student').post((request,response)=>{
    let table_tmp = {...request.body}
    dboperation.insertUser(table_tmp).then(result => {
        response.send(JSON.stringify({
            success: true,
            notice: "Bạn đã thêm người dùng thành công",
            
        }))
       
    })
})

router.route('/student').put((request, response) => {
    let newData = {...request.body}
    dboperation.updateUser(newData).then(result => {
        response.send(JSON.stringify({
            success: true,
            notice: "Bạn đã cập nhật người dùng thành công",
        }))
    })
})

router.route('/student').delete((req, res)=> {
    let newData = {...req.body}
    dboperation.deleteUser(newData).then(result => {
        res.send(JSON.stringify({
            success: true,
            notice: "Bạn đã xóa người dùng thành công",
        }))
    })
})

router.route('/student/login').post(async (req, res) => {
    try {
        let userInsert = { ...req.body };  // Correct 'req' instead of 'request'
        const result = await dboperation.login(userInsert);  // Await the login operation

        if (result.length > 0) {
            const account = result[0];  // Get the first user (if any)
            const match = (req.body.password === (account.password));  // Await bcrypt comparison

            if (match) {
                res.status(200).json({
                    message: 'Logged in'
                });
            } else {
                res.status(401).json({
                    message: 'Login failed: Incorrect password'
                });
            }
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res

    }});

//Configure cổng port cho nó kết nối remote hoặc local
var port = process.env.PORT || 5000;
app.listen(port);
console.log('Order API is runnning at ' + port);




