const io = require("socket.io")(3001, { cors: { origin: "*" } });
const { ethers } = require("ethers");

// Your Backend Private Key (To sign winners)
const PRIVATE_KEY = "YOUR_SERVER_PRIVATE_KEY";
const wallet = new ethers.Wallet(PRIVATE_KEY);

let rooms = {};

io.on("connection", (socket) => {
  socket.on("join-game", (gameId) => {
    socket.join(gameId);
    if (!rooms[gameId]) rooms[gameId] = { board: {}, players: [] };
    rooms[gameId].players.push(socket.id);
  });

  socket.on("move", (data) => {
    // Broadcast move to opponent
    socket.to(data.gameId).emit("opponent-move", data);
  });

  socket.on("game-over", async ({ gameId, winnerAddress }) => {
    // Generate the signature for the smart contract
    const messageHash = ethers.utils.solidityKeccak256(
      ["uint256", "address"],
      [gameId, winnerAddress]
    );
    const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));
    
    io.to(gameId).emit("settlement-ready", { signature, winnerAddress });
  });
});

console.log("MasoLudo Backend running on port 3001");
