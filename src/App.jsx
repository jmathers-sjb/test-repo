import { useState } from 'react'
import './App.css'

const BUTTONS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]

export default function App() {
  const [display, setDisplay] = useState('0')
  const [operand, setOperand] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    if (!display.includes('.')) setDisplay(display + '.')
  }

  const clear = () => {
    setDisplay('0')
    setOperand(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const toggleSign = () => setDisplay(String(parseFloat(display) * -1))

  const percent = () => setDisplay(String(parseFloat(display) / 100))

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default: return b
    }
  }

  const handleOperator = (op) => {
    const current = parseFloat(display)
    if (operand !== null && !waitingForOperand) {
      const result = calculate(operand, current, operator)
      setDisplay(String(result))
      setOperand(result)
    } else {
      setOperand(current)
    }
    setOperator(op)
    setWaitingForOperand(true)
  }

  const handleEquals = () => {
    if (operator === null || operand === null) return
    const current = parseFloat(display)
    const result = calculate(operand, current, operator)
    setDisplay(String(result))
    setOperand(null)
    setOperator(null)
    setWaitingForOperand(true)
  }

  const handleButton = (btn) => {
    if ('0123456789'.includes(btn)) return inputDigit(btn)
    if (btn === '.') return inputDecimal()
    if (btn === 'C') return clear()
    if (btn === '±') return toggleSign()
    if (btn === '%') return percent()
    if (btn === '=') return handleEquals()
    return handleOperator(btn)
  }

  const isOperator = (btn) => ['÷', '×', '−', '+'].includes(btn)
  const isFn = (btn) => ['C', '±', '%'].includes(btn)

  return (
    <div className="calculator">
      <h1 className="title">Calculator</h1>
      <div className="display">
        <span>{display}</span>
      </div>
      <div className="buttons">
        {BUTTONS.map((row, ri) => (
          <div key={ri} className="row">
            {row.map((btn) => (
              <button
                key={btn}
                className={`btn${btn === '0' ? ' wide' : ''}${isOperator(btn) ? ' operator' : ''}${isFn(btn) ? ' function' : ''}`}
                onClick={() => handleButton(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
