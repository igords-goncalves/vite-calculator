import Button from "../buttom/Button";
import Display from "../display/Display";

import Calculator from "../../utils/class/Calculator";

import "./Calculator.css";

function RenderCalculator() {

    const calculator = new Calculator();

    return (
        <div className="Calculator">
            <h1>Calculator</h1>
            <Display value={calculator.state.displayValue} />
            <Button label="AC" type="triple" click={calculator.clearMemory} />
            <Button
                label="/"
                type="operation"
                click={calculator.setOperation}
            />
            <Button label="1" click={calculator.setDigit} />
            <Button label="2" click={calculator.setDigit} />
            <Button label="3" click={calculator.setDigit} />
            <Button
                label="*"
                type="operation"
                click={calculator.setOperation}
            />
            <Button label="4" click={calculator.setDigit} />
            <Button label="5" click={calculator.setDigit} />
            <Button label="6" click={calculator.setDigit} />
            <Button
                label="+"
                type="operation"
                click={calculator.setOperation}
            />
            <Button label="7" click={calculator.setDigit} />
            <Button label="8" click={calculator.setDigit} />
            <Button label="9" click={calculator.setDigit} />
            <Button
                label="-"
                type="operation"
                click={calculator.setOperation}
            />
            <Button label="0" click={calculator.setDigit} />
            <Button label="00" click={calculator.setDigit} />
            <Button label="." click={calculator.setDigit} />
            <Button
                label="="
                type="operation"
                click={calculator.setOperation}
            />
        </div>
    );
}

export default RenderCalculator;
