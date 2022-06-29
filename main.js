
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector(".calculator__keys")
const display = document.querySelector('.calculator__display')


// click event 

keys.addEventListener('click', e => {
 if (e.target.matches("button")) {

    const key = e.target  // tecla
    const action = key.dataset.action //action
    const keyContent = key.textContent
    const displayedNum = display.textContent // numero que está no display
    const previousKeyType = calculator.dataset.previousKeyType // numero anterior

       // Remove a classe .is-depressed de todas as teclas
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
    
    //  number keys
    if (!action) {
      
      if (displayedNum === '-0'){
        display.textContent = keyContent * (-1)
      }
      else if(
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent
      } 
      else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }

    // add, substract, multiply or divide keys
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        console.log('operator key!')

        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
        
        if (
          firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
        ) {
          const calcValue = calculate(firstValue, operator, secondValue)
          display.textContent = calcValue
          calculator.dataset.firstValue = calcValue
        } else {
          calculator.dataset.firstValue = displayedNum
        }
        
        key.classList.add('is-depressed')
        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.operator = action
        
      }

  

    //decinal key
      
    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = '0.'
      }
    
      calculator.dataset.previousKeyType = 'decimal'
    }
       
       //clear key
       if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
      }

       if (action === 'clear') {
        if (key.textContent === 'AC') {
          calculator.dataset.firstValue = ''
          calculator.dataset.modValue = ''
          calculator.dataset.operator = ''
          calculator.dataset.previousKeyType = ''
        } else {
          key.textContent = 'AC'
        }
      
        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear'
      }

    //equal key
      
   
      if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
      
        if (firstValue) {
          if (previousKeyType === 'calculate') {
            firstValue = displayedNum
            secondValue = calculator.dataset.modValue
          }
        
          display.textContent = calculate(firstValue, operator, secondValue)
        }
      
        // Set modValue attribute
        calculator.dataset.modValue = secondValue
        calculator.dataset.previousKeyType = 'calculate'
      }
    

        // negative keys

        if (action === 'negative') {
          console.log('negative key!')
        
          
          
          if(previousKeyType === 'operator'){
            display.textContent = "-" + 0
          }else{
            display.textContent  = displayedNum * (-1)
          }

          calculator.dataset.previousKeyType = 'negative'
        }
  
      //percent key
        
        if (action === 'percent') {
          console.log('percent key!')
          calculator.dataset.previousKeyType = 'percent'
        }
      
 }
})

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
}

/*  este bloco foi refatorado
const calculate = (n1, operator, n2) => {
    let result = ''
    
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)
    }
    
    return result
  }
*/
