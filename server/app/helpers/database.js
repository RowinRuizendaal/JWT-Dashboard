const bcrypt = require("bcrypt");
const Users = require("../models/user.js");
const Blogs = require("../models/blogs.js");

const jwt = require("jsonwebtoken");

async function checkValidUser(email, password) {
    const user = await Users.findOne({
        emailAddress: email,
    });

    // If user exist with email
    if (user) {
        const compareSalt = await bcrypt.compare(password, user.password);

        // If salt is true
        if (compareSalt) {
            return user;
        }
    }
    // No user has been found so return false
    return false;
}

async function findOneUser(id) {
    const user = await Users.findOne({
        _id: id,
    });

    if (user) {
        return user;
    }
}

/**
 * Create new user
 *
 * @param {Object} userCredentials - Data of the new registered user
 *
 */

async function createUser({ firstName, surName, emailAddress, password }) {
    const newUser = await Users.create({
        firstName: firstName,
        surName: surName,
        emailAddress: emailAddress,
        password: password,
    });

    return newUser;
}

async function getAllBlogs() {
    const blogs = await Blogs.findOne();

    if (blogs) {
        return blogs;
    }

    console.log("Error gettings blogs");
}

async function getAllUsers() {
    const users = await Users.find()
        .select(["-password"])
        .catch((err) => {
            console.log(err);
        });

    return users;
}

module.exports = {
    checkValidUser,
    findOneUser,
    createUser,
    getAllBlogs,
    getAllUsers,
};