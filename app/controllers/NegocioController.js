const HttpException = require('../utils/HttpException');
//const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const dotenv = require('dotenv').config();
const db = require('../models/index');

/******************************************************************************
 *                              Negocio Controller
 ******************************************************************************/
class NegocioController {
    getAllNegocios = async (req, res, next) => {
        let negocioList = await db.Negocio.findAll({attributes: { exclude: ['password'] }});
        if (!negocioList.length) {
            throw new HttpException(404, 'No se encontraron negocios');
        }
        res.send(JSON.stringify(negocioList));
    };

    getNegocioById = async (req, res, next) => {
        const negocio = await db.Negocio.findByPk(
            req.params.id,{attributes: {exclude: 'password'}}
        );
        if (!negocio) {
            throw new HttpException(404, 'Negocio no encontrado');
        }
        res.send(JSON.stringify(negocio));
    };

    getCurrentNegocio = async (req, res, next) => {
        const {
            password,
            ...userWithoutPassword
        } = req.currentUser;

        res.send(userWithoutPassword);
    };

    createNegocio = async (req, res, next) => {
        //        this.checkValidation(req);

        await this.hashPassword(req);
        const result = await db.Negocio.create(req.body);
        console.log(result);

        if (!result) {
            throw new HttpException(500, 'Error en el registro');
        }
        res.status(201).send(result);
    };

    updateNegocio = async (req, res, next) => {
       // this.checkValidation(req);
        //await this.hashPassword(req);

        const {
            confirm_password,
            ...restOfUpdates
        } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await db.Negocio.update(restOfUpdates, req.params.id);

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

    deleteNegocio = async (req, res, next) => {
        const result = await db.Negocio.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Negocio no encontrado');
        }
        res.send('Negocio eliminado');
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
module.exports = new NegocioController;
