// cards-api.js

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory card collection
let cards = [
  { id: 1, suit: "Hearts", value: "Ace" },
  { id: 2, suit: "Spades", value: "King" },
  { id: 3, suit: "Diamonds", value: "Queen" }
];

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Playing Cards API! 🎴 Use /cards to get started.");
});

// GET all cards
app.get("/cards", (req, res) => {
  res.json(cards);
});

// GET a card by ID
app.get("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }
  res.json(card);
});

// POST a new card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) {
    return res.status(400).json({ message: "Suit and value are required" });
  }
  const newCard = {
    id: cards.length > 0 ? cards[cards.length - 1].id + 1 : 1,
    suit,
    value
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// PUT (update) a card by ID
app.put("/cards/:id", (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) {
    return res.status(404).json({ message: "Card not found" });
  }

  const { suit, value } = req.body;
  if (suit) card.suit = suit;
  if (value) card.value = value;

  res.json({
    message: `Card with ID ${card.id} updated successfully`,
    card
  });
});

// DELETE a card by ID
app.delete("/cards/:id", (req, res) => {
  const cardIndex = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (cardIndex === -1) {
    return res.status(404).json({ message: "Card not found" });
  }
  const removedCard = cards.splice(cardIndex, 1)[0];
  res.json({
    message: `Card with ID ${removedCard.id} removed`,
    card: removedCard
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
