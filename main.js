const displayText = document.querySelector('.display p');
displayText.textContent = "0";
const buttons = document.querySelectorAll('button');
let currentText = '0';
let operated = false;

function add(a,b){
    return a+b;
}

function diff(a,b){
    return a-b;
}

function product(a,b){
    return a*b;
}

function division(a,b){
    return (b == 0)? 'Error':Math.round(a*1000000000/b)/1000000000;
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
    i=str.indexOf('%');
    if( i >=0 )
    str = percentage( operate(str.slice(0,i))) + str.slice(i+1);
    else {
        i=str.indexOf('+');
        if( i >=0 )
        str = add( operate(str.slice(0,i)) , operate(str.slice(i+1)) );
        else {
            i=str.indexOf('-');
            if( i >=0 )
            str = diff( operate(str.slice(0,i)) , operate(str.slice(i+1)) );
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
    return '' + division(str,1);
}

function addText(a){

    if(a == 'Clear') {
    clearDisplay();
    return;
    }

    if(a == '='){ console.log(currentText + 'top');
    currentText = displayText.textContent = '' + operate(currentText);

    if(displayText.textContent == 'NaN')
    displayText.textContent = 'Not defined';

    return;
    }
    else if(a == 'CE'){
              
        if(displayText.textContent.length == 1){
        clearDisplay();
        return;
        }
        else
            if(displayText.textContent[displayText.textContent.length-1] == ' ')
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
    if(['x','÷','+','-','='].includes(t)  && ['x','÷','+','-'].includes(currentText[currentText.length -1]) )
    return;

    if(t == '%' && ['x','÷','+','-'].includes(currentText[currentText.length -1]))
    addText('CE');

    addText(t);
}

buttons.forEach( button => {
    button.addEventListener('click', (e) => {
        entry(e.target.textContent);
    });

});

window.addEventListener('keydown', (e) => {
      
        if(['+','-','=','%','1','2','3','4','5','6','7','8','9','0','.'].includes(e.key))
        entry(e.key);

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

