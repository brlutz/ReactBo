import * as React from "react";

export interface BoardProps { compiler: string; framework: string; }
interface PlayerProps {playerNumber: number; Hand: Card[]}
interface HandProps {Hand: Card[]}
interface CardModel {cardNumber: number; cardId: number}
interface BoardState {Deck: Card[]}
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Board extends React.Component<BoardProps, BoardState> {
    constructor(props)
    {
        super(props);

        this.state = 
        {
            Deck: [],
        }
    }

    
    render() {
        return (

<div>
    <button onClick = {() => this.shuffle()}>Shuffle</button>
<div className="container">

       {this.renderPlayer(1)}
       {this.renderPlayer(2)}
       {this.renderPlayer(3)}
       {this.renderPlayer(4)}
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
        return <Player playerNumber={i} />
    }

    shuffle()
    {

        let cards: Card[] = [];
        for (var num = 1; num <= 12; num++) {
            for (var i = 1; i < 13; i++) {

                var _newCard = new Card({cardNumber: num, cardId: (num+ (i * .01))});
                cards.push(_newCard);
            }
        }
        // Populate the deck with another 18 wild cards
        for (var i = 0; i < 18; i++) {
            var _skipBoCard = new Card({cardNumber: 13, cardId: (13+ (i * .01))});
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

        this.setState({Deck: cards});
        return this;
    }


}


class Player extends React.Component<any, any> {
    
    constructor(props: PlayerProps) {
        super(props);
    }
    render() {
     return(
      <div className="row">
        <div className="col-sm-4">
          <h3>This is player {this.props.playerNumber}</h3>
          <div> Cards in hand 
              
                  <Hand hand={this.props.Hand}/>
              
          </div>
          
          <div> Discard Piles </div>
        </div>
      </div>
      )
    }

}

class Hand extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);
        this.state = 
        {
            Hand: [],

        }
    }

    render()
    {
        var rows = [];
        for (var i=1; i < 6; i++) {
            if(i < this.state.Hand.le)
            rows.push(<Card cardNumber = {i} cardId = {i} />);
        }
        return <div>{rows}</div>;


    }
}

class Card extends React.Component<CardModel, any>
{
    constructor(props: CardModel)
    {
        super(props);
    }

    render ()
    {


        return (
        <div key= {this.props.cardId} className={"card"+this.getCardColor()}>
            <div className="container">
              <h4><b>{this.props.cardNumber}</b></h4> 
            </div>
          </div>
        )
    }

    getCardColor()
    {
        let color = "";
        if(this.props.cardNumber <= 4)
        {
            color = " blue";
        }
        else if(this.props.cardNumber <= 8)
        {
            color = " green";
        }
        else if(this.props.cardNumber <=12)
        {
            color = " red";
        }
        else if(this.props.cardNumber == 13)
        {
            color = " orange";
        }

        return color;
    }
}