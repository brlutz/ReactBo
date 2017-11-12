import * as React from "react";

export interface IBoardProps { compiler: string; framework: string; }
interface IPlayerProps {PlayerNumber: number; Hand: ICardModel[]}
interface IHandProps {Hand: ICardModel[]}
interface ICardModel {CardNumber: number; CardId: number, }
interface IBoardState {Deck: ICardModel[], PlayerState: IPlayerProps[]}
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

        for(var i = 0; i < this.state.PlayerState.length; i++) {
            
            _players.push(this.renderPlayer(i))
        }

        return (

<div>
    <button onClick = {() => this.shuffle()}>Shuffle</button>
<div className="container">
               

        </div>
        <div className="row">
        <div className="col-md-4 col-md-offset-4">{_players} </div>
        </div>
        <div className = "container">

            <div>
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

        let _newDeck: ICardModel[] = [];
        for (var num = 1; num <= 12; num++) {
            for (var i = 1; i <= 12; i++) {

                var _newCard: ICardModel = ({CardNumber: num, CardId: (num+ (i * .01))});
                _newDeck.push(_newCard);
            }
        }
        // Populate the deck with another 18 wild cards
        for (var i = 0; i < 18; i++) {
            var _skipBoCard: ICardModel = ({CardNumber: 13, CardId: (13+ (i * .01))});
            _newDeck.push(_skipBoCard);
        }

        console.log("inside shuffle");
        for (var i = 0; i < _newDeck.length; i++) {
            var _first = Math.floor(Math.random() * 162) + 1;
            var _second = Math.floor(Math.random() * 162) + 1;
            var _firstCard = _newDeck[_first];
            _newDeck[_first] = _newDeck[_second];
            _newDeck[_second] = _firstCard;
        }

        var _newPlayerState: IPlayerProps[] = [];
        for(var i = 0; i < Constants.PlayerCount; i++) {
            var _hand: ICardModel[] = [];
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
        <div className="col-sm-12">
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
        var _rows = [];
        for (var i=0; i < Constants.HandSize; i++) {
            if(i < this.props.Hand.length)
            _rows.push(<Card
             CardId = {this.props.Hand[i].CardId}
              CardNumber = {this.props.Hand[i].CardNumber}/>);
        }
        return <div>{_rows}</div>;


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
              <h4><b>{this.getCardName()}</b></h4> 
          </div>
        )
    }

    getCardColor()
    {
        let _color = "";
        if(this.props.CardNumber <= 4)
        {
            _color = " blue";
        }
        else if(this.props.CardNumber <= 8)
        {
            _color = " green";
        }
        else if(this.props.CardNumber <=12)
        {
            _color = " red";
        }
        else if(this.props.CardNumber == 13)
        {
            _color = " orange";
        }

        return _color;
    }

    getCardName()
    {
        if(this.props.CardNumber != 13)
        {
            return this.props.CardNumber.toString();
        }
        else if (this.props.CardNumber === 13)
        {
            return "WILD";
        }
        else
        {
            return "ERROR CARD"
        }
    }
}