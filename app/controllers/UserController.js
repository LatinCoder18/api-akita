const User = require('../models/User');
const Sequelize = require('sequelize');
const HttpException = require('../utils/HttpException');
//const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const dotenv = require('dotenv').config();
const db = require('../models/index');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    getAllUsers = async (req, res, next) => {
        let userList = await User.findAll({attributes: ['nombre']});
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }
        userList = userList.map(user => {
            const {
                password,
                ...userWithoutPassword
            } = user;
            return userWithoutPassword;
        });

        res.send(userList);
    };

    getUserById = async (req, res, next) => {
        const user = await db.User.findById(
            req.params.id
        );
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const {
            password,
            ...userWithoutPassword
        } = user;
        res.send(userWithoutPassword);
    };

    getUserByuserName = async (req, res, next) => {
        //Pasar parametro variable
        req.params.nombre="Domingo";
        let a ='nombre';
        const user = await UserModel.findOne({
            nombre : req.params.nombre
        });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const {
            password,
            ...userWithoutPassword
        } = user;

        res.send(userWithoutPassword);
    };

    getCurrentUser = async (req, res, next) => {
        const {
            password,
            ...userWithoutPassword
        } = req.currentUser;

        res.send(userWithoutPassword);
    };

    createUser = async (req, res, next) => {
        //        this.checkValidation(req);

        req.body.password="secret";
        req.body.activo= true;
        req.body.verificado= false;

        await this.hashPassword(req);
        const result = await db.User.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Error en el registro');
        }
        res.status(201).send(result);
    };

    updateUser = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const {
            confirm_password,
            ...restOfUpdates
        } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await UserModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const {
            affectedRows,
            changedRows,
            info
        } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({
            message,
            info
        });
    };

    deleteUser = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('User has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists

    hashPassword = async (req,res,next) => {
        if (req.body.password) {
            try {
                req.body.password = await argon2.hash(req.body.password);    
            } catch (err) {
                next(err);
            }
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;
