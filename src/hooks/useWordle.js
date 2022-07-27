import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) //guess as array
    const [history, setHistory] = useState([]) //guess as string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) //{a: 'green'}

    //format a guess into array of objects [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: 'grey'}
        })

        //letters in correct positon
        formattedGuess.forEach((letter, i) => {
            if (solutionArray[i] === letter.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        //letters in solution but incorrect position
        formattedGuess.forEach((letter, i) => {
            if (solutionArray.includes(letter.key) && letter.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }

    //add new guess to guess state
    //update isCorrect if the guess is correct
    //add 1 to turn state
    const addGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prev) => {
            let newGuesses = [...prev]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prev) => {
            return [...prev, currentGuess]
        })
        setTurn((prev) => {
            return prev + 1
        })
        setUsedKeys((prev) => {
            let newKeys = {...prev}

            formattedGuess.forEach(letter => {
                const currentColor = newKeys[letter.key]

                if (letter.color === 'green') {
                    newKeys[letter.key] = 'green'
                    return
                }
                if (letter.color === 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'yellow'
                    return
                }
                if (letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[letter.key] = 'grey'
                    return
                }
            });

            return newKeys
        })
        setCurrentGuess('')
    }

    //handle keyup event & tract current guess
    //add new guess on enter
    const handleKeyup = ({key}) => {
        if (key === 'Enter') {
            if (currentGuess.length !== 5) return //guess is not 5 characters
            if (turn > 5) return //all guess are used up
            if (history.includes(currentGuess)) return //the guess was tried before
           
            const formatted = formatGuess()
            addGuess(formatted)
        }
        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }
        if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
            setCurrentGuess((prev) => {
                return prev + key
            })
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}

}

export default useWordle