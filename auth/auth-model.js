const bcrypt = require('bcrypt')
const db = require('../database/dbConfig')

//get users
function find() {
    return db('users').select('id', 'username')
}

//add
async function add(user) {
    user.password = await bcrypt.hash(user.password, 13)

    const [id] = await db('users').insert(user)

    return findById(id)
}

//findBy
function findBy(filter) {
    return db('users').where(filter)
}

//findById
function findById(id) {
    return db('users').where({ id }).first('id', 'username')
}


module.exports = {
    find,
    add,
    findBy,
    findById
}