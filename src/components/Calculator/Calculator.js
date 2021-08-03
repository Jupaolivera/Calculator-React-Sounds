import React, { useState } from "react";
import { Container, Screen, Previous, Current, Button } from "./Styled/Styled";
import useKeypress from "react-use-keypress";
import * as Tone from "tone";

//SOUNDS SETUP

// NUMBERS //
const freeverbNumbers = new Tone.Freeverb().toDestination();
freeverbNumbers.dampening = 100;
freeverbNumbers.roomSize.value = 0.4;

const numbers = new Tone.Sampler({
    c0: "1.wav",
    d0: "2.wav",
    e0: "3.wav",
    f0: "4.wav",
    g0: "5.wav",
}).connect(freeverbNumbers);

const samplesList = ["c0", "d0", "e0", "f0", "g0"];

const samplesListMaxIndex = samplesList.length - 1;

//EQUAL SIGN//
const freeverbEqual = new Tone.Freeverb().toDestination();
freeverbEqual.roomSize.value = 0.8;
freeverbEqual.dampening = 300;

const equal = new Tone.Sampler({
    c0: "6 equal.wav",
}).connect(freeverbEqual);

//CLEAR SIGN//
const clear = new Tone.Sampler({
    c0: "7 clear.wav",
}).toDestination();

//OPERATIONS//
const operations = new Tone.Sampler({
    c0: "8 mas.wav",
    d0: "9 menos.wav",
    e0: "10 mult.wav",
    f0: "11 divi.wav",
    g0: "12 backspace.wav",
}).toDestination();

const operationsList = ["c0", "d0", "e0", "f0"];

const Calculator = () => {
    const [current, setCurrent] = useState("");
    const [previous, setPrevious] = useState("");
    const [operation, setOperation] = useState("");

    const appendValue = (el) => {
        console.log(current);
        const value = el.target.getAttribute("data");
        if (
            value !== "." ||
            (value === "." && !current.toString().includes("."))
        ) {
            setCurrent(current + value);
            numbers.triggerAttack(
                samplesList[
                    Math.floor(Math.random() * (samplesListMaxIndex + 1)) //random int formula  ---> Math.floor(Math.random()*(max-min+1)+min);
                ]
            );
        }
    };

    const handleDelete = () => {
        if (current.toString()[0] === "-") {
            setCurrent("");
        } else {
            setCurrent(current.toString().slice(0, -1));
        }

        if (current !== "") {
            operations.triggerAttack("g0");
        }
    };

    const handleClear = () => {
        setCurrent("");
        setPrevious("");
        setOperation("");
        if (current !== "" || previous !== "") {
            clear.triggerAttack("c0");
        }
    };

    const chooseOperation = (el) => {
        if (current === "") {
            return;
        }
        if (previous !== "") {
            let value = calculate();
            setPrevious(value);
            switch (el.target.getAttribute("data")) {
                case "×":
                    operations.triggerAttack(operationsList[0]);
                    break;
                case "÷":
                    operations.triggerAttack(operationsList[1]);
                    break;
                case "+":
                    operations.triggerAttack(operationsList[2]);
                    break;
                case "-":
                    operations.triggerAttack(operationsList[3]);
                    break;
                default:
                    return;
            }
        } else {
            setPrevious(current);
            switch (el.target.getAttribute("data")) {
                case "×":
                    operations.triggerAttack(operationsList[0]);
                    break;
                case "÷":
                    operations.triggerAttack(operationsList[1]);

                    break;
                case "+":
                    operations.triggerAttack(operationsList[2]);

                    break;
                case "-":
                    operations.triggerAttack(operationsList[3]);

                    break;
                default:
                    return;
            }
        }

        setCurrent("");
        setOperation(el.target.getAttribute("data"));
    };

    const equals = () => {
        let value = calculate();
        if (value === undefined || value === null) {
            return;
        } else {
            setCurrent(value);
            setPrevious("");
            setOperation("");
        }
        equal.triggerAttack("c0");
    };
    const calculate = () => {
        let result;
        let previousNumber = parseFloat(previous);
        let currentNumber = parseFloat(current);

        if (isNaN(previousNumber) || isNaN(currentNumber)) {
            return;
        } else {
            switch (operation) {
                case "÷":
                    if (currentNumber === 0) {
                        //no division by zero allowed
                        handleClear();
                        break;
                    } else {
                        result = previousNumber / currentNumber;
                        break;
                    }
                case "×":
                    result = previousNumber * currentNumber;
                    break;
                case "+":
                    result = previousNumber + currentNumber;
                    break;
                case "-":
                    result = previousNumber - currentNumber;
                    break;
                default:
                    return;
            }
        }
        return result;
    };

    const preventDefaultEnter = (event) => {
        if (event.key === "Enter" /* Enter */) {
            event.preventDefault();
        }
    };

    useKeypress(
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."],
        (event) => {
            let samplesListMaxIndex = samplesList.length - 1;

            const value = event.key;
            if (current === Infinity || current === -Infinity) {
                setCurrent(value);
                numbers.triggerAttack(
                    samplesList[
                        Math.floor(
                            Math.random() * (samplesListMaxIndex - 0 + 1) + 0
                        )
                    ]
                );
            } else if (
                value !== "." ||
                (value === "." && !current.toString().includes("."))
            ) {
                setCurrent(current + value);
                numbers.triggerAttack(
                    samplesList[
                        Math.floor(
                            Math.random() * (samplesListMaxIndex - 0 + 1) + 0
                        )
                    ]
                );
            }
        }
    );

    useKeypress(["*", "/", "+", "-"], (event) => {
        let operationKey;
        switch (event.key) {
            case "*":
                operationKey = "×";
                break;
            case "/":
                operationKey = "÷";
                break;
            case "+":
                operationKey = "+";
                break;
            case "-":
                operationKey = "-";
                break;
            default:
                return;
        }
        if (current === "") {
            return;
        } else if (previous !== "") {
            let value = calculate();
            setPrevious(value);
            switch (event.key) {
                case "*":
                    operations.triggerAttack(operationsList[0]);
                    break;
                case "/":
                    operations.triggerAttack(operationsList[1]);
                    break;
                case "+":
                    operations.triggerAttack(operationsList[2]);
                    break;
                case "-":
                    operations.triggerAttack(operationsList[3]);
                    break;
                default:
                    return;
            }
        } else {
            setPrevious(current);
            switch (event.key) {
                case "*":
                    operations.triggerAttack(operationsList[0]);
                    break;
                case "/":
                    operations.triggerAttack(operationsList[1]);

                    break;
                case "+":
                    operations.triggerAttack(operationsList[2]);

                    break;
                case "-":
                    operations.triggerAttack(operationsList[3]);

                    break;
                default:
                    return;
            }
        }
        setCurrent("");
        setOperation(operationKey);
    });

    useKeypress("Enter", () => {
        equals();
    });

    useKeypress("Backspace", () => {
        handleDelete();
    });

    return (
        <Container>
            <Screen>
                <Previous>
                    {previous}
                    {operation}
                </Previous>
                <Current>{current}</Current>
            </Screen>
            <Button
                gridSpan={2}
                control
                onClick={handleClear}
                onKeyPress={preventDefaultEnter}
            >
                AC
            </Button>
            <Button
                control
                onClick={handleDelete}
                onKeyPress={preventDefaultEnter}
            >
                DEL
            </Button>
            <Button
                data={"÷"}
                operation
                onClick={chooseOperation}
                onKeyPress={preventDefaultEnter}
            >
                ÷
            </Button>
            <Button
                data={"7"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                7
            </Button>
            <Button
                data={"8"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                8
            </Button>
            <Button
                data={"9"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                9
            </Button>
            <Button
                data={"×"}
                operation
                onClick={chooseOperation}
                onKeyPress={preventDefaultEnter}
            >
                ×
            </Button>
            <Button
                data={"4"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                4
            </Button>
            <Button
                data={"5"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                5
            </Button>
            <Button
                data={"6"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                6
            </Button>
            <Button
                data={"+"}
                operation
                onClick={chooseOperation}
                onKeyPress={preventDefaultEnter}
            >
                +
            </Button>
            <Button
                data={"1"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                1
            </Button>
            <Button
                data={"2"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                2
            </Button>
            <Button
                data={"3"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                3
            </Button>
            <Button
                data={"-"}
                operation
                onClick={chooseOperation}
                onKeyPress={preventDefaultEnter}
            >
                -
            </Button>
            <Button
                period
                data={"."}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                .
            </Button>
            <Button
                data={"0"}
                onClick={appendValue}
                onKeyPress={preventDefaultEnter}
            >
                0
            </Button>
            <Button gridSpan={2} equals onClick={equals}>
                =
            </Button>
        </Container>
    );
};

export default Calculator;
