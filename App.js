import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [computerMoved, setComputerMoved] = useState(false); // New state variable

  useEffect(() => {
    checkForWin();
    if (currentPlayer === 'O' && !gameOver && !computerMoved) {
      setTimeout(computerMove, 500);
      setComputerMoved(true); // Set the flag to true after the computer makes a move
    }
  }, [board, currentPlayer, computerMoved, gameOver]);

  const winStreaks = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkForWin = () => {
    for (const combination of winStreaks) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        alert(`${currentPlayer} wins!`);
        setGameOver(true);
      }
    }

    if (!gameOver && moves === 9) {
      alert("It's a draw!");
      setGameOver(true);
    }
  };

  const computerMove = () => {
    if (!gameOver) {
      let emptyBoxes = board.reduce((acc, value, index) => {
        if (!value) acc.push(index);
        return acc;
      }, []);

      if (emptyBoxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        handleMove(emptyBoxes[randomIndex]);
      }
    }
  };

  const handleMove = (index) => {
    if (!gameOver && !board[index]) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setMoves(moves + 1);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      setComputerMoved(false); // Reset the flag after the player makes a move
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setMoves(0);
    setGameOver(false);
    setComputerMoved(false); // Reset the flag when resetting the game
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tic Tac Toe</Text>
      <View style={styles.ticTacToe}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={styles.row}>
            {[0, 1, 2].map((col) => (
              <TouchableOpacity
                key={col}
                style={styles.box}
                onPress={() => handleMove(row * 3 + col)}
              >
                <Text style={styles.boxText}>{board[row * 3 + col]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.result}></Text>
      <Button title="Reset" onPress={resetGame}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ticTacToe: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    width: 100,
    height: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
