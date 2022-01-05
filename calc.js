const KEYS_DIV = document.getElementById('calc-keys');
const CALC_DISPLAY = document.getElementById('calc-text');
const MAX_SIZE = 25;
let decimal = false;
let isResult = false;
let prevValue = undefined;
let action = undefined;

CALC_DISPLAY.addEventListener('input', (e) => {
    if(isNaN(e.target.value))
        deleteFromDisplay();
});

KEYS_DIV.addEventListener('click', (e) =>{
    if(e.target.tagName == "BUTTON"){
        switch(e.target.id){
            case 'key-reset':
                clearDisplay();
                resetAction();
                break;           
            case 'key-result':
                calcResult();
                break;
            case 'key-delete':
                deleteFromDisplay();
                break;
            case 'key-decpoint':
                if(decimal)
                    break;
                decimal = true;
            case '':
                writeToDisplay(e);
                break;
            default:
                saveAction(e);                
        }       
    }          
});

function displayError(){
    CALC_DISPLAY.value = 'ERROR';
    setTimeout(clearDisplay, 2500);
}
function clearDisplay(){
    CALC_DISPLAY.value = '';
    decimal = false;
}
function resetAction(){
    decimal = false;
    isResult = false;
    action = undefined;
    prevValue = undefined;
}
function writeToDisplay(e){
    if(CALC_DISPLAY.value.length > MAX_SIZE)
        return;
    if(isResult){
        CALC_DISPLAY.value = e.target.textContent;
        isResult = false;
    }
    else
        CALC_DISPLAY.value += e.target.textContent;
}
function deleteFromDisplay(){
    let calcText = CALC_DISPLAY.value;
    if(calcText[calcText.length - 1] == '.')
        decimal = false;
    CALC_DISPLAY.value = calcText.slice(0,calcText.length-1);
}
function saveAction(e){
    let temp = e.target.id.slice(4,e.target.id.length);
    if(temp == 'sub' && CALC_DISPLAY.value == ''){
        CALC_DISPLAY.value = '-';
        isResult = false;
    }
    else{
        prevValue = parseFloat(CALC_DISPLAY.value);
        action = temp;
        clearDisplay();
    }
}
function calcResult(){
    if(CALC_DISPLAY.value == 'ERROR')
        return;
    if(action === undefined || CALC_DISPLAY.value == '' 
    || CALC_DISPLAY.value =='.')
        displayError();
    else{
        let result;
        let currentValue = parseFloat(CALC_DISPLAY.value);
        switch(action){
            case 'add':
                result = prevValue + currentValue;
                break;
            case 'sub':
                result = prevValue - currentValue;
                break;
            case 'mul':
                result = prevValue * currentValue;
                break;
            case 'div':
                if(currentValue == 0){
                    displayError();
                    return;
                }
                result = prevValue / currentValue;
        }
        CALC_DISPLAY.value = result.toFixed(2);
        isResult = true;
        decimal = false;
        action = undefined;
    }
}

const CSS_ROOT = document.querySelector(':root');
const RADIO_BUTTONS = document.getElementsByClassName('radio-select');
class Theme{
    constructor(main,keypad,display,resultKey,resultShadow,specialKey,specialShadow
        ,regKey,regShadow,textColor, toggleText){
            this.main = main;
            this.keypad = keypad;
            this.display = display;
            this.resultKey = resultKey;
            this.resultShadow = resultShadow;
            this.specialKey = specialKey;
            this.specialShadow = specialShadow;
            this.regKey = regKey;
            this.regShadow = regShadow;
            this.textColor = textColor;
            this.toggleText = toggleText;
    }
    setTheme(){
        CSS_ROOT.style.setProperty('--main-background', this.main);
        CSS_ROOT.style.setProperty('--keypad-background', this.keypad);
        CSS_ROOT.style.setProperty('--display-background', this.display);
        CSS_ROOT.style.setProperty('--result-key', this.resultKey);
        CSS_ROOT.style.setProperty('--special-key', this.specialKey);
        CSS_ROOT.style.setProperty('--reg-key', this.regKey);
        CSS_ROOT.style.setProperty('--result-shadow', this.resultShadow);
        CSS_ROOT.style.setProperty('--special-shadow', this.specialShadow);
        CSS_ROOT.style.setProperty('--reg-shadow', this.regShadow);
        CSS_ROOT.style.setProperty('--theme-text', this.textColor);
        CSS_ROOT.style.setProperty('--toggle-text', this.toggleText);
    }
}

Array.from(RADIO_BUTTONS).forEach(function(element) {
    element.addEventListener('click', (e) =>{
        switch(e.target.id){
            case 'theme-1':
                const theme1 = new Theme(
                    'hsl(222, 26%, 31%)',
                    'hsl(223, 31%, 20%)',
                    'hsl(224, 36%, 15%)',
                    'hsl(6, 63%, 50%)',
                    'hsl(6, 70%, 34%)',
                    'hsl(225, 21%, 49%)',
                    'hsl(224, 28%, 35%)',
                    'hsl(30, 25%, 89%)',
                    'hsl(28, 16%, 65%)',
                    'hsl(221, 14%, 31%)',
                    'white'
                );
                theme1.setTheme();
                break;
            case 'theme-2':
                const theme2 = new Theme(
                    'hsl(0, 0%, 90%)',
                    'hsl(0, 5%, 81%)',
                    'hsl(0, 5%, 87%)',
                    'hsl(25, 98%, 40%)',
                    'hsl(25, 99%, 27%)',
                    'hsl(185, 42%, 37%)',
                    'hsl(185, 58%, 25%)',
                    'hsl(45, 7%, 89%)',
                    'hsl(35, 11%, 61%)',
                    'hsl(60, 10%, 19%)',
                    'black'
                );
                theme2.setTheme();
                break;
            case 'theme-3':
                const theme3 = new Theme(
                    'hsl(268, 75%, 9%)',
                    'hsl(268, 71%, 12%)',
                    'hsl(268, 71%, 12%)',
                    'hsl(176, 100%, 44%)',
                    'hsl(177, 92%, 70%)',
                    'hsl(281, 89%, 26%)',
                    'hsl(285, 91%, 52%)',
                    'hsl(268, 47%, 21%)',
                    'hsl(290, 70%, 36%)',
                    'hsl(52, 100%, 62%)',
                    'white'
                );
                theme3.setTheme();
                break;
        }
    });
});
