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
    return (b == 0)? 'Error':Math.round(a*10000000000000/b)/10000000000000;
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
    return division(str,1);
}

function addText(a){
    if(a == '='){
    currentText = displayText.textContent = operate(currentText);

    if(displayText.textContent == 'NaN')
    displayText.textContent = 'Not Defined';

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
    }else{
       
    if(['x','÷','+','-'].includes(a))
        displayText.textContent += ' ' + a + ' ';
    else if(currentText == '0')
            displayText.textContent = a;
        else
            displayText.textContent += a;
    
    if(displayText.textContent != '0')
    currentText += a;
    
    }

    if(a == 'Clear')
    clearDisplay();
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

