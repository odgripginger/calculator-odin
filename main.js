const displayText = document.querySelector('.display p');
displayText.textContent = "0";
const buttons = document.querySelectorAll('button');
let currentText = '0';
let operated = false;

function add(a,b){
    return a- (-b);
}

function diff(a,b){
    return a-b;
}

function product(a,b){
    return a*b;
}

function division(a,b){
    return a/b;
}

function percentage(a){
    return a/100;
}

function clearDisplay(){
    displayText.textContent = '0';
    currentText = '0';
}

function operate(str){
    let i;
    i=str.indexOf('-');
    if( i >=0 )
    str = diff( operate(str.slice(0,i)) , operate(str.slice(i+1)) );
    else {
        i=str.indexOf('+');
        if( i >=0 )
        str = add( operate(str.slice(0,i)) , operate(str.slice(i+1)) );
        else {
            i=str.indexOf('%');
            if( i >=0 )
            str = operate (percentage( operate(str.slice(0,i)) ) + str.slice(i+1));
            else {
                i=str.indexOf('÷');
                if( i >=0 )
                str = division( operate(str.slice(0,i)) , operate(str.slice(i+1)) );
                else{
                    i=str.indexOf('x');
                    if( i >=0 )
                    str = product( operate(str.slice(0,i)) , operate(str.slice(i+1)) );
                 }}}}
    if((1*str) != NaN)
    return '' + str;
}

function addText(a){

    if(a == 'Clear') {
    clearDisplay();
    return;
    }

    if(displayText.textContent == "Not defined" || displayText.textContent == "Infinity")
    clearDisplay();

    if(a == '='){ 
    currentText = displayText.textContent = Math.round(operate(currentText)*1e11) /1e11;

    if(displayText.textContent == 'NaN')
    displayText.textContent = 'Not defined';

    return;
    }else if(a == 'CE'){
              
        if(displayText.textContent.length == 1){
        clearDisplay();
        return;
        }
        else if(displayText.textContent[displayText.textContent.length-1] == ' ')
                displayText.textContent = displayText.textContent.slice(0, displayText.textContent.length -3 );
            else
                displayText.textContent = displayText.textContent.slice(0, displayText.textContent.length -1 );
        
        
        currentText = currentText.slice(0,currentText.length-1);
    
        return;

    }else   if(['x','÷','+','-'].includes(a))
            displayText.textContent += ' ' + a + ' ';
                else if(currentText == '0')
                    displayText.textContent = a;
                    else
                    displayText.textContent += a;
    
    if(displayText.textContent != '0')
    currentText += a;

} 

function entry (t){
    let checkIndex = currentText.length -1;
    if(['x','÷','+','-','='].includes(t)  && ['x','÷','+','-'].includes(currentText[checkIndex]) )
    return;

    if(t == '%' && ['x','÷','+','-'].includes(currentText[checkIndex]))
    addText('CE');

    while(['x','÷','+','-','.'].includes(currentText[checkIndex]) == false && checkIndex > 0) {
        checkIndex--;
    }
    console.log(currentText);
    if (currentText[checkIndex] == '.' && t == '.')
    return;

    addText(t);
}

buttons.forEach( button => {
    button.addEventListener('click', (e) => {
        if(e.screenX != 0)
        entry(e.target.textContent);
    });

});

window.addEventListener('keydown', (e) => {
      
        if(['+','-','=','%','1','2','3','4','5','6','7','8','9','0','.'].includes(e.key))
        entry(e.key);
        console.log(e);

        switch(e.key){
            case '*': entry('x');
            break;

            case '/': entry('÷');
            break;

            case 'Enter': entry('=');
            break;

            case 'Escape': entry('Clear');
            break;

            case 'Backspace': entry('CE');
        }
});

