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
var Constants = {
    PlayerCount: 4,
    HandSize: 5,
    DiscardPileSize: 4,
};
function GetRandomCardPosition(DeckSize) {
    return Math.floor(Math.random() * (DeckSize));
}
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(props) {
        var _this = _super.call(this, props) || this;
        _this.state =
            {
                Deck: [],
                PlayerState: [],
            };
        return _this;
    }
    Board.prototype.render = function () {
        var _this = this;
        var _players = [];
        for (var i = 0; i < this.state.PlayerState.length; i++) {
            _players.push(this.renderPlayer(i));
        }
        return (React.createElement("div", null,
            React.createElement("button", { onClick: function () { return _this.shuffle(); } }, "Shuffle"),
            React.createElement("div", { className: "container" }),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-1" }),
                React.createElement("div", { className: "col-md-4" },
                    _players,
                    " ")),
            React.createElement("div", { className: "container" },
                React.createElement("div", null, "This is where the play piles are"))));
    };
    Board.prototype.renderPlayer = function (i) {
        return React.createElement(Player, { PlayerNumber: this.state.PlayerState[i].PlayerNumber, Hand: this.state.PlayerState[i].Hand, DiscardPile: this.state.PlayerState[i].DiscardPile });
    };
    Board.prototype.shuffle = function () {
        var _newDeck = [];
        for (var num = 1; num <= 12; num++) {
            for (var i = 1; i <= 12; i++) {
                var _newCard = ({ CardNumber: num, CardId: (num + (i * .01)) });
                _newDeck.push(_newCard);
            }
        }
        // Populate the deck with another 18 wild cards
        for (var i = 0; i < 18; i++) {
            var _skipBoCard = ({ CardNumber: 13, CardId: (13 + (i * .01)) });
            _newDeck.push(_skipBoCard);
        }
        //console.log("inside shuffle", _newDeck);
        for (var i = 0; i < _newDeck.length; i++) {
            var _first = Math.floor(Math.random() * 162);
            var _second = Math.floor(Math.random() * 162);
            var _firstCard = _newDeck[_first];
            var _secondCard = _newDeck[_second];
            _newDeck[_first] = _secondCard;
            _newDeck[_second] = _firstCard;
        }
        //console.log("after shuffle", _newDeck);
        var _newPlayerState = [];
        for (var i = 0; i < Constants.PlayerCount; i++) {
            var _hand = [];
            var _usedCards;
            for (var j = 0; j < Constants.HandSize; j++) {
                var _number = GetRandomCardPosition(_newDeck.length);
                _hand.push(_newDeck[_number]);
                _newDeck.splice(_number, 1);
            }
            _newPlayerState.push({ PlayerNumber: i + 1, Hand: _hand, DiscardPile: [] });
        }
        //console.log("this is the playerstate", _newPlayerState);
        this.setState({ Deck: _newDeck, PlayerState: _newPlayerState });
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
            React.createElement("div", { className: "col-sm-12" },
                React.createElement("h3", null,
                    "This is player ",
                    this.props.PlayerNumber),
                React.createElement("div", null,
                    " Cards in hand",
                    React.createElement(Hand, { Hand: this.props.Hand })),
                React.createElement("div", null,
                    " ",
                    React.createElement(DiscardPile, { DiscardPile: this.props.DiscardPile }),
                    " "))));
    };
    return Player;
}(React.Component));
var DiscardPile = /** @class */ (function (_super) {
    __extends(DiscardPile, _super);
    function DiscardPile(props) {
        return _super.call(this, props) || this;
    }
    DiscardPile.prototype.render = function () {
        var _rows = [];
        for (var i = 0; i < Constants.DiscardPileSize; i++) {
            if (i < this.props.DiscardPile.length) {
                _rows.push(React.createElement(Card, { CardId: this.props.DiscardPile[i].CardId, CardNumber: this.props.DiscardPile[i].CardNumber }));
            }
            else {
                _rows.push(React.createElement(Card, { CardId: i, CardNumber: 0 }));
            }
        }
        return (React.createElement("div", null,
            "Discard Piles ",
            React.createElement("br", null),
            " ",
            _rows));
    };
    return DiscardPile;
}(React.Component));
var Hand = /** @class */ (function (_super) {
    __extends(Hand, _super);
    function Hand(props) {
        return _super.call(this, props) || this;
    }
    Hand.prototype.render = function () {
        var _rows = [];
        for (var i = 0; i < Constants.HandSize; i++) {
            if (i < this.props.Hand.length) {
                _rows.push(React.createElement(Card, { CardId: this.props.Hand[i].CardId, CardNumber: this.props.Hand[i].CardNumber }));
            }
        }
        return (React.createElement("div", null, _rows));
    };
    return Hand;
}(React.Component));
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(props) {
        return _super.call(this, props) || this;
    }
    Card.prototype.render = function () {
        return (React.createElement("div", { key: this.props.CardId, className: "card" + this.getCardColor() },
            React.createElement("h4", null,
                React.createElement("b", null, this.getCardName()))));
    };
    Card.prototype.getCardColor = function () {
        var _color = "";
        if (this.props.CardNumber == 0) {
            _color = " empty";
        }
        else if (this.props.CardNumber <= 4) {
            _color = " blue";
        }
        else if (this.props.CardNumber <= 8) {
            _color = " green";
        }
        else if (this.props.CardNumber <= 12) {
            _color = " red";
        }
        else if (this.props.CardNumber == 13) {
            _color = " orange";
        }
        return _color;
    };
    Card.prototype.getCardName = function () {
        if (this.props.CardNumber == 0) {
            return " ";
        }
        else if (this.props.CardNumber != 13) {
            return this.props.CardNumber.toString();
        }
        else if (this.props.CardNumber === 13) {
            return "WILD";
        }
        else {
            return "ERROR CARD";
        }
    };
    return Card;
}(React.Component));


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map