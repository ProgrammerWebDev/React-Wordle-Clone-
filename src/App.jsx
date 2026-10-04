import { useState,createContext,useContext, useEffect } from 'react'
import './App.css'
import { Sun,Moon } from 'lucide-react'


const ThemeContext = createContext()
const ArrayContext = createContext()

function App() {

  const [currentRow, setRow] = useState(0)
  const [currentIndex, setIndex] = useState(0)
  let [isDarkMode, setIsDarkMode] = useState(false)
  const wordle = "WORDL"
const [gridArray, setGridArray] = useState([
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]);
const [submittedRows, setSubmittedRows] = useState([]);

useEffect(() =>{


const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"   

const handleInput = (event) =>{
const letter = event.key.toUpperCase()


const newGrid = gridArray.map((row) => [...row]);
if (event.repeat) return;

if (event.key === "Backspace" ) {


  if (currentIndex >= 0){ 
  if (newGrid[currentRow][currentIndex] == ''){
      setGridArray(newGrid);
      setIndex((prevIndex) => prevIndex + 1)
  }
  else{
    newGrid[currentRow][currentIndex] = '';
    if(currentIndex > 0){
    setIndex((prevIndex) => prevIndex - 1)}
    setGridArray(newGrid);
  }
}

}
if(alphabet.includes(letter)){
  console.log(currentIndex)
  console.log('Key Pressed' + letter)
  if(newGrid[currentRow][4] == ''){
    newGrid[currentRow][currentIndex] = letter;
      setGridArray(newGrid);
  }

  

  if(currentIndex < 4){
    setIndex((prevIndex) => prevIndex + 1)
  }
}
        if(event.key == "Enter"){
          if (currentIndex < 4) return;
          setSubmittedRows((prev) => [...prev, currentRow]);
          if (gridArray[currentRow].join('') === wordle){
            setTimeout(2000)
            alert("You Win!")
          }
          else if(currentRow == 4){
            alert("You Lose! The word was " + wordle)
          }

          else{
          setIndex(0)
          setRow((prevRow) => prevRow + 1)
          
        }
      }

        

} 
window.addEventListener('keydown', handleInput);
return () => {
    window.removeEventListener('keydown', handleInput);
  }
},[currentRow, currentIndex, gridArray]);

function getTileBg(letter,index,rowIndex){
  if (!submittedRows.includes(rowIndex) || !letter) {
      return isDarkMode ? 'bg-slate-700' : 'bg-slate-200';
    }
  if (letter === wordle.split('')[index]){
    return 'bg-emerald-600 text-slate-50'
  }
  if(wordle.split('').includes(letter)){
    return 'bg-amber-500 text-slate-50'
  }
  return isDarkMode ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900'
}

return (
<ArrayContext.Provider value={{gridArray,setGridArray,currentRow,setRow,currentIndex,setIndex,setSubmittedRows,submittedRows}}>
<ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
<div className={`p-10 min-h-screen flex flex-col justify-center items-center relative transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
    <ResetGameBtn/>
    <ThemeSwitchButton />
<div className ="grid grid-rows-5 justify-center gap-4 ">
{gridArray.map((row,rowIndex) => (
        <div key={rowIndex} className='flex flex-row gap-4'>
          {row.map((letter, index) => (
          <div className={` ${ getTileBg(letter, index, rowIndex) } w-16 h-16 border-2 border-slate-300 flex items-center justify-center text-lg font-bold `}  key={index}>
              <span>{letter}</span>
          </div>
            )
        )}
        </div>
          
  ) 
)
}
    </div>
  </div>
</ThemeContext.Provider>
</ArrayContext.Provider>
  ) 
}
const  ThemeSwitchButton = () => {
  const {isDarkMode,setIsDarkMode} = useContext(ThemeContext)
  const [isAnimating, setIsAnimating] = useState(false);


    const OnThemeSwitch = () =>{
    setIsDarkMode(isDarkMode => !isDarkMode)
        setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);

    
  } 
  return (
    <button id="toggleButton" className={`py-2 px-2 rounded-lg ${isAnimating ? 'scale-90' : ''} ${isDarkMode ? 'bg-black text-zinc-100 ' :' bg-amber-400 text-zinc-900' } transition-all duration-300 top-6 right-6 absolute`} onClick={OnThemeSwitch}>
      {
        isDarkMode ? (<Moon/>) :  (<Sun/>) 
      }
    </button>
  ) 
}

const ResetGameBtn = () => {
  const { setGridArray,  setRow, setIndex,setSubmittedRows} = useContext(ArrayContext)

  const handleReset = () => {
    const newGrid = Array(5).fill().map(() => Array(5).fill(''));
    setGridArray(newGrid);
    setRow(0);
    setIndex(0);
    setSubmittedRows([]);
    window.location.reload
  }

  return (
    <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 top-6 left-6 absolute" onClick={handleReset}>
      Reset Game
    </button>
  )
}

export default App
