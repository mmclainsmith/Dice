class Dice extends React.Component {
    render() {
        var className = "dice";
        if (this.props.selected) {
            className += " selected";
        }
        return (
            <div className={className}>
            {this.props.sides}
            </div>
        );
    }
}

class DiceOptions extends React.Component {
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
                <input type="number"/>
            </div>
        );
    }
}

class DiceDrawer extends React.Component {
    render() {
        var diceSides = [4, 6, 10, 20];
        var diceOptions = [];
        for (var i = 0; i < diceSides.length; i++) {
            var isSelected = 0;
            var sides = diceSides[i];
            diceOptions.push(
                <Dice sides={sides} selected={isSelected} key={i} />
            );
        }

        return (
            <div>
            <div className="diceDrawer">{diceOptions}</div>
            <DiceOptions/>
            </div>
        );
    }
}

ReactDOM.render(
    <DiceDrawer/>,
    document.getElementById('container')
);
