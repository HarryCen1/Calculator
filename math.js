let buffer = '0';
let runningTotal = 0;
let previousOperator; 
const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) { //parseInt and isNaN are built-In functions. ParseInt can identify numbers, isNaN (is Number a number?) proveds a true/flase statement if the enter item is a number ot not
       handleSymbol(value); //if click item is a symbol, run function handleSymbol
    } else {
        handleNumber(value); //if click item is a number, run function handleNumber
    }
    rerebder();
} // 4/ButtonClick runs 5/if its a symbol, it goes to handleSymbol(value) + if it's a number, it goes to handleNumber(value)  6/after it has run a function either one, it comes back and finish run funtion buttonclick(value) by runing a rerender() funtion 

function handleNumber(number) {
    if (buffer === '0') {
        buffer = number; //if buffer is equal to 0, then replace it with 0
    } else {
        buffer += number; //else, the numbers will be next to each other
        //buffer = buffer + number
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        // do nothing
        return;
    }

    const initBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = initBuffer;
    } else {
        flushOperation(initBuffer);
    }

    previousOperator = symbol;
    buffer = '0';
    console.log(runningTotal);
}

function flushOperation(initBuffer) {
    if (previousOperator === '+') {
        runningTotal += initBuffer;
    } else if (previousOperator === '-') { 
        runningTotal -= initBuffer;
    } else if (previousOperator === '×') { 
        runningTotal  *= initBuffer;
    }else if (previousOperator === '÷') { 
        runningTotal /= initBuffer;
    }
}



function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
          buffer = '0';  //resets to 0 
            break;
        case '=':
            if (previousOperator === null) {
                //need do number to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer =  "" + runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length -1); //This cuts off the last number, number is 45, arrow button is click, it becomes 4
            }
            break;
        case '÷': //divide
        case '×': //times
        case '-': //minus
        case '+': //plus
            handleMath(symbol);
            break;

    }
} // 'C' symbol resets everything



function init() {
    console.log("hi")
    document
    .querySelector('.calc-buttons')  //Target anything with name; calc-button//
    .addEventListener("click", function (event) { //The event-listener will run a function everytime the user clicks on it
        buttonClick(event.target.innerText); // the function named buttonClick
        });
} //init funtion: 1/User clicks on a querySelector('.calc-bitton') 2/addEventLister will run another function asigned to that button 3/The function buttonClick is run 

function rerebder() {
    screen.innerText = buffer
} //  7/resets displayed number at 0

init();