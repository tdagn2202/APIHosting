var config = require('./dbconfig');
const sql = require('mssql');


const getUsers = async () => {
    try {
        let pool = await sql.connect(config)
        let query = await pool.request().query('SELECT * FROM student')
        return (await query).recordsets
    } catch (error) {
        console.log(error)
    }
}

const getUserByID = async (uid) => {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('id', sql.Int, uid)
            .query("SELECT * from student where id = @id");
        return product.recordsets;


    }
    catch (error) {
        console.log(error);
    }
} 


const insertUser = async (table) => {
    try {
        let pool = await sql.connect(config)
        let product = await pool.request()
            .input('name', sql.VarChar, table.name)
            .input('age', sql.Int, table.age)
            .query('INSERT INTO student (name, age) VALUES (@name, @age)'); 
        return product.recordsets
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (props) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
           .input('id', sql.Int, props.id)          // Input for user id
           .input('newName', sql.VarChar, props.name) // Input for the new name
           .input('age', sql.Int, props.age)        // Input for the new age
           .query("UPDATE student SET name = @newName, age = @age WHERE id = @id"); // Update both name and age based on id

            const rowsAffected = result.rowsAffected;
            console.log('Rows affected:', rowsAffected);
        return result.recordsets; 
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (props) => {
    try {
        let pool = await sql.connect(config)
        let result = await pool.request()
        .input('id', sql.Int, props.id)
        .query('DELETE FROM student WHERE id = @id');
        return result.recordsets
    } catch (error){
        console.log(error);
    }
}


const login = async (props) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('username', sql.VarChar, props.username)
            .query('SELECT * FROM account WHERE username = @username');
        return result.recordset;  // Return the first result set (which is an array of records)
    } catch (e) {
        console.log(e);
    }
};



//xuất khẩu lao động
module.exports = {
    getUsers: getUsers,
    getUserByID: getUserByID,
    insertUser: insertUser,
    updateUser: updateUser,
    deleteUser : deleteUser,
    login: login
}
