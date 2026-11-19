
import Card from "../models/card.js";
import type { Request, Response } from "express";

export const getCards = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    throw Object.assign(new Error("Unauthorized"), {
      statusCode: 401,
    });
  }

  const cards = await Card.find({ owner: userId }).sort({
    createdAt: -1,
  });

  const cardsWithIsLiked = cards.map((card) => ({
    ...card.toObject(),
    isLiked: card.likes.some((id) => id.toString() === userId),
  }));

  res.send(cardsWithIsLiked);
};

export const likeCard = async (req: Request, res: Response) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    throw Object.assign(new Error("Card ID not found"), {
      statusCode: 404,
    });
  }

  if (card.owner.toString() !== req.user?._id) {
    throw Object.assign(new Error("Forbidden"), {
      statusCode: 403,
    });
  }

  const updatedCard = await Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  );

  const userId = req.user?._id;

  res.send({
    ...updatedCard!.toObject(),
    isLiked: updatedCard!.likes.some((id) => id.toString() === userId),
  });
};

export const dislikeCard = async (req: Request, res: Response) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    throw Object.assign(new Error("Card ID not found"), {
      statusCode: 404,
    });
  }

  if (card.owner.toString() !== req.user?._id) {
    throw Object.assign(new Error("Forbidden"), {
      statusCode: 403,
    });
  }

  const updatedCard = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user?._id } },
    { new: true },
  );

  const userId = req.user?._id;

  res.send({
    ...updatedCard!.toObject(),
    isLiked: updatedCard!.likes.some((id) => id.toString() === userId),
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
  const card = await Card.findById(req.params.id);

  if (!card) {
    throw Object.assign(new Error("Card ID not found"), {
      statusCode: 404,
    });
  }

  if (card.owner.toString() !== req.user?._id) {
    throw Object.assign(new Error("Forbidden"), {
      statusCode: 403,
    });
  }

  await Card.findByIdAndDelete(req.params.id);

  res.send(card);
};

export { createCard, deleteCard };
