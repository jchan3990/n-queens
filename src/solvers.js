/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({'n':n});
  for (var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }
  return solution.rows();
};

// Alternative for findNRooksSolution that does not instantiate Board class:
// window.findNRooksSolution = function(n) {
//   var solution;
//   var possibilitySet = (function(n) {
//     var empty = [];
//     for (let i = 0; i < n; i++) {
//       empty.push(0);
//     }
//     var possible = [];
//     var pieceIndex = 0;
//     for (let i = 0; i < empty.length; i++) {
//       var newArray = empty.slice();
//       newArray[i] = 1;
//       possible.push(newArray);
//       pieceIndex++;
//     }
//     return possible;
//   })(n);
//   var newMatrix = function(remainingSet, currentMatrix) {
//     var currentMatrix = currentMatrix || [];
//     if (remainingSet.length === 0) {
//       solution = currentMatrix;
//       return;
//     }
//     remainingSet.forEach(possibility => {
//       currentMatrix.push(possibility);
//       remainingSet.splice(remainingSet.indexOf(possibility), 1);
//       newMatrix(remainingSet, currentMatrix)
//     });
//   }
//   newMatrix(possibilitySet);
//   return solution;
// };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var possibilitySet = (function(n) {
    var empty = [];
    for (let i = 0; i < n; i++) {
      empty.push(0);
    }
    var possible = [];
    var pieceIndex = 0;
    for (let i = 0; i < empty.length; i++) {
      var newArray = empty.slice();
      newArray[i] = 1;
      possible.push(newArray);
      pieceIndex++;
    }
    return possible;
  })(n);
  var newMatrix = function(remainingSet, currentMatrix) {
    var currentMatrix = currentMatrix || [];
    if (remainingSet.length === 0) {
      solutionCount++;
    }
    remainingSet.forEach(possibility => {
      var rowSet = remainingSet.slice();
      currentMatrix.push(possibility);
      rowSet.splice(rowSet.indexOf(possibility), 1);
      newMatrix(rowSet, currentMatrix);
    });
  }
  newMatrix(possibilitySet);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  debugger;
  var solution;
  var possibilitySet = (function(n) {
    var empty = [];
    for (let i = 0; i < n; i++) {
      empty.push(0);
    }
    var possible = [];
    var pieceIndex = 0;
    for (let i = 0; i < empty.length; i++) {
      var newArray = empty.slice();
      newArray[i] = 1;
      possible.push(newArray);
      pieceIndex++;
    }
    return possible;
  })(n);
  // holds first row col indexes for maj and minor diagonals
  var currentMatrix = currentMatrix || [];
  var diagObj = {'major': [], 'minor': []};
  var currentRow = 0;
  var newMatrix = function(remainingSet, currentMatrix) {
    if (remainingSet.length === 0) {
      // this code won't work -- static
      solution = currentMatrix;
      return;
    }
    for (var i = 0; i < remainingSet.length; i++) {
      // create var for first row col index - maj; need row we're on
       var majorDiagIndex = getFirstRowColumnIndexForMajorDiagonalOn(currentRow, remainingSet[i].indexOf(1));
       // create var for first row col index - min; need row we're on
       var minorDiagIndex = getFirstRowColumnIndexForMinorDiagonalOn(currentRow, remainingSet[i].indexOf(1));
       // if first row col index for maj and min diagonals of current element aren't in diagObj
       if (diagObj.major.indexOf(majorDiagIndex) === -1 && diagObj.minor.indexOf(minorDiagIndex) === -1) {
         currentMatrix.push(remainingSet[i]);
         // create variable to house remaining possibilities
        debugger;
         var rowSet = remainingSet.slice();
         rowSet.splice(rowSet.indexOf(rowSet[i]), 1);
         // increment current row
         currentRow++;
         // add first row col index (maj) of current element -- push
         diagObj.major.push(majorDiagIndex);
         // add first row col index (min) of current element -- push
         diagObj.minor.push(minorDiagIndex);
         newMatrix(rowSet, currentMatrix);
         // otherwise
       }
        else if (i === remainingSet.length - 1) {
          // if we get here, need to wipe currentMatrix completely -- means we failed to add a row
          currentMatrix = [];
          currentRow = 0;
          return;
        }
    }
  }
  newMatrix(possibilitySet);
  return solution;
};

var getFirstRowColumnIndexForMajorDiagonalOn = function(rowIndex, colIndex) {
  return colIndex - rowIndex;
};

var getFirstRowColumnIndexForMinorDiagonalOn = function(rowIndex, colIndex) {
  return colIndex + rowIndex;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
