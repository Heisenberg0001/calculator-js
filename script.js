const numbersNDot = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "decimal" ];
const buttons = document.getElementsByTagName('button');
const inputDiv = document.getElementById('display');
const outputDiv = document.getElementsByClassName('output')[0];
const dot = document.getElementById('decimal');
const zero = document.getElementById('zero');
const equals = document.getElementById('equals');

let input = '';
let output = '';
let tempNumber = '';
let result = [];
let pushOrNot = true;


function setKeyListeners() {
    for (let i = 0; i < buttons.length; i++) {
        if ( buttons[i].id === 'clear') {

            buttons[i].addEventListener('mousedown', clear);
        }
        else if ( buttons[i].id === 'equals' ) {

            buttons[i].addEventListener('mousedown', calculate);
        } else {
            if ( numbersNDot.includes(buttons[i].id) ) {
                addMouseDownEvent( buttons[i], ( event ) => { concatInput( event ) });
            } else {
                addMouseDownEvent( buttons[i], ( event ) => { setInput( event ) });
            }
        }
    }
}
function enableButton( button, trueOrFalse ) {
    button.disabled = !trueOrFalse;
}
function clear() {
    input = '';
    output = '';
    setInnerHTML(0);
    result = [];

    enableButton( dot,true );
    enableButton( equals, true );
}
function calculate() {

    let index = 0;

    result.push(Number(tempNumber));
    tempNumber = '';

    while ( result.length > 1 ) {

        if ( result.includes("x") ) {
            index = result.indexOf("x");
            result[index - 1] = multiply(result[index - 1], result[index + 1]);
            result.splice(index, 2);
        }
        else if ( result.includes("/") ) {
            index = result.indexOf("/");
            result[index - 1] = divide(result[index - 1], result[index + 1]);
            result.splice(index, 2);
        }
        else if ( result.includes("-") ) {
            index = result.indexOf("-");
            result[index - 1] = subtract(result[index - 1], result[index + 1]);
            result.splice(index, 2);
        }
        else {
            index = result.indexOf("+");
            result[index - 1] = add(result[index - 1], result[index + 1]);
            result.splice(index, 2);
        }
    }

    output += "=" + result[0];
    input = result[0];
    setInnerHTML( input, output );
    console.log("Result: " + result);

    enableButton( equals, false );
}
function add( a, b ) {
    return a + b;
}
function subtract( a, b ) {
    return a - b;
}
function multiply( a, b ) {
    return a * b;
}
function divide( a, b ) {
    return a / b;
}
function setInput( event ) {
    enableButton( equals, true );

    if ( /=/.test(output) ) {
        debugger;
        output = result[0] + event.target.innerHTML;
        input = event.target.innerHTML;
        setInnerHTML(input, output);
        result.push(event.target.innerHTML);
    } else {

        if ( pushOrNot ) {
            result.push(Number(tempNumber));
            pushOrNot = false;
        }

        if (/[-+/x]$/.test(output)) {
            output = output.split('');
            output[output.length - 1] = event.target.innerHTML;
            input = event.target.innerHTML;
            output = output.join('');

            result[result.length - 1] = event.target.innerHTML;
        } else {
            input = event.target.innerHTML;
            output += event.target.innerHTML;
            result.push(event.target.innerHTML);
        }

        setInnerHTML( input, output );
    }

    enableButton(dot, true);
}
function concatInput( event ) {

    if ( /=/.test(output) ) {
        clear();
    }

    if ( /^0/.test(input) && event.target.innerHTML === '0' ) {
        setInnerHTML( 0, 0 );
    } else {
        if ( event.target.innerHTML === '.' ) {
            enableButton(dot, false);
        }

        if ( !input || /[-+x=/]/.test(input) ) {
            input = event.target.innerHTML;
        } else {
            input += event.target.innerHTML;
        }

        pushOrNot = true;
        tempNumber = input;
        output += event.target.innerHTML;
        setInnerHTML( input, output );
    }
}
function setInnerHTML( input = '', output = '') {
    inputDiv.innerHTML = input;
    outputDiv.innerHTML = output;
}
function addMouseDownEvent( element, callback ) {
    element.addEventListener('mousedown', callback )
}
function onStartup() {
    inputDiv.innerHTML = '0';
    setKeyListeners();
}

onStartup();
