const express = require('express')
const cors = require('cors');
const db =require('../database/config')

class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.booksPath='/api/book';
        this.clientsPath='/api/client';
        this.ordersPath='/api/order';
        this.orderDetailsPath='/api/order-detail';
        this.busquedaPath='/api/busqueda';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    
    async  conectarDB(){
        try {
            await db.authenticate();
            console.log("mysql conectado xamp !!");
        } catch (error) {
            console.log('error al conectar la bd ');
            throw new Error(error);
        }
       
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }

    routes(){
       this.app.use(this.booksPath,require('../routes/books'));
       this.app.use(this.clientsPath,require('../routes/clients'));
       this.app.use(this.ordersPath,require('../routes/orders'));
       this.app.use(this.orderDetailsPath,require('../routes/orderDetails'));
       this.app.use(this.busquedaPath,require('../routes/busqueda'));
    }

    listen(){
       this. app.listen(this.port);
    }

}

module.exports=Server