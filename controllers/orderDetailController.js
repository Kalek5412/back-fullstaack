const { request, response } = require("express");
const OrderDetail = require("../models/OrderDetail");
const Order = require("../models/order");
const Book = require("../models/book");

const getOrderDetails = async (req = request, res = response) => {
  const orderDetails = await OrderDetail.findAll();
  res.json(orderDetails);
};

const postOrderDetails = async (req = request, res = response) => {
    const { order_id, book_id, detail_price, quantity } = req.body;
    try {
      const order = await Order.findByPk(order_id); 
      const book = await Book.findByPk(book_id); 
      if (!order) {
        return res.status(400).json({
          msg: "El order con ese ID no existe",
        });
      }
      if (!book) {
        return res.status(400).json({
          msg: "El order con ese ID no existe",
        });
      }
      const order_detail = await OrderDetail.create({
        order_id,
        book_id,
        detail_price,
        quantity,
         
      });
      res.status(201).json({
        message: "Order creado exitosamente",
        order_detail,
      });
    } catch (error) {
      res.status(500).json({
        msg: "hable con el admin",
      });
    }
};

const putOrderDetails = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) {
      return res.status(404).json({
        msg: "no existe un OrderDetail con ese id" + id,
      });
    }
    await orderDetail.update(body);
    res.status(201).json({
      message: "OrderDetaile editado exitosamente",
      orderDetail,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hable con el admin",
    });
  }
};

const deleteOrderDetails = async (req = request, res = response) => {
  const { id } = req.params;
  const orderDetail = await OrderDetail.findByPk(id);

  if (!orderDetail) {
    return res.status(404).json({
      msg: "no existe el detalle de orden on ese id" + id,
    });
  }
  // await book.estado({estado:false});
  await orderDetail.destroy();
  res.json({
    ok: true,
    msg: "detalle de orden eliminado",
  });
};

module.exports = {
  getOrderDetails,
  postOrderDetails,
  putOrderDetails,
  deleteOrderDetails,
};
