import { Component } from "react";
import Button from "../buttom/Button";
import Display from "../display/Display";

import { initialState } from "../../utils/initialStates";

import "./Calculator.css";

export default class Calculator extends Component {

    /**
     * @ignore:Essa é a primera coisa quando o component inicia
     */
    state = { ...initialState };
    
    constructor(props) {
        super(props);

        this.setDigit = this.setDigit.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.clearMemory = this.clearMemory.bind(this);
    }

    clearMemory() {
        this.setState({ ...initialState });
    }

    setDigit(number) {
        try {
            if (number === "." && this.state.displayValue.includes(".")) return;

            /**
             * @ignore:Especifíca em que momento o display será limpo
             */
            const clearDisplay =
                this.state.displayValue === "0" || this.state.clearDisplay;

            const currentValue = clearDisplay ? "" : this.state.displayValue;

            const displayValue = currentValue + number;

            //~~> Mudando de fato o estado

            this.setState({ displayValue, clearDisplay: false });

            //~~> Armazenando valores como numbers (Parsing)

            if (number !== ".") {
                const index = this.state.current;
                const newValue = parseFloat(displayValue);
                const values = [...this.state.values];
                values[index] = newValue;
                this.setState({ values });
            }
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    }

    setOperation(operation) {
        try {
            //~~> Ocupando a segunda posição de values

            if (this.state.current === 0) {
                this.setState({ operation, current: 1, clearDisplay: true });
            } else {
                const getResult = operation === "=";

                const currentOperation = this.state.operation;

                const values = [...this.state.values];

                try {
                    //TODO: Use o switch case no lugar da função eval

                    values[0] = eval(
                        `${values[0]} ${currentOperation} ${values[1]}`
                    );
                } catch (error) {
                    values[0] = this.state.values[0];
                }

                values[1] = 0;

                this.setState({
                    displayValue: values[0],
                    operation: getResult ? null : operation,
                    current: getResult ? 0 : 1,
                    clearDisplay: !getResult,
                    values,
                });
            }
        } catch (error) {
            throw `ERROR: ${error}`;
        }
    }
    render() {
    
    return (
        <div className="Calculator">
            <h1>Calculator</h1>
            <Display value={this.state.displayValue} />
            <Button label="AC" type="triple" click={this.clearMemory} />
            <Button
                label="/"
                type="operation"
                click={this.setOperation}
            />
            <Button label="1" click={this.setDigit} />
            <Button label="2" click={this.setDigit} />
            <Button label="3" click={this.setDigit} />
            <Button
                label="*"
                type="operation"
                click={this.setOperation}
            />
            <Button label="4" click={this.setDigit} />
            <Button label="5" click={this.setDigit} />
            <Button label="6" click={this.setDigit} />
            <Button
                label="+"
                type="operation"
                click={this.setOperation}
            />
            <Button label="7" click={this.setDigit} />
            <Button label="8" click={this.setDigit} />
            <Button label="9" click={this.setDigit} />
            <Button
                label="-"
                type="operation"
                click={this.setOperation}
            />
            <Button label="0" click={this.setDigit} />
            <Button label="00" click={this.setDigit} />
            <Button label="." click={this.setDigit} />
            <Button
                label="="
                type="operation"
                click={this.setOperation}
            />
        </div>
    );
    }
}