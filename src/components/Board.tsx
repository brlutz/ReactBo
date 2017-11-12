import * as React from "react";

export interface IBoardProps { compiler: string; framework: string; }
interface IPlayerProps {PlayerNumber: number; Hand: Card[]}
interface IHandProps {Hand: Card[]}
interface ICardModel {CardNumber: number; CardId: number, }
interface IBoardState {Deck: Card[], PlayerState: IPlayerProps[]}
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.

const Constants = 
{
    PlayerCount: 4,
    HandSize: 5,
}


function GetRandomCardPosition(DeckSize: number) {
        return Math.floor(Math.random() * (DeckSize));
      }


export class Board extends React.Component< IBoardProps, IBoardState> {
    constructor(props)
    {
        super(props);

        this.state = 
        {
            Deck: [],
            PlayerState: [],
        }

    }

    
    render() {

        var _players = [];
        if(this.state.PlayerState.length > 0)
        {
        for(var i = 0; i < 5; i++) {
            
            _players.push(this.renderPlayer(1))
        }
        }
        return (

<div>
    <button onClick = {() => this.shuffle()}>Shuffle</button>
<div className="container">
              {_players}  

        </div>
        <div className = "container">
            <div className="col-sm-4 col-sm-offset-4">
            This is where the play piles are 
            </div>
        </div>
        </div>
        );
    }

    renderPlayer(i: number)
    {
        return <Player
            PlayerNumber = {this.state.PlayerState[i].PlayerNumber}
            Hand = {this.state.PlayerState[i].Hand}/>
    }



    shuffle()
    {

        let _newDeck: Card[] = [];
        for (var num = 1; num <= 12; num++) {
            for (var i = 1; i <= 12; i++) {

                var _newCard = new Card({CardNumber: num, CardId: (num+ (i * .01))});
                _newDeck.push(_newCard);
            }
        }
        // Populate the deck with another 18 wild cards
        for (var i = 0; i < 18; i++) {
            var _skipBoCard = new Card({CardNumber: 13, CardId: (13+ (i * .01))});
            _newDeck.push(_skipBoCard);
        }

        console.log("inside shuffle");
        for (var i = 0; i < _newDeck.length; i++) {
            var first = Math.floor(Math.random() * 162) + 1;
            var second = Math.floor(Math.random() * 162) + 1;
            var firstCard = _newDeck[first];
            _newDeck[first] = _newDeck[second];
            _newDeck[second] = firstCard;
        }

        var _newPlayerState: IPlayerProps[] = [];
        for(var i = 0; i < Constants.PlayerCount; i++) {
            var _hand: Card[] = [];
            var _usedCards: number;
            for(var j = 0; j < Constants.HandSize; j++)
            {
                var _number: number = GetRandomCardPosition(_newDeck.length);
                _hand.push(_newDeck[_number]);
                _newDeck.splice(_number, 1);
            }

            _newPlayerState.push({PlayerNumber: i+1, Hand: _hand});

        }

        this.setState({Deck: _newDeck, PlayerState: _newPlayerState});
        return this;
    }

}


class Player extends React.Component<IPlayerProps, any> {
    
    constructor(props: IPlayerProps) {
        super(props);
    }
    render() {
     return(
      <div className="row">
        <div className="col-sm-4">
          <h3>This is player {this.props.PlayerNumber}</h3>
          <div> Cards in hand 
              
                  <Hand Hand={this.props.Hand}/>
              
          </div>
          
          <div> Discard Piles </div>
        </div>
      </div>
      )
    }

}

class Hand extends React.Component<IHandProps, any>
{
    constructor(props: IHandProps)
    {
        super(props);
    }

    render()
    {
        var rows = [];
        for (var i=1; i <= Constants.HandSize; i++) {
            if(i < this.props.Hand.length)
            rows.push(this.props.Hand[i]);
        }
        return <div>{rows}</div>;


    }
}


class Card extends React.Component<ICardModel, ICardModel>
{
    constructor(props: ICardModel)
    {
        super(props);

    }

    render ()
    {

        return (
        <div key= {this.props.CardId} className={"card"+this.getCardColor()}>
            <div className="container">
              <h4><b>{this.props.CardNumber}</b></h4> 
            </div>
          </div>
        )
    }

    getCardColor()
    {
        let color = "";
        if(this.props.CardNumber <= 4)
        {
            color = " blue";
        }
        else if(this.props.CardNumber <= 8)
        {
            color = " green";
        }
        else if(this.props.CardNumber <=12)
        {
            color = " red";
        }
        else if(this.props.CardNumber == 13)
        {
            color = " orange";
        }

        return color;
    }
}