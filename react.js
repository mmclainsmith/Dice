class Dice extends React.Component {

    diceClick = () => {
        this.props.onSelect(this.props.sides);
    }

    render() {
        var className = "dice";
        if (this.props.selected) {
            className += " selected";
        }
        return (
            <div className={className} onClick = {this.diceClick}>
            {this.props.sides}
            </div>
        );
    }
}

class RollOptions extends React.Component {

    deselect = () => {
        this.props.onSelect(0);
    }

    render() {
        var options = [];
        for (var i = 1; i < 9 ; i++) {
            options.push(
                <option value="{i}">{i}</option>
            );
        }
        return (
            <div>
                <select>
                    {options}
                </select>
                <div onClick = {this.deselect}> {this.props.selected} </div>
                <input type="number" onChange = {this.props.onOptMod} />
            </div>
        );
    }
}

class DiceDrawer extends React.Component {
    constructor(){
        super();
        this.state = {  selectedDice : 0,
                        rolls        : 0,
                        mod          : 0};
    }
    diceSelection = (diceValue) => {
        this.setState({selectedDice: diceValue});
    }

    optMod = (rolls, mod) => {
        this.setState({rolls : rolls, mod : mod});
    }

    rollClick = () => {
        this.props.onUpdate(this.state.selectedDice, 0, 0);
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
                        onSelect={this.diceSelection}/>
            );
        }
        return (
            <div>
                <div className="diceDrawer">{diceOptions}</div>
                <RollOptions    selected={this.state.selectedDice}
                                onSelect={this.diceSelection}
                                onOptMod={this.optMod}/>
                <div    className="button"
                        onClick={this.rollClick}> Roll! </div>
            </div>
        );
    }
}

class Graph extends React.Component {
    render() {
        return (
            <div>
            {this.props.dice} {this.props.rolls} {this.props.mod}
            </div>
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
                <DiceDrawer onUpdate={this.updateGraph}/>

                <Graph  dice={this.state.graphDice}
                        rolls={this.state.graphRolls}
                        mod={this.state.graphMod}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Board/>,
    document.getElementById('container')
);
