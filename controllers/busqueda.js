const { response } = require("express");
const { Op } = require('sequelize');
const Book = require("../models/book");


const getBusqueda = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  try {
 
    const books = await Book.findAll({
      where: {
        name: {
          [Op.like]: `%${busqueda}%`  
        }
      }
      });

    // Respuesta de éxito
    res.json({
      ok: true,
      books,
    });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({
      ok: false,
      msg: "Error al realizar la búsqueda",
      error: error.message,
    });
  }
};

module.exports = { getBusqueda }