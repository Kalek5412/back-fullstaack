const { request, response } = require("express");
const Book = require("../models/book");

const getBooks = async (req = request, res = response) => {
  const books = await Book.findAll();
  res.json(books);
};

const postBooks = async (req = request, res = response) => {
  const { body } = req;
  try {
    const book = new Book(body);
    await book.save();
    res.status(201).json({
      message: "Libro creado exitosamente",
      book,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hable con el admin",
    });
  }
};

const putBooks = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        msg: "no existe un libro con ese id" + id,
      });
    }
    await book.update(body);
    res.status(201).json({
      message: "Libro editado exitosamente",
      book,
    });
  } catch (error) {
    res.status(500).json({
      msg: "hable con el admin",
    });
  }
};

const deleteBooks = async (req = request, res = response) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (!book) {
    return res.status(404).json({
      msg: "no existe el libro on ese id" + id,
    });
  }
  // await book.estado({estado:false});
  await book.destroy();
  res.json({
    ok: true,
    msg:"libro eliminado",
  });
};

module.exports = {
  getBooks,
  postBooks,
  putBooks,
  deleteBooks,
};
