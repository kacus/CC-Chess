// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts/App/Models/pieces/figureInterface.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EFigureType = exports.EColor = void 0;
var EColor;

(function (EColor) {
  EColor["Black"] = "b";
  EColor["White"] = "w";
})(EColor = exports.EColor || (exports.EColor = {}));

;
var EFigureType;

(function (EFigureType) {
  EFigureType["Pawn"] = "p";
  EFigureType["Rook"] = "r";
  EFigureType["Bishop"] = "b";
  EFigureType["Knight"] = "n";
  EFigureType["Queen"] = "q";
  EFigureType["King"] = "k";
})(EFigureType = exports.EFigureType || (exports.EFigureType = {}));

;
;
},{}],"ts/App/Models/pieces/kingModel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("./figureInterface");

var KingModel =
/** @class */
function () {
  function KingModel(color) {
    this.color = color;
    this.name = figureInterface_1.EFigureType.King;
    this.moveVectors = [[[-1, -1]], [[-1, 0]], [[-1, 1]], [[0, -1]], [[0, 0]], [[0, 1]], [[1, -1]], [[1, 0]], [[1, 1]]];
    this.attackVectors = this.moveVectors;
    this.isMoved = false;
  }

  KingModel.prototype.move = function () {
    this.isMoved = true;
  };

  KingModel.prototype.setAsUnmoved = function () {
    this.isMoved = false;
  };

  return KingModel;
}();

exports.default = KingModel;
},{"./figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Models/pieces/knightModel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("./figureInterface");

var KnightModel =
/** @class */
function () {
  function KnightModel(color) {
    this.color = color;
    this.name = figureInterface_1.EFigureType.Knight;
    this.moveVectors = [[[-2, -1]], [[-2, 1]], [[-1, 2]], [[-1, -2]], [[1, 2]], [[1, -2]], [[2, -1]], [[2, 1]]];
    this.attackVectors = this.moveVectors;
    this.isMoved = false;
  }

  KnightModel.prototype.move = function () {
    this.isMoved = true;
  };

  KnightModel.prototype.setAsUnmoved = function () {
    this.isMoved = false;
  };

  return KnightModel;
}();

exports.default = KnightModel;
},{"./figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Models/pieces/pawnModel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("./figureInterface");

var RookModel =
/** @class */
function () {
  function RookModel(color) {
    this.color = color;
    this.name = figureInterface_1.EFigureType.Pawn;
    var reverse = this.color === figureInterface_1.EColor.White ? 1 : -1;
    this.moveVectors = [[[0, 1 * reverse], [0, 2 * reverse]]];
    this.attackVectors = [[[1, reverse]], [[-1, reverse]]];
    this.isMoved = false;
  }

  RookModel.prototype.move = function () {
    this.isMoved = true;
    var reverse = this.color === figureInterface_1.EColor.White ? 1 : -1;
    this.moveVectors = [[[0, 1 * reverse]]];
  };

  RookModel.prototype.setAsUnmoved = function () {
    this.isMoved = false;
    var reverse = this.color === figureInterface_1.EColor.White ? 1 : -1;
    this.moveVectors = [[[0, 1 * reverse], [0, 2 * reverse]]];
  };

  return RookModel;
}();

exports.default = RookModel;
},{"./figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Models/pieces/rookModel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("./figureInterface");

var TowerModel =
/** @class */
function () {
  function TowerModel(color) {
    this.color = color;
    this.name = figureInterface_1.EFigureType.Rook;
    this.moveVectors = [[[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]], [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]], [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]], [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]] //left
    ];
    this.attackVectors = this.moveVectors;
    this.isMoved = false;
  }

  TowerModel.prototype.move = function () {
    this.isMoved = true;
  };

  TowerModel.prototype.setAsUnmoved = function () {
    this.isMoved = false;
  };

  return TowerModel;
}();

exports.default = TowerModel;
},{"./figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Models/pieces/bishopModel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("./figureInterface");

var BishopModel =
/** @class */
function () {
  function BishopModel(color) {
    this.color = color;
    this.name = figureInterface_1.EFigureType.Bishop;
    this.moveVectors = [[[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]], [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]], [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]], [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]]];
    this.attackVectors = this.moveVectors;
    this.isMoved = false;
  }

  BishopModel.prototype.move = function () {
    this.isMoved = true;
  };

  BishopModel.prototype.setAsUnmoved = function () {
    this.isMoved = false;
  };

  return BishopModel;
}();

exports.default = BishopModel;
},{"./figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Models/pieces/queenModel.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("./figureInterface");

var QueenModel =
/** @class */
function () {
  function QueenModel(color) {
    this.color = color;
    this.name = figureInterface_1.EFigureType.Queen;
    this.moveVectors = [[[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]], [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]], [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]], [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]], [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]], [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]], [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]], [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]] //left
    ];
    this.attackVectors = this.moveVectors;
    this.isMoved = false;
  }

  QueenModel.prototype.move = function () {
    this.isMoved = true;
  };

  QueenModel.prototype.setAsUnmoved = function () {
    this.isMoved = false;
  };

  return QueenModel;
}();

exports.default = QueenModel;
},{"./figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Models/pieces/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueenModel = exports.BishopModel = exports.RookModel = exports.PawnModel = exports.KnightModel = exports.KingModel = void 0;

var kingModel_1 = __importDefault(require("./kingModel"));

exports.KingModel = kingModel_1.default;

var knightModel_1 = __importDefault(require("./knightModel"));

exports.KnightModel = knightModel_1.default;

var pawnModel_1 = __importDefault(require("./pawnModel"));

exports.PawnModel = pawnModel_1.default;

var rookModel_1 = __importDefault(require("./rookModel"));

exports.RookModel = rookModel_1.default;

var bishopModel_1 = __importDefault(require("./bishopModel"));

exports.BishopModel = bishopModel_1.default;

var queenModel_1 = __importDefault(require("./queenModel"));

exports.QueenModel = queenModel_1.default;
},{"./kingModel":"ts/App/Models/pieces/kingModel.ts","./knightModel":"ts/App/Models/pieces/knightModel.ts","./pawnModel":"ts/App/Models/pieces/pawnModel.ts","./rookModel":"ts/App/Models/pieces/rookModel.ts","./bishopModel":"ts/App/Models/pieces/bishopModel.ts","./queenModel":"ts/App/Models/pieces/queenModel.ts"}],"ts/App/Models/boardModel.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("./pieces/figureInterface");

var index_1 = require("./pieces/index");

var BoardModel =
/** @class */
function () {
  function BoardModel() {
    this.board = this.setBoard();
  }

  BoardModel.prototype.move = function (start, end) {
    var figure = this.get(start);

    if (figure) {
      figure.move();
    }

    this.set(end, figure);
    this.resetField(start);
  };

  BoardModel.prototype.get = function (pos) {
    return this.board[8 - pos[1]][pos[0] - 1];
  };

  BoardModel.prototype.set = function (pos, figure) {
    this.board[8 - pos[1]][pos[0] - 1] = figure;
  };

  BoardModel.prototype.resetField = function (pos) {
    this.set(pos, null);
  };

  BoardModel.prototype.possibleMovesFor = function (pos) {
    var _this = this;

    var moves = [];
    var figure = this.get(pos);

    if (figure === null) {
      return moves;
    }

    figure.moveVectors.forEach(function (vector) {
      var indexOfMove = 0;

      while (indexOfMove < vector.length) {
        var move = vector[indexOfMove];
        var row = pos[0] + move[0];

        if (row < 1 || row > 8) {
          break;
        }

        var col = pos[1] + move[1];

        if (col < 1 || col > 8) {
          break;
        }

        var newPos = [row, col];

        if (_this.get(newPos) !== null) {
          break;
        } //check if move cause 'check'


        if (!_this.simulateMove(figure.color, pos, newPos)) {
          break;
        }

        moves.push([row, col]);
        indexOfMove += 1;
      }
    });
    return moves;
  };

  BoardModel.prototype.possibleAttacksFor = function (pos, moveSaver) {
    var _this = this;

    var attacks = [];
    var figure = this.get(pos);

    if (figure === null) {
      return attacks;
    }

    figure.attackVectors.forEach(function (vector) {
      var indexOfMove = 0;

      while (indexOfMove < vector.length) {
        var move = vector[indexOfMove];
        var row = pos[0] + move[0];

        if (row < 1 || row > 8) {
          break;
        }

        var col = pos[1] + move[1];

        if (col < 1 || col > 8) {
          break;
        }

        var newPos = [row, col];

        var target = _this.get(newPos);

        if (target !== null) {
          if (target.color !== figure.color) {
            attacks.push([row, col]);
          }

          break;
        }

        indexOfMove += 1;
      }
    });

    if (moveSaver) {
      var addEnPassantField = moveSaver.isEnPassantPossible(figure, pos, this.deepCopy());

      if (addEnPassantField.length > 0) {
        attacks.push(addEnPassantField[0]);
      }
    }

    return attacks;
  };

  BoardModel.prototype.setBoard = function () {
    return __spreadArrays([this.setFirstLine(figureInterface_1.EColor.Black), this.setPawns(figureInterface_1.EColor.Black)], Array.from({
      length: 4
    }, function (_) {
      return Array(8).fill(null);
    }), [this.setPawns(figureInterface_1.EColor.White), this.setFirstLine(figureInterface_1.EColor.White)]);
  };

  BoardModel.prototype.setPawns = function (color) {
    return __spreadArrays(new Array(8)).map(function (x) {
      return new index_1.PawnModel(color);
    });
  };

  BoardModel.prototype.setFirstLine = function (color) {
    return [new index_1.RookModel(color), new index_1.KnightModel(color), new index_1.BishopModel(color), new index_1.QueenModel(color), color === figureInterface_1.EColor.White ? new index_1.KingModel(figureInterface_1.EColor.White) : new index_1.KingModel(figureInterface_1.EColor.Black), new index_1.BishopModel(color), new index_1.KnightModel(color), new index_1.RookModel(color)];
  };

  BoardModel.prototype.deepCopy = function () {
    var copy = new BoardModel();
    copy.board = [];
    this.board.forEach(function (line) {
      var row = [];
      line.forEach(function (figure) {
        if (figure) {
          var copyOfFigure = Object.assign(Object.create(Object.getPrototypeOf(figure)), figure);
          row.push(copyOfFigure);
          return;
        } else {
          row.push(null);
        }
      });
      copy.board.push(row);
    });
    return copy;
  }; //Is king in check


  BoardModel.prototype.isCheck = function (color) {
    for (var y = 1; y <= 8; y++) {
      for (var x = 1; x <= 8; x++) {
        var pos = [x, y];
        var figure = this.get(pos);

        if (figure && figure.color !== color) {
          var attackedFields = this.possibleAttacksFor(pos);

          for (var z = 0; z < attackedFields.length; z++) {
            var attackedFigure = this.get(attackedFields[z]);

            if (attackedFigure.name === figureInterface_1.EFigureType.King && attackedFigure.color === color) {
              return true;
            }
          }
        }
      }
    }

    return false;
  };

  BoardModel.prototype.isCheckMate = function (color) {
    var _this = this;

    if (!this.isCheck(color)) return false;

    for (var y = 1; y <= 8; y++) {
      var _loop_1 = function _loop_1(x) {
        var pos = [x, y];
        var figure = this_1.get(pos);

        if (figure && figure.color === color) {
          //check if attack can save king
          var attackedFields = this_1.possibleAttacksFor(pos);
          attackedFields = attackedFields.filter(function (attack) {
            return _this.simulateMove(color, pos, attack);
          });
          if (attackedFields.length > 0) return {
            value: false
          }; //check if move can save king

          var fieldsToMove = this_1.possibleMovesFor(pos);
          if (fieldsToMove.length > 0) return {
            value: false
          };
        }
      };

      var this_1 = this;

      for (var x = 1; x <= 8; x++) {
        var state_1 = _loop_1(x);

        if (_typeof(state_1) === "object") return state_1.value;
      }
    }

    console.log('CHECK MATE!');
    return true;
  }; // check if move can be made for given color


  BoardModel.prototype.simulateMove = function (color, from, to) {
    var copy = this.deepCopy();
    copy.move(from, to); //return false if move will cause 'check', return true otherwise

    return !copy.isCheck(color);
  };

  return BoardModel;
}();

exports.default = BoardModel;
},{"./pieces/figureInterface":"ts/App/Models/pieces/figureInterface.ts","./pieces/index":"ts/App/Models/pieces/index.ts"}],"ts/App/Models/savesModels/saveOfCastling.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("../pieces/figureInterface");

var SaveOfCastling =
/** @class */
function () {
  function SaveOfCastling(color, isKingSide) {
    this.color = color;
    this.isKingSide = isKingSide;
  }

  SaveOfCastling.prototype.printMove = function () {
    var color = this.color === figureInterface_1.EColor.White ? 'White' : 'Black';
    var sideOfCastling = this.isKingSide ? 'King Side' : 'Queen Side';
    return color + " did " + sideOfCastling + " Castling!";
  };

  SaveOfCastling.prototype.revert = function (model, view) {
    var row = this.color === figureInterface_1.EColor.White ? 1 : 8;
    var initKingPos = this.isKingSide ? [7, row] : [2, row];
    var initRookPos = this.isKingSide ? [6, row] : [3, row];
    var newKingPos = [5, row];
    var newRookPos = this.isKingSide ? [8, row] : [1, row];
    var king = model.get(initKingPos);
    var rook = model.get(initRookPos); //revert king

    view.move(initKingPos, newKingPos, king);
    king.setAsUnmoved();
    model.set(newKingPos, king);
    model.resetField(initKingPos); //revert rook

    model.set(newRookPos, rook);
    model.resetField(initRookPos);
    view.move(initRookPos, newRookPos, rook);
    rook.setAsUnmoved();
  };

  return SaveOfCastling;
}();

exports.default = SaveOfCastling;
},{"../pieces/figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Models/savesModels/saveOfMove.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("../pieces/figureInterface");

var SaveOfMove =
/** @class */
function () {
  function SaveOfMove(color, moved, from, to, attacked, enemyField) {
    this.moveFor = color;
    this.movedFigure = moved;
    this.from = from;
    this.to = to;
    this.wasMovedFigureUnmoved = moved.isMoved;

    if (attacked) {
      this.attacked = attacked;
      this.wasAttackedFigureUnmoved = attacked.isMoved;
    }

    if (enemyField) {
      this.enemyField = enemyField;
    }
  }

  SaveOfMove.prototype.printMove = function () {
    var color = this.movedFigure.color === figureInterface_1.EColor.White ? "White" : "Black";
    var figureName = "";

    switch (this.movedFigure.name) {
      case figureInterface_1.EFigureType.Pawn:
        figureName = "Pawn";
        break;

      case figureInterface_1.EFigureType.Rook:
        figureName = "Rook";
        break;

      case figureInterface_1.EFigureType.Knight:
        figureName = "Knight";
        break;

      case figureInterface_1.EFigureType.Bishop:
        figureName = "Bishop";
        break;

      case figureInterface_1.EFigureType.Queen:
        figureName = "Queen";
        break;

      case figureInterface_1.EFigureType.King:
        figureName = "King";
        break;
    }

    var result = color + " " + figureName + " moved from " + this.fieldToHumanNotation(this.from) + " to " + this.fieldToHumanNotation(this.to) + "!";

    if (this.attacked) {
      var enemyColor = this.attacked.color === figureInterface_1.EColor.White ? "White" : "Black";
      var enemyFigureName = "";

      switch (this.attacked.name) {
        case figureInterface_1.EFigureType.Pawn:
          enemyFigureName = "Pawn";
          break;

        case figureInterface_1.EFigureType.Rook:
          enemyFigureName = "Rook";
          break;

        case figureInterface_1.EFigureType.Knight:
          enemyFigureName = "Knight";
          break;

        case figureInterface_1.EFigureType.Bishop:
          enemyFigureName = "Bishop";
          break;

        case figureInterface_1.EFigureType.Queen:
          enemyFigureName = "Queen";
          break;

        case figureInterface_1.EFigureType.King:
          enemyFigureName = "King";
          break;
      }

      result += " And destroyed " + enemyColor + " " + enemyFigureName + "!";
    }

    return result;
  };

  SaveOfMove.prototype.revert = function (model, view) {
    var _a, _b; //revert move


    if (!this.wasMovedFigureUnmoved) {
      this.movedFigure.setAsUnmoved();
    }

    model.set(this.from, this.movedFigure);
    model.resetField(this.to);
    view.move(this.to, this.from, this.movedFigure); //revert attack

    if (this.attacked) {
      if (!this.wasAttackedFigureUnmoved) {
        this.attacked.setAsUnmoved();
      }

      if (this.enemyField) {
        model.set(this.enemyField, this.attacked);
        view.setFigureOnField(this.enemyField, this.attacked);
        model.set(this.to, null); // view.setFigureOnField(this.to,);
      } else {
        model.set(this.to, this.attacked);
        view.setFigureOnField(this.to, this.attacked);
      }
    }

    var color = ((_a = this.attacked) === null || _a === void 0 ? void 0 : _a.color) === figureInterface_1.EColor.Black ? "last-of-type" : "first-of-type";
    var figType = (_b = this.attacked) === null || _b === void 0 ? void 0 : _b.name;

    var getEnumKeyByEnumValue = function getEnumKeyByEnumValue(myEnum, enumValue) {
      var keys = Object.keys(myEnum).filter(function (x) {
        return myEnum[x] == enumValue;
      });
      return keys.length > 0 ? keys[0] : "";
    };

    if (figType) {
      var figureName = getEnumKeyByEnumValue(figureInterface_1.EFigureType, figType);
      var allBeatenFiguresOfType = document.querySelectorAll(".stage:" + color + " > .game__stage>.figures__list > ." + figureName + ":not(." + figType + ")");
      var array = Array.from(allBeatenFiguresOfType);
      var lastElement = array[array.length - 1];
      lastElement.style.filter = "invert(0.5)";
      lastElement.classList.add("" + figType);
    }
  };

  SaveOfMove.prototype.fieldToHumanNotation = function (field) {
    var result = "" + String.fromCharCode(65 + field[0] - 1) + field[1];
    return result;
  };

  SaveOfMove.prototype.getLastMove = function () {
    return {
      from: this.from,
      to: this.to,
      moveFor: this.moveFor
    };
  };

  return SaveOfMove;
}();

exports.default = SaveOfMove;
},{"../pieces/figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Views/stageView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("../Models/pieces/figureInterface");

var StageView =
/** @class */
function () {
  function StageView(id) {
    this.id = id;
  }

  StageView.prototype.init = function (parent, color, player) {
    var playerName = document.createElement("div");
    var time = document.createElement("div");
    time.classList.add("time");
    time.innerText = '00:00 min';
    var figures = document.createElement("div");
    var game = document.createElement("div");
    game.classList.add("game__stage");
    figures.classList.add("figures__list");
    this.createFigure("Pawn", 8, color, figures);
    this.createFigure("Bishop", 2, color, figures);
    this.createFigure("Knight", 2, color, figures);
    this.createFigure("Rook", 2, color, figures);
    this.createFigure("Queen", 1, color, figures);
    playerName.classList.add("player__name");
    playerName.innerText = player;
    playerName.id = this.id;
    parent.appendChild(game);
    game.appendChild(playerName);
    game.appendChild(figures);
    parent.appendChild(time);
  };

  StageView.prototype.getFigureImage = function (figure) {
    var figureImg = document.createElement("img"); //Map figure to file name

    var file = figure.color + figure.name;
    figureImg.setAttribute("src", "./static/assets/pieces/kosal/" + file + ".svg");
    figureImg.setAttribute("alt", figure.color + " " + figure.name);
    figureImg.classList.add("chessboard__figure__stage");
    return figureImg;
  };

  StageView.prototype.createFigure = function (figureType, repeat, color, parent) {
    for (var i = 0; i < repeat; i++) {
      var name = figureInterface_1.EFigureType[figureType];
      var figure = {
        color: color,
        name: name
      };
      var figureImage = this.getFigureImage(figure);
      figureImage.classList.add(figureInterface_1.EFigureType[figureType].toLowerCase());
      figureImage.classList.add(figureType + "");
      parent.appendChild(figureImage);
    }
  };

  return StageView;
}();

exports.default = StageView;
},{"../Models/pieces/figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Views/menu.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MenuView =
/** @class */
function () {
  function MenuView(parent) {
    this.parent = parent;
  }

  ;

  MenuView.prototype.createElement = function (tag, className) {
    var element = document.createElement(tag);

    if (className) {
      element.classList.add(className);
    }

    return element;
  };

  ;

  MenuView.prototype.createMenuWraper = function (element) {
    var menu_wraper = this.createElement('div', 'menu');
    this.createMenuBackground(menu_wraper);
    this.createBtnBox(menu_wraper);
    element.appendChild(menu_wraper);
  };

  ;

  MenuView.prototype.createMenuBackground = function (element) {
    var menu_background = this.createElement('div', 'menu__background');
    this.createSettingPlayers(menu_background);
    this.createSettingBox(menu_background);
    element.appendChild(menu_background);
  };

  ;

  MenuView.prototype.createBtnBox = function (element) {
    var btn_box = this.createElement('div', 'menu__button');
    var btn_start = this.createElement('button', 'menu__button--start');
    btn_start.setAttribute('id', "menu__button--start");
    btn_start.innerText = "START THE GAME";
    btn_box.append(btn_start);
    element.appendChild(btn_box);
  };

  ;

  MenuView.prototype.createSettingPlayers = function (element) {
    var setting_players = this.createElement('div', 'setting__players');
    var setting_players_text = this.createElement('div', 'setting__players--text');
    setting_players_text.innerText = 'PLAYERS SETTING';
    setting_players.appendChild(setting_players_text);
    var players_box = this.createElement('div', 'setting__players--box');
    var players_box_text = this.createElement('div', 'setting__players--text');
    players_box_text.innerText = "PLAYERS NAMES";
    var players = this.createElement('div', 'setting__players--players');
    var first_player = this.createElement('div', 'players--one_player');
    var white = this.createElement('div', 'white_player');
    white.innerText = "Black | Player's name";
    var insert_name_first = this.createElement('input', 'insert__name');
    insert_name_first.setAttribute('type', 'text');
    insert_name_first.setAttribute('maxlength', '20');
    insert_name_first.setAttribute('pattern', '[a-zA-Z0-9]{3,20}');
    first_player.append(white, insert_name_first);
    insert_name_first.addEventListener('change', function () {
      var element = document.getElementById('first__player');
      element.innerText = insert_name_first.value;
    });
    var second_player = this.createElement('div', 'players--one_player');
    var black = this.createElement('div', 'black_player');
    black.innerText = "White | Player's name";
    var insert_name_second = this.createElement('input', 'insert__name');
    insert_name_second.setAttribute('type', 'text');
    insert_name_second.setAttribute('maxlength', '20');
    insert_name_second.setAttribute('pattern', '[a-zA-Z0-9]{3,20}');
    second_player.append(black, insert_name_second);
    insert_name_second.addEventListener('change', function () {
      var element = document.getElementById('second__player');
      element.innerText = insert_name_second.value;
    });
    players.append(first_player, second_player);
    players_box.append(players_box_text, players);
    setting_players.appendChild(players_box);
    this.createRadio(setting_players);
    element.appendChild(setting_players);
  };

  ;

  MenuView.prototype.createRadio = function (element) {
    var form_checkbox = this.createElement('form', 'setting__players--form_checkbox');
    var checkbox_move = this.createElement('input');
    checkbox_move.setAttribute('type', 'checkbox');
    checkbox_move.setAttribute('id', 'possible move');
    checkbox_move.setAttribute('name', 'possible move');
    var span_move = this.createElement('span', 'checkmark');
    var label_move = this.createElement('label', 'checkbox');
    label_move.setAttribute('for', 'possible move');
    label_move.innerText = 'Show possible moves';
    label_move.append(checkbox_move, span_move);
    form_checkbox.append(label_move);
    element.appendChild(form_checkbox);
  };

  ;

  MenuView.prototype.createSettingBox = function (element) {
    var setting_box = this.createElement('div', 'setting__box');
    this.createSettingGame(setting_box);
    this.createTimeGame(setting_box);
    element.appendChild(setting_box);
  };

  ;

  MenuView.prototype.createSettingGame = function (element) {
    var setting_game = this.createElement('div', 'setting--game');
    var setting_text = this.createElement('div', 'setting__game--text');
    setting_text.innerText = 'GAME SETTINGS';
    setting_game.append(setting_text);
    element.appendChild(setting_game);
  };

  ;

  MenuView.prototype.createTimeGame = function (element) {
    var time_game = this.createElement('div', 'setting--tame');
    time_game.innerText = 'GAME TIME';
    var span_tg = this.createElement('span');
    span_tg.innerText = '(IN MINUTES)';
    time_game.appendChild(span_tg);
    var slider_box = this.createElement('div', 'setting--slider');
    var slider = this.createElement('input', 'slider__range');
    slider.setAttribute('type', 'range');
    slider.setAttribute('name', 'range_time');
    slider.setAttribute('min', '2');
    slider.setAttribute('max', '15');
    slider.setAttribute('step', '1');
    slider.setAttribute('value', '5');
    slider.setAttribute('id', 'range');
    var slider_time = this.createElement('output');
    slider_time.setAttribute('id', 'range_display');
    slider_time.setAttribute('name', 'range_display');
    slider_time.setAttribute('for', 'range_time');
    slider_time.textContent = "Game time is: " + slider.getAttribute('value') + " minutes";
    slider_box.append(slider, slider_time);
    element.append(time_game, slider_box);
  };

  ;

  MenuView.prototype.createAddEventListner = function () {
    var _this = this;

    var t = document.getElementById('range');
    t.addEventListener("input", function () {
      _this.addTime();
    });
    t.addEventListener("change", function () {
      _this.addTime();
    });
  };

  MenuView.prototype.addTime = function () {
    var sliderValue = document.getElementById('range').value;
    var outputElement = document.getElementById('range_display');
    outputElement.innerText = "Game time is: " + sliderValue + " minutes";
  };

  ;

  MenuView.prototype.display = function () {
    this.createMenuWraper(this.parent);
    this.createAddEventListner();
  };

  ;
  return MenuView;
}();

exports.default = MenuView;
;
},{}],"ts/App/Views/tabsView.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var menu_1 = __importDefault(require("./menu"));

var TabsView =
/** @class */
function () {
  function TabsView() {}

  TabsView.prototype.init = function (parent) {
    var tabContainer = this.createElement("div", "tab__container");
    parent.appendChild(tabContainer);
    this.createNavigation(tabContainer);
    this.createTabs(tabContainer);
  };

  TabsView.prototype.createElement = function (tag, className) {
    var element = document.createElement(tag);

    if (className) {
      element.classList.add(className);
    }

    return element;
  };

  TabsView.prototype.createNavigation = function (tabContainer) {
    var ul = this.createElement("ul", "nav");
    ul.id = "nav__tab"; // ul.addEventListener("click", this.onTabClick, false);

    var li1 = this.createElement("li");
    li1.addEventListener('click', function (e) {
      var tab = document.getElementById('moves');
      var activeTabs = document.querySelectorAll(".active");
      activeTabs.forEach(function (tab) {
        tab.className = tab.className.replace("active", "");
      });
      tab === null || tab === void 0 ? void 0 : tab.classList.add('active');
      var clickedTabs = document.querySelectorAll(".clicked");
      clickedTabs.forEach(function (clicked) {
        clicked.className = clicked.className.replace("clicked", "");
      });
      li1.classList.add('clicked');
    });
    var a1 = this.createElement("a");
    a1.setAttribute("href", "#moves");
    a1.innerText = "Moves";
    var li3 = this.createElement("li", "active");
    li3.addEventListener('click', function (e) {
      var tab = document.getElementById('game');
      var activeTabs = document.querySelectorAll(".active");
      activeTabs.forEach(function (tab) {
        tab.className = tab.className.replace("active", "");
      });
      tab === null || tab === void 0 ? void 0 : tab.classList.add('active');
      var clickedTabs = document.querySelectorAll(".clicked");
      clickedTabs.forEach(function (clicked) {
        clicked.className = clicked.className.replace("clicked", "");
      });
      li3.classList.add('clicked');
    });
    var a3 = this.createElement("a");
    a3.setAttribute("href", "#game");
    a3.innerText = "Game";
    this.addIcons(li1, li3);
    tabContainer.appendChild(ul);
    ul.appendChild(li1);
    ul.appendChild(li3);
    li1.appendChild(a1);
    li3.appendChild(a3);
  };

  TabsView.prototype.createTabs = function (tabContainer) {
    var tabContent = this.createElement("div", "tab__content");
    var tabPane1 = this.createElement("div", "tab__pane");
    tabPane1.id = "moves";
    var tabPane3 = this.createElement("div", "tab__pane");
    tabPane3.classList.add("active");
    tabPane3.id = "game";
    var lastMoveInfo = this.createElement('div', 'last__move__info');
    lastMoveInfo.id = 'last__move__info';
    var undoButtonContainer = this.createElement('div', 'undo__button__container');
    undoButtonContainer.id = 'undo__button__container';
    tabContent.appendChild(tabPane1);
    tabPane1.appendChild(lastMoveInfo);
    tabPane1.appendChild(undoButtonContainer);
    tabContent.appendChild(tabPane3);
    tabContainer.appendChild(tabContent);
    var menu = new menu_1.default(tabPane3);
    menu.display();
  };

  TabsView.prototype.addIcons = function (li1, li3) {
    var movesIcon = this.createElement("img");
    movesIcon.setAttribute("src", "./static/assets/icons/moves_icon.svg");
    li1.appendChild(movesIcon);
    var gameIcon = this.createElement("img");
    gameIcon.setAttribute("src", "./static/assets/icons/game_icon.svg");
    li3.appendChild(gameIcon);
  };

  return TabsView;
}();

exports.default = TabsView;
},{"./menu":"ts/App/Views/menu.ts"}],"ts/App/Views/boardView.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var figureInterface_1 = require("../Models/pieces/figureInterface");

var stageView_1 = __importDefault(require("./stageView"));

var tabsView_1 = __importDefault(require("./tabsView"));

var BoardView =
/** @class */
function () {
  function BoardView() {}

  BoardView.prototype.init = function (parent, clickHandler) {
    var board = document.createElement("div");
    board.classList.add("chessboard"); //game stage

    var stage1 = document.createElement("div");
    var stage2 = document.createElement("div");
    var container = document.createElement("div");
    stage1.classList.add("stage");
    var blackStage = new stageView_1.default("first__player");
    blackStage.init(stage1, figureInterface_1.EColor.White, "Player 1");
    stage2.classList.add("stage");
    container.classList.add("container");
    var gamePanel = document.createElement("div");
    gamePanel.classList.add("game__panel");
    gamePanel.id = "game__panel";
    var settingsPanel = document.createElement("div");
    settingsPanel.classList.add("settings__panel");
    var whiteStage = new stageView_1.default("second__player");
    whiteStage.init(stage2, figureInterface_1.EColor.Black, "Player 2"); //

    for (var y = 0; y < 8; y++) {
      var _loop_1 = function _loop_1(x) {
        var field = document.createElement("div");
        field.dataset.x = 1 + x + "";
        field.dataset.y = 8 - y + "";
        field.addEventListener("click", function () {
          var fieldPos = [parseInt(field.dataset.x), parseInt(field.dataset.y)];
          clickHandler(fieldPos);
        });
        field.classList.add("chessboard__field");
        board.appendChild(field);
      };

      for (var x = 0; x < 8; x++) {
        _loop_1(x);
      }
    } //


    parent.appendChild(container);
    container.appendChild(gamePanel);
    gamePanel.appendChild(stage1);
    gamePanel.appendChild(board);
    gamePanel.appendChild(stage2);
    container.appendChild(settingsPanel);
    var menu = new tabsView_1.default();
    menu.init(settingsPanel); //
  };

  BoardView.prototype.setUpBoard = function (board) {
    for (var y = 1; y <= 8; y++) {
      for (var x = 1; x <= 8; x++) {
        var pos = [x, y];
        var figure = board.get(pos);
        var field = this.getField(pos);
        this.resetField(pos);

        if (figure) {
          var figureImage = this.getFigureImage(figure);
          field.appendChild(figureImage);
        }
      }
    }
  };

  BoardView.prototype.getFigureImage = function (figure) {
    var figureImg = document.createElement("img"); //Map figure to file name

    var file = figure.color + figure.name;
    figureImg.setAttribute("src", "./static/assets/pieces/kosal/" + file + ".svg");
    figureImg.setAttribute("alt", figure.color + " " + figure.name);
    figureImg.classList.add("chessboard__figure");
    return figureImg;
  };

  BoardView.prototype.resetField = function (pos) {
    var field = this.getField(pos);
    field.innerHTML = "";
    field.classList.value = "";
    field.classList.add("chessboard__field");
  };

  BoardView.prototype.setFigureOnField = function (pos, figure, enemyField) {
    var field = this.getField(pos); //

    if (enemyField) {
      var enemyFieldPos = this.getField(enemyField);

      if (enemyFieldPos.hasChildNodes()) {
        var figureSrc = enemyFieldPos.children[0].attributes[0].value;
        var figureType = figureSrc.slice(figureSrc.length - 6, figureSrc.length - 4);
        var figType = figureType[1];
        var color = figure.color === figureInterface_1.EColor.White ? "last-of-type" : "first-of-type";
        var figSymbol = document.querySelector(".stage:" + color + " > .game__stage>.figures__list > .chessboard__figure__stage." + figType);
        figSymbol.style.filter = "invert(0)";
        console.log(figSymbol);
        figSymbol.classList.remove("" + figType);
      }

      var figureImage = this.getFigureImage(figure);
      field.innerHTML = "";
      field.appendChild(figureImage);
    } else {
      if (field.hasChildNodes()) {
        var figureSrc = field.children[0].attributes[0].value;
        var figureType = figureSrc.slice(figureSrc.length - 6, figureSrc.length - 4);
        var figType = figureType[1];
        var color = figure.color === figureInterface_1.EColor.White ? "last-of-type" : "first-of-type";
        var figSymbol = document.querySelector(".stage:" + color + " > .game__stage>.figures__list > .chessboard__figure__stage." + figType);
        figSymbol.style.filter = "invert(0)";
        console.log(figSymbol);
        figSymbol.classList.remove("" + figType);
      }

      var figureImage = this.getFigureImage(figure);
      field.innerHTML = "";
      field.appendChild(figureImage);
    } //

  };

  BoardView.prototype.getField = function (pos) {
    var field = document.querySelector("[data-x=\"" + pos[0] + "\"][data-y=\"" + pos[1] + "\"]");
    return field;
  };

  BoardView.prototype.move = function (start, end, figure, enemyField) {
    if (enemyField) {
      this.setFigureOnField(end, figure, enemyField);
    } else {
      this.setFigureOnField(end, figure);
    }

    this.resetField(start);

    if (enemyField) {
      this.resetField(enemyField);
    }

    this.resetStyles();
  };

  BoardView.prototype.setAsPossibleToMove = function (pos) {
    var field = this.getField(pos);
    var radioButton = document.getElementById('possible move');

    if (radioButton.checked) {
      field.classList.add("chessboard__field--possible_move");
    }
  };

  BoardView.prototype.setAsPossibleToAttack = function (pos) {
    var field = this.getField(pos);
    var radioButton = document.getElementById('possible move');

    if (radioButton.checked) {
      field.classList.add("chessboard__field--possible_attack");
    }
  };

  BoardView.prototype.setAsSelected = function (pos) {
    var field = this.getField(pos);
    field.classList.add("chessboard__field--selected");
  };

  BoardView.prototype.resetStyles = function () {
    var fields = document.querySelectorAll(".chessboard__field");
    fields.forEach(function (field) {
      field.classList.value = "";
      field.classList.add("chessboard__field");
    });
  };

  BoardView.prototype.timeDisplay = function (time, color) {
    var nthChild = color === figureInterface_1.EColor.White ? 3 : 1;
    var timer = document.querySelector(".stage:nth-child(" + nthChild + ") > .time");
    var min = Math.floor(time / 60);
    var sec = time % 60;

    var appendZeroIfNeeded = function appendZeroIfNeeded(timeUnit) {
      return ("" + timeUnit).length === 1 ? "0" + timeUnit : timeUnit.toString();
    };

    timer.innerHTML = appendZeroIfNeeded(min) + ":" + appendZeroIfNeeded(sec) + " min";
  };

  BoardView.prototype.getStartTime = function (time) {
    var startTime = document.querySelector(".time");
    startTime.innerHTML = time + "";
  };

  return BoardView;
}();

exports.default = BoardView;
},{"../Models/pieces/figureInterface":"ts/App/Models/pieces/figureInterface.ts","./stageView":"ts/App/Views/stageView.ts","./tabsView":"ts/App/Views/tabsView.ts"}],"ts/App/Controllers/moveSaver.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveSaver = void 0;

var figureInterface_1 = require("../Models/pieces/figureInterface");

var MoveSaver =
/** @class */
function () {
  function MoveSaver() {
    this.moves = [];
  }

  MoveSaver.prototype.canUndoMove = function () {
    return this.moves.length > 0;
  };

  MoveSaver.prototype.addMove = function (move) {
    this.moves.push(move);
  };

  MoveSaver.prototype.addCastling = function (castling) {
    this.moves.push(castling);
  };

  MoveSaver.prototype.revertLastMove = function (model, view) {
    var lastMove = this.moves.pop();

    if (lastMove) {
      lastMove.revert(model, view);
    }
  };

  MoveSaver.prototype.reset = function () {
    this.moves = [];
  };

  MoveSaver.prototype.isEnPassantPossible = function (figure, position, board) {
    var result = [];
    var resultingField = [];
    var isPawn = figure.name === figureInterface_1.EFigureType.Pawn;

    if (!isPawn) {
      return result;
    }

    var x = position[0],
        y = position[1];
    var leftFigure = [x - 1, y];
    var rightFigure = [x + 1, y];
    var isLeftFigure = board.get(leftFigure);
    var isRightFigure = board.get(rightFigure);
    var isLeftPawn = (isLeftFigure === null || isLeftFigure === void 0 ? void 0 : isLeftFigure.name) === figureInterface_1.EFigureType.Pawn;
    var isRightPawn = (isRightFigure === null || isRightFigure === void 0 ? void 0 : isRightFigure.name) === figureInterface_1.EFigureType.Pawn;

    if (this.moves.length < 1) {
      return result;
    }

    ;
    var lastMove = this.moves[this.moves.length - 1];

    if (lastMove.getLastMove) {
      if (isLeftPawn) {
        var _a = lastMove.getLastMove(),
            from = _a.from,
            to = _a.to,
            moveFor = _a.moveFor;

        if (moveFor === figureInterface_1.EColor.Black) {
          var isTo = to[0] === leftFigure[0] && to[1] === leftFigure[1];
          var isFrom = from[0] === leftFigure[0] && from[1] === leftFigure[1] + 2;

          if (isTo && isFrom) {
            resultingField.push(x - 1);
            resultingField.push(y + 1);
            result.push(resultingField);
            result.push('lb');
            return result;
          }
        } else if (moveFor === figureInterface_1.EColor.White) {
          var isTo = to[0] === leftFigure[0] && to[1] === leftFigure[1];
          var isFrom = from[0] === leftFigure[0] && from[1] === leftFigure[1] - 2;

          if (isTo && isFrom) {
            resultingField.push(x - 1);
            resultingField.push(y - 1);
            result.push(resultingField);
            result.push('lw');
            return result;
          }
        }
      } else if (isRightPawn) {
        var _b = lastMove.getLastMove(),
            from = _b.from,
            to = _b.to,
            moveFor = _b.moveFor;

        if (moveFor === figureInterface_1.EColor.Black) {
          var isTo = to[0] === rightFigure[0] && to[1] === rightFigure[1];
          var isFrom = from[0] === rightFigure[0] && from[1] === rightFigure[1] + 2;

          if (isTo && isFrom) {
            resultingField.push(x + 1);
            resultingField.push(y + 1);
            result.push(resultingField);
            result.push('rb');
            return result;
          }
        } else if (moveFor === figureInterface_1.EColor.White) {
          var isTo = to[0] === rightFigure[0] && to[1] === rightFigure[1];
          var isFrom = from[0] === rightFigure[0] && from[1] === rightFigure[1] - 2;

          if (isTo && isFrom) {
            resultingField.push(x + 1);
            resultingField.push(y - 1);
            result.push(resultingField);
            result.push('rw');
            return result;
          }
        }
      }
    }

    return result;
  };

  return MoveSaver;
}();

exports.MoveSaver = MoveSaver;
},{"../Models/pieces/figureInterface":"ts/App/Models/pieces/figureInterface.ts"}],"ts/App/Views/movesList.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MovesList =
/** @class */
function () {
  function MovesList() {}

  MovesList.prototype.init = function (lastMove) {
    var movesTab = document.getElementById("last__move__info");
    var info = document.createElement("div");
    movesTab.appendChild(info);
    info.classList.add("info");
    info.innerHTML = lastMove;
    var countChildren = document.querySelector("#last__move__info").childElementCount;

    if (countChildren > 6) {
      var firstChild = document.querySelector("#last__move__info> .info:first-child");
      firstChild.remove();
    }
  };

  return MovesList;
}();

exports.default = MovesList;
},{}],"ts/App/Views/endGameView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EndGame =
/** @class */
function () {
  function EndGame(parent) {
    this.parent = parent;
  }

  ;

  EndGame.prototype.createElement = function (tag, className) {
    var element = document.createElement(tag);

    if (className) {
      element.classList.add(className);
    }

    return element;
  };

  ;

  EndGame.prototype.createWiner = function (winerColor) {
    var div_btn = this.createElement('div', 'buttonBox');
    var box_reset = this.createElement('button', 'buttonBox__reset');
    box_reset.setAttribute('id', 'buttonBox__reset');
    var box_text = this.createElement('div', 'buttonBox__text');
    box_text.innerText = "The winer is: " + winerColor + "!";
    var box_text_reset = this.createElement('button', 'buttonBox__text--reset');
    box_text_reset.innerText = "PLAY AGAIN";
    box_text_reset.setAttribute('id', 'buttonBox__text--reset');
    box_text.appendChild(box_text_reset);
    div_btn.appendChild(box_reset);
    this.parent.append(div_btn, box_text);
    this.createBtnListener();
  };

  ;

  EndGame.prototype.createBtnListener = function () {
    var btn_reset = document.getElementById('buttonBox__reset');
    var btn_text_reset = document.getElementById('buttonBox__text--reset');
    btn_reset === null || btn_reset === void 0 ? void 0 : btn_reset.addEventListener('click', function () {
      location.reload();
    });
    btn_text_reset === null || btn_text_reset === void 0 ? void 0 : btn_text_reset.addEventListener('click', function () {
      location.reload();
    });
  };

  ;
  return EndGame;
}();

exports.default = EndGame;
},{}],"ts/App/Controllers/boardController.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var boardModel_1 = __importDefault(require("../Models/boardModel"));

var figureInterface_1 = require("../Models/pieces/figureInterface");

var saveOfCastling_1 = __importDefault(require("../Models/savesModels/saveOfCastling"));

var saveOfMove_1 = __importDefault(require("../Models/savesModels/saveOfMove"));

var boardView_1 = __importDefault(require("../Views/boardView"));

var moveSaver_1 = require("./moveSaver");

var movesList_1 = __importDefault(require("../Views/movesList"));

var endGameView_1 = __importDefault(require("../Views/endGameView"));

var BoardController =
/** @class */
function () {
  function BoardController(parent) {
    var _this = this; //Handler for clicking on field


    this.clickOnField = function (pos) {
      if (_this.selectedField) {
        //We have selected figure already
        _this.figureAlreadySelected(pos, _this.selectedField);
      } else {
        //We didn't select figure yet
        _this.figureNotSelected(pos);
      }
    }; //handler for timer


    this.updateTime = function () {
      if (_this.moveFor === figureInterface_1.EColor.White) {
        _this.timeLeftForWhite -= 1;

        if (_this.timeLeftForWhite <= 0) {
          _this.gameOver(figureInterface_1.EColor.Black);

          return;
        }

        _this.view.timeDisplay(_this.timeLeftForWhite, _this.moveFor);

        if (+"1" && +"0") {
          console.log("Left time for White: " + _this.timeLeftForWhite + "sec");
        }
      } else {
        _this.timeLeftForBlack -= 1;

        if (_this.timeLeftForBlack <= 0) {
          _this.gameOver(figureInterface_1.EColor.White);

          return;
        }

        _this.view.timeDisplay(_this.timeLeftForBlack, _this.moveFor);

        if (+"1" && +"0") console.log("Left time for Black: " + _this.timeLeftForBlack + "sec");
      }
    }; //handler for 'undo' last move


    this.undoMove = function () {
      if (_this.moveSaver.canUndoMove()) {
        _this.moveSaver.revertLastMove(_this.board, _this.view);

        _this.moveFor = _this.moveFor === figureInterface_1.EColor.White ? figureInterface_1.EColor.Black : figureInterface_1.EColor.White;

        _this.resetSelectedFigure();
      }
    };

    this.view = new boardView_1.default();
    this.view.init(parent, this.clickOnField);
    this.moveSaver = new moveSaver_1.MoveSaver();
  } //Starts new game


  BoardController.prototype.newGame = function (time) {
    //reset constroller
    this.moveFor = figureInterface_1.EColor.White;
    this.selectedField = null;
    this.movesForSelected = [];
    this.attacksForSelected = [];
    this.timeLeftForWhite = time;
    this.timeLeftForBlack = time; //reset saved moves

    this.moveSaver.reset(); //make new board model

    this.board = new boardModel_1.default(); //set up board

    this.setUpBoard(this.board); //start timer

    this.setUpTimer();
    if (+"1") console.log("NEW GAME STARTS");
  };

  BoardController.prototype.addEventListenerToButton = function () {
    var _this = this;

    this.view.timeDisplay(5 * 60, figureInterface_1.EColor.White);
    this.view.timeDisplay(5 * 60, figureInterface_1.EColor.Black);
    var btnBox = document.getElementById("menu__button--start");
    var timeElement = document.getElementById("range");
    btnBox.addEventListener("click", function (e) {
      var timeValue = parseInt(document.getElementById("range").value);
      console.log(timeValue);

      _this.view.timeDisplay(timeValue * 60, figureInterface_1.EColor.White);

      _this.view.timeDisplay(timeValue * 60, figureInterface_1.EColor.Black);

      _this.newGame(timeValue * 60);

      _this.view.timeDisplay(timeValue * 60, figureInterface_1.EColor.White);

      _this.view.timeDisplay(timeValue * 60, figureInterface_1.EColor.Black);
    });
    timeElement === null || timeElement === void 0 ? void 0 : timeElement.addEventListener("change", function (e) {
      var timeValue = parseInt(document.getElementById("range").value);

      _this.view.timeDisplay(timeValue * 60, figureInterface_1.EColor.White);

      _this.view.timeDisplay(timeValue * 60, figureInterface_1.EColor.Black);

      btnBox.addEventListener("click", function (e) {
        if (!timeValue || timeValue === 0) {
          timeValue = 5;
        }

        ;

        _this.view.timeDisplay(timeValue * 60, figureInterface_1.EColor.White);

        _this.view.timeDisplay(timeValue * 60, figureInterface_1.EColor.Black);
      });
    });
  }; //  Moves and attacks functions
  //check if given position is on given list


  BoardController.prototype.isFieldOnList = function (pos, list) {
    return !list.every(function (elem) {
      return elem[0] !== pos[0] || elem[1] !== pos[1];
    });
  }; //select Figure on given position


  BoardController.prototype.selectNewFigure = function (pos) {
    var _this = this;

    this.view.resetStyles(); //checks moves avaible for figure on given position

    this.selectedField = pos;
    this.movesForSelected = this.board.possibleMovesFor(this.selectedField);
    this.attacksForSelected = this.board.possibleAttacksFor(this.selectedField, this.moveSaver); //allow attack if it not cause 'check'

    this.attacksForSelected = this.attacksForSelected.filter(function (attack) {
      return _this.board.simulateMove(_this.moveFor, pos, attack);
    }); //mark figure on given position as selected

    this.view.setAsSelected(pos);
    var figure = this.board.get(pos); //check for castling

    if (figure.name === figureInterface_1.EFigureType.King) {
      var row = this.moveFor === figureInterface_1.EColor.White ? 1 : 8;
      if (this.canMakeCasting(this.moveFor, true)) this.movesForSelected.push([7, row]);
      if (this.canMakeCasting(this.moveFor, false)) this.movesForSelected.push([2, row]);
    } //display on board positions avaible to move and attack


    this.movesForSelected.forEach(function (field) {
      _this.view.setAsPossibleToMove(field);
    });
    this.attacksForSelected.forEach(function (field) {
      _this.view.setAsPossibleToAttack(field);
    });
  }; //cancel selection


  BoardController.prototype.resetSelectedFigure = function () {
    this.view.resetStyles();
    this.selectedField = null;
    this.movesForSelected = [];
    this.attacksForSelected = [];
  }; //Move given figure from start position to end position


  BoardController.prototype.makeMove = function (start, end, figure) {
    // this.moveSaver.isEnPeasantPossible();
    //Save move
    var savedMove = new saveOfMove_1.default(figure.color, figure, start, end);
    this.moveSaver.addMove(savedMove); //move

    this.view.move(start, end, figure);
    this.board.move(start, end); //print move

    console.log(savedMove.printMove()); //moves list

    var lastMove = savedMove.printMove();
    var movesList = new movesList_1.default();
    movesList.init(lastMove); //
    //change turn

    this.changeTurn();
  }; //Attack given figure on end position by given figure on start position


  BoardController.prototype.makeAttack = function (start, end, figure) {
    var enemyFigure = this.board.get(end);
    var enemyField = end;

    if (enemyFigure === null) {
      if (figure.color === figureInterface_1.EColor.White) {
        enemyField = [end[0], end[1] - 1];
        enemyFigure = this.board.get(enemyField);
        this.board.resetField(enemyField);
      } else {
        enemyField = [end[0], end[1] + 1];
        enemyFigure = this.board.get(enemyField);
        this.board.resetField(enemyField);
      } //save attack


      var savedAttack = new saveOfMove_1.default(figure.color, figure, start, end, enemyFigure, enemyField);
      this.moveSaver.addMove(savedAttack); //attack

      this.view.move(start, end, figure, enemyField);
      this.board.move(start, end);
      this.board.resetField(enemyField); //moves list

      var lastMove = savedAttack.printMove();
      var movesList = new movesList_1.default();
      movesList.init(lastMove); //
      //change turn

      this.changeTurn();
    } else {
      //save attack
      var savedAttack = new saveOfMove_1.default(figure.color, figure, start, end, enemyFigure);
      this.moveSaver.addMove(savedAttack); //attack

      this.view.move(start, end, figure);
      this.board.move(start, end); //moves list

      var lastMove = savedAttack.printMove();
      var movesList = new movesList_1.default();
      movesList.init(lastMove); //
      //change turn

      this.changeTurn();
    }
  }; //Help function for clickOnField()


  BoardController.prototype.figureNotSelected = function (pos) {
    //get clicked position
    var figure = this.board.get(pos); //if we clicked on figure select this field

    if (figure && figure.color === this.moveFor) {
      this.selectNewFigure(pos);
    } //otherwise do nothing

  }; //Help function for clickOnField()


  BoardController.prototype.figureAlreadySelected = function (clickedPos, selectedPos) {
    //get clicked field
    var clickedFigure = this.board.get(clickedPos); //get already clicked figure

    var figure = this.board.get(selectedPos); //check if we clicked figure

    if (clickedFigure && figure) {
      //check if it is our figure
      if (clickedFigure.color === figure.color) {
        //It is our figure so select new one
        this.selectNewFigure(clickedPos);
        return;
      } else {
        //it is enemy figure
        //check if this figure is in renge already selected figure
        if (this.isFieldOnList(clickedPos, this.attacksForSelected)) {
          //It is so we can perform attack
          this.makeAttack(selectedPos, clickedPos, figure);
        }
      } //check if we clicked on field we can move

    } else if (figure && this.isFieldOnList(clickedPos, this.movesForSelected)) {
      //we clicked empty field
      //we can move on this field
      //check for king
      if (figure.name === figureInterface_1.EFigureType.King && !figure.isMoved) {
        //check if it is field for castling
        var row = this.moveFor === figureInterface_1.EColor.White ? 1 : 8;

        if (clickedPos[0] === 7 && clickedPos[1] === row) {
          //king side castling
          this.makeCastling(this.moveFor, true);
        } else if (clickedPos[0] === 2 && clickedPos[1] === row) {
          //queen side castling
          this.makeCastling(this.moveFor, false);
        } else {
          //normal move
          this.makeMove(selectedPos, clickedPos, figure);
        }
      } else {
        //normal move
        this.makeMove(selectedPos, clickedPos, figure);
      }
    } else if (figure && this.isFieldOnList(clickedPos, this.attacksForSelected)) {
      this.makeAttack(selectedPos, clickedPos, figure);
    }

    this.resetSelectedFigure();
  }; //Make castling, should be used only if canMakeCastling gives true for same parameters


  BoardController.prototype.makeCastling = function (color, kingSide) {
    //save castling
    var savedMove = new saveOfCastling_1.default(color, kingSide);
    this.moveSaver.addMove(savedMove);
    var row = color === figureInterface_1.EColor.White ? 1 : 8;
    var initKingPos = [5, row];
    var initRookPos = kingSide ? [8, row] : [1, row];
    var newKingPos = kingSide ? [7, row] : [2, row];
    var newRookPos = kingSide ? [6, row] : [3, row];
    var king = this.board.get(initKingPos);
    var rook = this.board.get(initRookPos); //move king

    this.view.move(initKingPos, newKingPos, king);
    this.board.move(initKingPos, newKingPos);
    king.move(); //move rook

    this.view.move(initRookPos, newRookPos, rook);
    this.board.move(initRookPos, newRookPos);
    rook.move(); //change turn for enemy

    this.changeTurn(); //display last move

    var lastMove = savedMove.printMove();
    var movesList = new movesList_1.default();
    movesList.init(lastMove);
  }; //Check if castling can be performed


  BoardController.prototype.canMakeCasting = function (color, kingSide) {
    //Select row for king
    var row = color === figureInterface_1.EColor.White ? 1 : 8; //select king figure

    var king = this.board.get([5, row]);

    if (king && !king.isMoved) {
      if (kingSide) {
        //check king side castling
        if (this.board.get([6, row])) return false;
        if (this.board.get([7, row])) return false;
        var rook = this.board.get([8, row]);
        if (rook && !rook.isMoved) return true;
      } else {
        //check queen side castling
        if (this.board.get([4, row])) return false;
        if (this.board.get([3, row])) return false;
        if (this.board.get([2, row])) return false;
        var rook = this.board.get([1, row]);
        if (rook && !rook.isMoved) return true;
      }
    }

    return false;
  }; //  Game functions
  //display board for given model


  BoardController.prototype.setUpBoard = function (board) {
    this.view.setUpBoard(board);
  }; // set up new timer


  BoardController.prototype.setUpTimer = function () {
    this.timer = setInterval(this.updateTime, 1000);
  };

  BoardController.prototype.stopTimer = function () {
    clearInterval(this.timer);
  }; //change turn for enemy player


  BoardController.prototype.changeTurn = function () {
    var nextMoveFor = this.moveFor === figureInterface_1.EColor.White ? figureInterface_1.EColor.Black : figureInterface_1.EColor.White;
    if (this.board.isCheckMate(nextMoveFor)) this.gameOver(this.moveFor);
    this.moveFor = nextMoveFor;
  }; //game over handler


  BoardController.prototype.gameOver = function (winer) {
    this.stopTimer();
    var winerColor = '';

    if (winer === 'b') {
      winerColor = "BLACK";
    } else {
      winerColor = "WHITE";
    }

    ;
    var root = document.getElementById('root');
    var end = new endGameView_1.default(root);
    end.createWiner(winerColor);
  };

  ;
  return BoardController;
}();

exports.default = BoardController;
},{"../Models/boardModel":"ts/App/Models/boardModel.ts","../Models/pieces/figureInterface":"ts/App/Models/pieces/figureInterface.ts","../Models/savesModels/saveOfCastling":"ts/App/Models/savesModels/saveOfCastling.ts","../Models/savesModels/saveOfMove":"ts/App/Models/savesModels/saveOfMove.ts","../Views/boardView":"ts/App/Views/boardView.ts","./moveSaver":"ts/App/Controllers/moveSaver.ts","../Views/movesList":"ts/App/Views/movesList.ts","../Views/endGameView":"ts/App/Views/endGameView.ts"}],"ts/App/App.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var boardController_1 = __importDefault(require("./Controllers/boardController"));

function App() {
  if (+"1") console.log('Start Chess App...');
  var root = document.getElementById('root');
  var controller = new boardController_1.default(root);
  var revertBtn = document.createElement('button');
  revertBtn.addEventListener('click', controller.undoMove);
  revertBtn.addEventListener('click', function () {
    var _a;

    var lastRecord = (_a = document.getElementById('last__move__info')) === null || _a === void 0 ? void 0 : _a.lastChild;

    if (lastRecord) {
      lastRecord.remove();
    }
  });
  revertBtn.innerHTML = 'UNDO';
  revertBtn.classList.add('revert__button');
  var element = document.getElementById('undo__button__container');
  element.appendChild(revertBtn);
  controller.addEventListenerToButton();
}

exports.default = App;
},{"./Controllers/boardController":"ts/App/Controllers/boardController.ts"}],"ts/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var App_1 = __importDefault(require("./App/App"));

App_1.default();
},{"./App/App":"ts/App/App.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46203" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/index.ts"], null)
//# sourceMappingURL=/ts.841fc46b.js.map