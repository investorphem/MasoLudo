const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { ethers } = require('ethers');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000"; 
const wallet = new ethers.Wallet(PRIVATE_KEY);

// Store active games in memory
let gameState = {};

function rollDice(gameId, playerAddress, nonce) {
    const dataString = `${gameId}-${playerAddress}-${nonce}-maso_secret`;
    const hash = crypto.createHash('sha256').update(dataString).digest('hex');
    return (parseInt(hash.substring(0, 8), 16) % 6) + 1;
}

io.on("connection", (socket) => {
    socket.on("join_game", ({ gameId, player }) => {
        socket.join(gameId);
        if (!gameState[gameId]) {
            gameState[gameId] = {
                nonce: 0,
                PlayerA: { tokens: [0, 0, 0, 0] },
                PlayerB: { tokens: [14, 14, 14, 14] }
            };
        }
        console.log(`${player} joined ${gameId}`);
    });

    socket.on("play_turn", (data) => {
        const { gameId, player, tokenId } = data;
        const game = gameState[gameId];
        
        const roll = rollDice(gameId, player, game.nonce++);
        let currentPos = game[player].tokens[tokenId];
        
        // Basic Ludo Logic
        let newPos = currentPos;
        let success = true;

        if (currentPos === 0) {
            if (roll === 6) newPos = 1;
            else success = false;
        } else {
            newPos = currentPos + roll;
        }

        if (success) {
            game[player].tokens[tokenId] = newPos;
            io.to(gameId).emit("turn_result", { player, tokenId, roll, newPos });
        } else {
            socket.emit("invalid_move", "Need a 6 to leave base!");
        }
    });

    socket.on("claim_win", async ({ gameId, winnerAddress }) => {
        const messageHash = ethers.utils.solidityKeccak256(["uint256", "address"], [gameId, winnerAddress]);
        const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));
        io.to(gameId).emit("settlement_ready", { signature, winnerAddress });
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`MasoLudo server running on port ${PORT}`));
