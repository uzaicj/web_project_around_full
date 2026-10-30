import Card from "../models/card.js";
import type { Request, Response } from "express";


export const getCards = async (req: Request, res: Response) => {
  const cards = await Card.find({});
  const userId = req.user?._id;

  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  }));

  res.send(cardsWithIsLiked);
};


export const likeCard = async (req: Request, res: Response) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  );

  if (!card) {
    throw Object.assign(new Error("No se encontró ninguna tarjeta con ese id"), {
      statusCode: 404,
    });
  }

  const userId = req.user?._id;
  res.send({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  });
};


export const dislikeCard = async (req: Request, res: Response) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user?._id } }, // elimina _id del array
    { new: true },
  );
  if (!card) {
    throw Object.assign(new Error("No se encontró ninguna tarjeta con ese id"), {
      statusCode: 404,
    });
  }

  const userId = req.user?._id;
  res.send({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  });
};

const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;

  const newCard = new Card({
    name,
    link,
    owner: req.user?._id,
  });

  await newCard.save();

  res.status(201).json({
  ...newCard.toObject(),
  isLiked: false,
});
};

const deleteCard = async (req: Request, res: Response) => {
  const data = await Card.findByIdAndDelete(req.params.id);

  if (!data) {
    throw Object.assign(new Error("Card ID not found"), {
      statusCode: 404,
    });
  }

  res.send(data);
};

export { createCard, deleteCard };