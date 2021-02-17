parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"tvxU":[function(require,module,exports) {
"use strict";var e,o;Object.defineProperty(exports,"__esModule",{value:!0}),exports.FigureType=exports.Color=void 0,function(e){e.Black="b",e.White="w"}(e=exports.Color||(exports.Color={})),function(e){e.Rook="p",e.Tower="r",e.Bishop="b",e.Knight="n",e.Queen="q",e.King="k"}(o=exports.FigureType||(exports.FigureType={}));
},{}],"bMbO":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./figureInterface"),t=function(){function t(t){this.color=t,this.name=e.FigureType.King,this.moveVectors=[[[-1,-1]],[[-1,0]],[[-1,1]],[[0,-1]],[[0,0]],[[0,1]],[[1,-1]],[[1,0]],[[1,1]]],this.attackVectors=this.moveVectors,this.isMoved=!1}return t.prototype.move=function(){this.isMoved=!0},t}();exports.default=t;
},{"./figureInterface":"tvxU"}],"xWxj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./figureInterface"),t=function(){function t(t){this.color=t,this.name=e.FigureType.Knight,this.moveVectors=[[[-2,-1]],[[-2,1]],[[-1,2]],[[-1,-2]],[[1,2]],[[1,-2]],[[2,-1]],[[2,1]]],this.attackVectors=this.moveVectors,this.isMoved=!1}return t.prototype.move=function(){this.isMoved=!0},t}();exports.default=t;
},{"./figureInterface":"tvxU"}],"f9pk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./figureInterface"),t=function(){function t(t){this.color=t,this.name=e.FigureType.Rook;var o=this.color===e.Color.White?1:-1;this.moveVectors=[[[0,1*o],[0,2*o]]],this.attackVectors=[[[1,o]],[[-1*o,o]]],this.isMoved=!1}return t.prototype.move=function(){this.isMoved=!0;var t=this.color===e.Color.White?1:-1;this.moveVectors=[[[0,1*t]]]},t}();exports.default=t;
},{"./figureInterface":"tvxU"}],"Xc0H":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./figureInterface"),t=function(){function t(t){this.color=t,this.name=e.FigureType.Tower,this.moveVectors=[[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],[[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],[[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]]],this.attackVectors=this.moveVectors,this.isMoved=!1}return t.prototype.move=function(){this.isMoved=!0},t}();exports.default=t;
},{"./figureInterface":"tvxU"}],"QXGp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./figureInterface"),t=function(){function t(t){this.color=t,this.name=e.FigureType.Bishop,this.moveVectors=[[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]],[[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]],[[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]],[[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]]],this.attackVectors=this.moveVectors,this.isMoved=!1}return t.prototype.move=function(){this.isMoved=!0},t}();exports.default=t;
},{"./figureInterface":"tvxU"}],"KW6q":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./figureInterface"),t=function(){function t(t){this.color=t,this.name=e.FigureType.Queen,this.moveVectors=[[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]],[[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]],[[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]],[[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]],[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],[[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],[[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]]],this.attackVectors=this.moveVectors,this.isMoved=!1}return t.prototype.move=function(){this.isMoved=!0},t}();exports.default=t;
},{"./figureInterface":"tvxU"}],"kVIZ":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.QueenModel=exports.BishopModel=exports.TowerModel=exports.RookModel=exports.KnightModel=exports.KingModel=void 0;var o=e(require("./kingModel"));exports.KingModel=o.default;var r=e(require("./knightModel"));exports.KnightModel=r.default;var t=e(require("./rookModel"));exports.RookModel=t.default;var d=e(require("./towerModel"));exports.TowerModel=d.default;var l=e(require("./bishopModel"));exports.BishopModel=l.default;var u=e(require("./queenModel"));exports.QueenModel=u.default;
},{"./kingModel":"bMbO","./knightModel":"xWxj","./rookModel":"f9pk","./towerModel":"Xc0H","./bishopModel":"QXGp","./queenModel":"KW6q"}],"Ww8h":[function(require,module,exports) {
"use strict";var e=this&&this.__spreadArrays||function(){for(var e=0,o=0,t=arguments.length;o<t;o++)e+=arguments[o].length;var r=Array(e),n=0;for(o=0;o<t;o++)for(var i=arguments[o],l=0,a=i.length;l<a;l++,n++)r[n]=i[l];return r};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./figureInterface"),t=require("./index"),r=function(){function r(){this.blackKing=new t.KingModel(o.Color.Black),this.whiteKing=new t.KingModel(o.Color.White),this.board=e([[new t.TowerModel(o.Color.Black),new t.KnightModel(o.Color.Black),new t.BishopModel(o.Color.Black),new t.QueenModel(o.Color.Black),this.blackKing,new t.BishopModel(o.Color.Black),new t.KnightModel(o.Color.Black),new t.TowerModel(o.Color.Black)],this.setRooks(o.Color.Black)],Array.from({length:4},function(e){return Array(8).fill(null)}),[this.setRooks(o.Color.White),[new t.TowerModel(o.Color.White),new t.KnightModel(o.Color.White),new t.BishopModel(o.Color.White),new t.QueenModel(o.Color.White),this.whiteKing,new t.BishopModel(o.Color.White),new t.KnightModel(o.Color.White),new t.TowerModel(o.Color.White)]])}return r.prototype.move=function(e,o){var t=this.get(e);t&&t.move(),this.set(o,t),this.resetField(e)},r.prototype.get=function(e){return this.board[8-e[1]][e[0]-1]},r.prototype.set=function(e,o){this.board[8-e[1]][e[0]-1]=o},r.prototype.resetField=function(e){this.set(e,null)},r.prototype.possibleMovesFor=function(e){var o=this,t=[],r=this.get(e);return null===r?t:(r.moveVectors.forEach(function(r){for(var n=0;n<r.length;){var i=r[n],l=e[0]+i[0];if(l<1||l>8)break;var a=e[1]+i[1];if(a<1||a>8)break;var s=[l,a];if(null!==o.get(s))break;t.push([l,a]),n+=1}}),t)},r.prototype.possibleAttacksFor=function(e){var o=this,t=[],r=this.get(e);return null===r?t:(r.attackVectors.forEach(function(n){for(var i=0;i<n.length;){var l=n[i],a=e[0]+l[0];if(a<1||a>8)break;var s=e[1]+l[1];if(s<1||s>8)break;var h=[a,s],u=o.get(h);if(null!==u){u.color!==r.color&&t.push([a,s]);break}i+=1}}),t)},r.prototype.setBoard=function(){},r.prototype.setRooks=function(o){return e(new Array(8)).map(function(e){return new t.RookModel(o)})},r.prototype.isMate=function(e){return!1},r.prototype.isCheckMate=function(e){return!1},r}();exports.default=r;
},{"./figureInterface":"tvxU","./index":"kVIZ"}],"Xz1V":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(){}return e.prototype.init=function(e,t,s){var i=this,a=document.createElement("div");a.classList.add("chessboard"),t.board.forEach(function(e,t){e.forEach(function(e,o){var d=document.createElement("div");if(d.dataset.x=1+o+"",d.dataset.y=8-t+"",d.addEventListener("click",function(){var e=[parseInt(d.dataset.x),parseInt(d.dataset.y)];s(e)}),d.classList.add("chessboard__field"),e){var r=i.getFigureImage(e);d.appendChild(r)}a.appendChild(d)})}),e.appendChild(a)},e.prototype.getFigureImage=function(e){var t=document.createElement("img"),s=e.color+e.name;return t.setAttribute("src","./static/assets/pieces/kosal/"+s+".svg"),t.setAttribute("alt",e.color+" "+e.name),t.classList.add("chessboard__figure"),t},e.prototype.resetField=function(e){var t=this.getField(e);t.innerHTML="",t.classList.value="",t.classList.add("chessboard__field")},e.prototype.setFigureOnField=function(e,t){var s=this.getField(e),i=this.getFigureImage(t);s.innerHTML="",s.appendChild(i)},e.prototype.getField=function(e){return document.querySelector('[data-x="'+e[0]+'"][data-y="'+e[1]+'"]')},e.prototype.move=function(e,t,s){this.setFigureOnField(t,s),this.resetField(e),this.resetStyles()},e.prototype.setAsPossibleToMove=function(e){this.getField(e).classList.add("chessboard__field--possible_move")},e.prototype.setAsPossibleToAttack=function(e){this.getField(e).classList.add("chessboard__field--possible_attack")},e.prototype.setAsSelected=function(e){this.getField(e).classList.add("chessboard__field--selected")},e.prototype.resetStyles=function(){document.querySelectorAll(".chessboard__field").forEach(function(e){e.classList.value="",e.classList.add("chessboard__field")})},e}();exports.default=e;
},{}],"dAdP":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("../Models/boardModel")),i=require("../Models/figureInterface"),s=e(require("../Views/boardView")),o=function(){function e(e){var o=this;this.clickOnField=function(e){o.selectedField?o.figureAlreadySelected(e,o.selectedField):o.figureNotSelected(e)},this.parent=e,this.board=new t.default,this.view=new s.default,this.moveFor=i.Color.White,this.selectedField=null,this.movesForSelected=[],this.attacksForSelected=[]}return e.prototype.isFieldOnList=function(e,t){return!t.every(function(t){return t[0]!==e[0]||t[1]!==e[1]})},e.prototype.selectNewPos=function(e){var t=this;this.view.resetStyles(),this.selectedField=e,this.movesForSelected=this.board.possibleMovesFor(this.selectedField),this.attacksForSelected=this.board.possibleAttacksFor(this.selectedField),this.view.setAsSelected(e),this.movesForSelected.forEach(function(e){t.view.setAsPossibleToMove(e)}),this.attacksForSelected.forEach(function(e){t.view.setAsPossibleToAttack(e)})},e.prototype.resetSelectedPos=function(){this.view.resetStyles(),this.selectedField=null,this.movesForSelected=[],this.attacksForSelected=[]},e.prototype.makeMove=function(e,t,i){this.view.move(e,t,i),this.board.move(e,t)},e.prototype.setBoard=function(){this.view.init(this.parent,this.board,this.clickOnField),this.moveFor=i.Color.White},e.prototype.figureNotSelected=function(e){var t=this.board.get(e);t&&t.color===this.moveFor&&this.selectNewPos(e)},e.prototype.figureAlreadySelected=function(e,t){var i=this.board.get(e),s=this.board.get(t);if(i&&s){if(i.color===s.color)return void this.selectNewPos(e);this.isFieldOnList(e,this.attacksForSelected)&&console.log("ATTACK")}else s&&this.isFieldOnList(e,this.movesForSelected)&&this.makeMove(t,e,s);this.resetSelectedPos()},e}();exports.default=o;
},{"../Models/boardModel":"Ww8h","../Models/figureInterface":"tvxU","../Views/boardView":"Xz1V"}],"UwJ4":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./Controllers/boardController"));function r(){console.log("Start Chess App...");var e=document.getElementById("root");new t.default(e).setBoard()}exports.default=r;
},{"./Controllers/boardController":"dAdP"}],"LQOA":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./App/App"));t.default();
},{"./App/App":"UwJ4"}]},{},["LQOA"], null)
//# sourceMappingURL=ts.d8d15c1c.js.map