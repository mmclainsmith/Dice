class Dice extends React.Component {

    diceClick= () => {
        alert(this.props.selected);
        this.props.selected = this.props.selected == 0 ? 1 : 0;
        this.props.onSelect(this.props.sides);
    }

    render() {
        var className = "dice";
        if (this.props.selected) {
            className += " selected";
            alert("select");
        }
        return (
            <div className={className} onClick = {this.diceClick}>
            {this.props.sides}
            </div>
        );
    }
}

class RollOptions extends React.Component {

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
                <div> {this.props.selected} </div>
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
        alert("Dice value " + diceValue);
       this.setState({selectedDice: diceValue});
    }

    render() {
        var diceSides = [4, 6, 10, 20];
        var diceOptions = [];
        for (var i = 0; i < diceSides.length; i++) {
            var isSelected = 0;
            var sides = diceSides[i];
            diceOptions.push(
                <Dice sides={sides} selected={isSelected} key={i} onSelect={this.handleSelection}/>
            );
        }

        return (
            <div>
            <div className="diceDrawer">{diceOptions}</div>
            <RollOptions selected = {this.state.selectedDice}/>
            </div>
        );
    }
}

ReactDOM.render(
    <DiceDrawer/>,
    document.getElementById('container')
);
