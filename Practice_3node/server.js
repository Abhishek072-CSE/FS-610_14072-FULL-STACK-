const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

 
const seats = {};
const totalSeats = 10;
const lockDuration = 60 * 1000; // 1 minute in ms

 
for (let i = 1; i <= totalSeats; i++) {
  seats[i] = { status: "available", lockUntil: null };
}

 
app.get("/seats", (req, res) => {
  res.json(seats);
});

 
app.post("/lock/:id", (req, res) => {
  const seatId = req.params.id;
  const seat = seats[seatId];

  if (!seat) {
    return res.status(404).json({ message: "Seat not found" });
  }

  if (seat.status === "booked") {
    return res.status(400).json({ message: "Seat already booked" });
  }

 
  if (seat.status === "locked" && seat.lockUntil > Date.now()) {
    return res.status(400).json({ message: "Seat is already locked" });
  }

  // Lock seat
  seat.status = "locked";
  seat.lockUntil = Date.now() + lockDuration;


  setTimeout(() => {
    if (seat.status === "locked" && seat.lockUntil <= Date.now()) {
      seat.status = "available";
      seat.lockUntil = null;
    }
  }, lockDuration);

  res.json({ message: `Seat ${seatId} locked successfully. Confirm within 1 minute.` });
});

// ✅ Confirm a locked seat
app.post("/confirm/:id", (req, res) => {
  const seatId = req.params.id;
  const seat = seats[seatId];

  if (!seat) {
    return res.status(404).json({ message: "Seat not found" });
  }

  if (seat.status !== "locked" || seat.lockUntil < Date.now()) {
    return res.status(400).json({ message: "Seat is not locked and cannot be booked" });
  }

  seat.status = "booked";
  seat.lockUntil = null;

  res.json({ message: `Seat ${seatId} booked successfully!` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
