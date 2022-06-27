
const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator__keys")
const display = document.querySelector('.calculator__display')


keys.addEventListener('click', e => {
    console.log("click")
 if (e.target.matches("button")) {

    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType

      // Remove a classe .is-depressed de todas as teclas
      Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

    
    
    if (!action) {
        console.log('number key!')
        if (displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent
          } else {
            display.textContent = displayedNum + keyContent
          }
        }
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        console.log('operator key!')
        key.classList.add('is-depressed')
          // Adiciona um atributo personalizado
      calculator.dataset.previousKeyType = 'operator'

      calculator.dataset.firstValue = displayedNum
      calculator.dataset.operator = action

      }
      if (action === 'negative') {
        console.log('negative key!')
      }
      
      if (action === 'percent') {
        console.log('percent key!')
      }
      
      if (action === 'decimal') {
        console.log('decimal key!')
        display.textContent = displayedNum + '.'
      }
      
      if (action === 'clear') {
        console.log('clear key!')
      }
      
      if (action === 'calculate') {
        
        console.log('equal key!')
        const firstValue = calculator.dataset.firstValue
  const operator = calculator.dataset.operator
  const secondValue = displayedNum
  
  display.textContent = calculate(firstValue, operator, secondValue)

 
      }

    
 }



})

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

