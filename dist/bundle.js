/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var Board_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(Board_1.Board, { compiler: "TypeScript", framework: "React" }), document.getElementById("example"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                Deck: [],
            };
        return _this;
    }
    Board.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("button", { onClick: function () { return _this.shuffle(); } }, "Shuffle"),
            React.createElement("div", { className: "container" },
                this.renderPlayer(1),
                this.renderPlayer(2),
                this.renderPlayer(3),
                this.renderPlayer(4)),
            React.createElement("div", { className: "container" },
                React.createElement("div", { className: "col-sm-4 col-sm-offset-4" }, "This is where the play piles are"))));
    };
    Board.prototype.renderPlayer = function (i) {
        return React.createElement(Player, { playerNumber: i });
    };
    Board.prototype.shuffle = function () {
        var cards = [];
        for (var num = 1; num <= 12; num++) {
            for (var i = 1; i < 13; i++) {
                var _newCard = new Card({ cardNumber: num, cardId: (num + (i * .01)) });
                cards.push(_newCard);
            }
        }
        // Populate the deck with another 18 wild cards
        for (var i = 0; i < 18; i++) {
            var _skipBoCard = new Card({ cardNumber: 13, cardId: (13 + (i * .01)) });
            cards.push(_skipBoCard);
        }
        console.log("inside shuffle");
        for (var i = 0; i < cards.length; i++) {
            var first = (Math.random() * 162) + 1;
            var second = (Math.random() * 162) + 1;
            var firstCard = cards[first];
            cards[first] = cards[second];
            cards[second] = firstCard;
        }
        this.setState({ Deck: cards });
        return this;
    };
    return Board;
}(React.Component));
exports.Board = Board;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(props) {
        return _super.call(this, props) || this;
    }
    Player.prototype.render = function () {
        return (React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-sm-4" },
                React.createElement("h3", null,
                    "This is player ",
                    this.props.playerNumber),
                React.createElement("div", null,
                    " Cards in hand",
                    React.createElement(Hand, { hand: this.props.Hand })),
                React.createElement("div", null, " Discard Piles "))));
    };
    return Player;
}(React.Component));
var Hand = /** @class */ (function (_super) {
    __extends(Hand, _super);
    function Hand(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                Hand: [],
            };
        return _this;
    }
    Hand.prototype.render = function () {
        var rows = [];
        for (var i = 1; i < 6; i++) {
            if (i < this.state.Hand.le)
                rows.push(React.createElement(Card, { cardNumber: i, cardId: i }));
        }
        return React.createElement("div", null, rows);
    };
    return Hand;
}(React.Component));
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(props) {
        return _super.call(this, props) || this;
    }
    Card.prototype.render = function () {
        return (React.createElement("div", { key: this.props.cardId, className: "card" + this.getCardColor() },
            React.createElement("div", { className: "container" },
                React.createElement("h4", null,
                    React.createElement("b", null, this.props.cardNumber)))));
    };
    Card.prototype.getCardColor = function () {
        var color = "";
        if (this.props.cardNumber <= 4) {
            color = " blue";
        }
        else if (this.props.cardNumber <= 8) {
            color = " green";
        }
        else if (this.props.cardNumber <= 12) {
            color = " red";
        }
        else if (this.props.cardNumber == 13) {
            color = " orange";
        }
        return color;
    };
    return Card;
}(React.Component));


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map