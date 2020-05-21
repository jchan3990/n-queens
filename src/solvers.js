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



// window.findNRooksSolution = function(n) {
//   // are we allowed to do this (make a board)? we're basically creating the same thing as the test
//     // could refactor coutNRooksSolutions to give us first solution
//   var solution = new Board({'n':n});
//   for (var i = 0; i < n; i++) {
//     solution.togglePiece(i, i);
//   }
//   //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   // console.log(solution.rows());
//   return solution.rows();
// };

// Alternative for findNRooksSolution:
window.findNRooksSolution = function(n) {
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
  var newMatrix = function(remainingSet, currentMatrix) {
    var currentMatrix = currentMatrix || [];
    if (remainingSet.length === 0) {
      solution = currentMatrix;
      return;
    }
    remainingSet.forEach(possibility => {
      currentMatrix.push(possibility);
      remainingSet.splice(remainingSet.indexOf(possibility), 1);
      newMatrix(remainingSet, currentMatrix)
    });
  }
  newMatrix(possibilitySet);
  console.log('Number of solutions for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

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
  })(n); // [1000, 01000, 0010, 0001]
  var newMatrix = function(remainingSet, currentMatrix) {
    var currentMatrix = currentMatrix || []; // [1000, ]
    if (remainingSet.length === 0) { // 4, so false
      debugger;
      solutionCount++;
      //return;
    }
    // for each possible first row
    // remaining set here shouldn't change?
    remainingSet.forEach(possibility => { // 1000
      // (?) create copy here for remaining set for each main iteration?--then change names of others
      var rowSet = remainingSet.slice();
      // add current possibility to matrix
      currentMatrix.push(possibility);
      // kill current possibility from remaining set
      // (?) kill it from rowSet, not remainingSet?
      // remainingSet.splice(remainingSet.indexOf(possibility), 1); // [01000, 0010, 0001]
      rowSet.splice(rowSet.indexOf(possibility), 1); // [01000, 0010, 0001]
      // call function with remaining possibility set and latest matrix
      // (?) call w/ rowSet
      newMatrix(rowSet, currentMatrix) // [01000, 0010, 0001], [1000]
    });
  }
  newMatrix(possibilitySet);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
