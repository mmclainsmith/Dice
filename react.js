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
                <input type="number"/>
            </div>
        );
    }
}

class DiceDrawer extends React.Component {
    constructor(){
        super();
        this.state = {selectedDice: 0};
    }
    handleSelection = (diceValue) => {
       this.setState({selectedDice: diceValue});
    }

    render() {
        var diceSides = [4, 6, 10, 20];
        var diceOptions = [];
        for (var i = 0; i < diceSides.length; i++) {
            var sides = diceSides[i];
            var isSelected = (sides == this.state.selectedDice) ? 1 : 0;
            diceOptions.push(
                <Dice sides={sides} selected={isSelected} key={i} onSelect={this.handleSelection}/>
            );
        }
        return (
            <div>
            <div className="diceDrawer">{diceOptions}</div>
            <RollOptions selected = {this.state.selectedDice} onSelect={this.handleSelection}/>
            </div>
        );
    }
}

ReactDOM.render(
    <DiceDrawer/>,
    document.getElementById('container')
);
