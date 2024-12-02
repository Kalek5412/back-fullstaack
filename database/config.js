const { Sequelize } = require('sequelize');
        const db = new Sequelize(
            'base_node','root','',
            {
                host: 'localhost',  
                dialect: 'mysql',             
                //logging: false,               
            }
        );
module.exports=db;