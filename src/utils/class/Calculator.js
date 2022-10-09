import { initialState } from "../initialStates";
import { Component } from "react";

export default class Calculator extends Component {
    state = { ...initialState };

    constructor(props) {
        super(props);

        this.setDigit = this.setDigit.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.clearMemory = this.clearMemory.bind(this);
    }

    // Esse métodos póderiam ser funções separadas, ou arquivos

    //~~! Cada método resolve um problema específico

    clearMemory() {
        this.setState({ ...initialState });
    }

    setDigit(number) {
        try {
            if (number === "." && this.state.displayValue.includes(".")) return;

            const clearDisplay = // Em que momento o display será limpo
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
                // console.log(values)
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
                    //~~! Use o switch case no lugar da função eval
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
}
