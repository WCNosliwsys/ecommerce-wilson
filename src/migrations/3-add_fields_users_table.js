'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "status" to table "users"
 * addColumn "rol_id" to table "users"
 * addColumn "password" to table "users"
 * addColumn "email" to table "users"
 * addColumn "username" to table "users"
 * addColumn "last_name" to table "users"
 *
 **/

var info = {
    "revision": 3,
    "name": "add_fields_users_table",
    "created": "2023-11-04T03:07:36.248Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "users",
            "status",
            {
                "type": Sequelize.BOOLEAN,
                "field": "status",
                "defaultValue": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "rol_id",
            {
                "type": Sequelize.INTEGER,
                "field": "rol_id"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "password",
            {
                "type": Sequelize.STRING,
                "field": "password"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "email",
            {
                "type": Sequelize.STRING,
                "field": "email"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "username",
            {
                "type": Sequelize.STRING,
                "field": "username"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "last_name",
            {
                "type": Sequelize.STRING,
                "field": "last_name"
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
