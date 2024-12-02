const { request, response } = require("express");
const Client = require("../models/client");

const getClients = async (req = request, res = response) => {
  const clients = await Client.findAll();
  res.json(clients);
};

const postClients = async (req = request, res = response) => {
  const { body } = req;
  try {
    const client = new Client(body);
    await client.save();
    res.status(201).json({
      message: "Client creado exitosamente",
      client,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hable con el admin",
    });
  }
};

const putClients = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({
        msg: "no existe un client con ese id" + id,
      });
    }
    await client.update(body);
    res.status(201).json({
      message: "cliente editado exitosamente",
      client,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hable con el admin",
    });
  }
};

const deleteClients = async (req = request, res = response) => {
  const { id } = req.params;
  const client = await Client.findByPk(id);

  if (!client) {
    return res.status(404).json({
      msg: "no existe el clieente on ese id" + id,
    });
  }
  // await book.estado({estado:false});
  await client.destroy();
  res.json({
    ok: true,
    msg: "cliemt eliminado",
  });
};

module.exports = {
  getClients,
  postClients,
  putClients,
  deleteClients,
};
