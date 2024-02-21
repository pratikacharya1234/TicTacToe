// TicTacToe.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner()) return;

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[index] = xIsNext ? 'X' : 'O';
      setXIsNext(!xIsNext);
      return newBoard;
    });
  };

  const renderSquare = (index) => (
    <TouchableOpacity style={styles.square} onPress={() => handleClick(index)}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const winner = calculateWinner();
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square)
    ? 'It\'s a draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <Button title="Restart" onPress={() => setBoard(Array(9).fill(null))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  status: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  board: {
    borderWidth: 1,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
    width:250,
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TicTacToe;
