const { request, response } = require("express");
const Order = require("../models/order");
const Client = require("../models/client");

const getOrders = async (req = request, res = response) => {
  const orders = await Order.findAll({
    include: {
      model: Client,
      attributes: [
       
        "doc_type",
        "doc_number",
        "first_name",
        "last_name",
        "email",
        "phone",
      ],
    },
  });
  res.json(orders);
};

const postOrders = async (req = request, res = response) => {
  const { client_id, doc_type, doc_number, total } = req.body;
  try {
    const client = await Client.findByPk(client_id);
    if (!client) {
      return res.status(400).json({
        msg: "El cliente con ese ID no existe",
      });
    }
    const order = await Order.create({
      client_id,
      doc_type,
      doc_number,
      total,
      created_at: new Date(),
    });
    res.status(201).json({
      message: "Order creado exitosamente",
      order,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hable con el admin",
    });
  }
};

const putOrders = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({
        msg: "no existe un order con ese id" + id,
      });
    }
    await order.update(body);
    res.status(201).json({
      message: "Ordere editado exitosamente",
      order,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hable con el admin",
    });
  }
};

const deleteOrders = async (req = request, res = response) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);

  if (!order) {
    return res.status(404).json({
      msg: "no existe el clieente on ese id" + id,
    });
  }
  // await book.estado({estado:false});
  await order.destroy();
  res.json({
    ok: true,
    msg: "orden eliminado",
  });
};

module.exports = {
  getOrders,
  postOrders,
  putOrders,
  deleteOrders,
};
