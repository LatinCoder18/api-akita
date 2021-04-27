const passport = require('passport');
const query = require('../db/mysql-connection');
const { multipleColumnSet } = require('../utils/common');
//const Role = require('../utils/userRoles.utils');


class Model {
    constructor(tableName){
        this.tableName=tableName
    }
    
    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ nombre, apellidos, CI, movil,telefono, password }) => {
        //Validar q el userno exista

        //Mejorar Metodo
        const sql = `INSERT INTO ${this.tableName}
        (nombre, apellidos, CI, movil, password, activo, verificado) VALUES (?,?,?,?,?,?,?)`;

        //const result = await query(sql, [nombre, apellidos, CI, movil, password, true, false]);
        try{
        const result = await query(sql, ["Luis", "Perez", "9401", "32", password, true, false]);
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows;
        }
        catch(err){
            console.log(err);
        }
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;
        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = Model;
