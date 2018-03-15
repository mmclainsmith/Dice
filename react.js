class Dice extends React.Component {

    diceClick = () => {
        this.props.onDiceSelect(this.props.sides);
    }

    render() {
        var className = "dice";
        if (this.props.selected) className += " selected";
        return (
            <div className={className} onClick = {this.diceClick}>
            {this.props.sides}
            </div>
        );
    }
}

class Options extends React.Component {
    constructor(){
        super();
        this.state = {  selectedDice : 0,
                        rolls        : 1,
                        mod          : 0};
    }
    diceSelection = (diceValue) => {
        this.setState({selectedDice: diceValue});
    }

    rollSelect = (event) => {
        console.log(event.target);
        this.setState({rolls : parseInt(event.target.value)});
    }

    modSelect = (event) => {
        this.setState({mod : parseInt(event.target.value)});
    }

    rollClick = () => {
        console.log("ROLL");
        console.log(this.state);
        this.props.onUpdate(    this.state.selectedDice,
                                this.state.rolls,
                                this.state.mod);
    }

    deselect = () => {
        this.setState({selectedDice : 0});
    }

    render() {
        var diceSides = [4, 6, 8, 10, 12, 20];
        var diceOptions = [];
        for (var i = 0; i < diceSides.length; i++) {
            var sides = diceSides[i];
            var isSelected = (sides == this.state.selectedDice) ? 1 : 0;
            diceOptions.push(
                <Dice   sides={sides}
                        selected={isSelected}
                        onDiceSelect={this.diceSelection}/>
            );
        }

        var options = [];
        for (var i = 1; i < 9 ; i++) {
            options.push(
                <option value={i}> {i} </option>
            );
        }
        var diceClassName = "dice";
        if (this.state.selectedDice == 0) diceClassName += " empty";

        var optPanel =
            <div class="optPanel">
                <select value={this.state.rolls} onChange={this.rollSelect}>
                    {options}
                </select>
                <div className={diceClassName} onClick = {this.deselect}> {this.state.selectedDice} </div>
                <input type="number" value={this.state.mod} onChange={this.modSelect}/>
            </div>

        return (
            <div>
                <div className="diceDrawer">{diceOptions}</div>
                {optPanel}
                <button disabled={!this.state.selectedDice}
                        className = "button"
                        onClick = {this.rollClick}>
                    Roll!
                </button>

            </div>
        );
    }
}

class Graph extends React.Component {
    render() {
        return (
            <ul>
                <li> Low: {1*this.props.rolls + this.props.mod} </li>
                <li> Average: {this.props.dice * this.props.rolls / 2 + this.props.mod} </li>
                <li> Hight: {this.props.dice * this.props.rolls + this.props.mod} </li>
            </ul>
        );
    }
}

class Board extends React.Component {
    constructor(){
        super();
        this.state = {
            graphDice: 0,
            graphRolls: 0,
            graphMod: 0
        };
    }

    updateGraph = (dice, rolls, mod) => {
        this.setState({
            graphDice: dice,
            graphRolls: rolls,
            graphMod: mod
        });
    }

    render() {
        return (
            <div>
                <Options onUpdate={this.updateGraph}/>

                <Graph dice  = {this.state.graphDice}
                       rolls = {this.state.graphRolls}
                       mod   = {this.state.graphMod} />
            </div>
        );
    }
}

ReactDOM.render(
    <Board/>,
    document.getElementById('container')
);
