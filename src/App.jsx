import { useState , useCallback , useEffect , useRef } from 'react'


function App() {
  const [length , setLength] = useState(6) ;
  const[numAllowed , setNumAllowed] = useState(false); 
  const [charAllowed , setCharAllowed] = useState(false) ;
  const[password , setPassword] = useState(" ");
  const[copied , setCopied] = useState(false) ;

  const passwordRef = useRef(null) ;

  const generatePassword = useCallback(() =>{
    let pass= "" 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 

    if(numAllowed) str +="0123456789" 
    if(charAllowed) str+= "!@#$%^&*()~`':;<>,/?\|[]{}-=_+"

    for(let i = 1 ; i <= length ; i++) {

      let char = Math.floor(Math.random() * str.length + 1 )
      pass += str.charAt(char) 
    }
    setPassword(pass) 

  } , [length , numAllowed , charAllowed , setPassword])


  const copyPassToClipboard = useCallback(()=>{
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0,20) ;
      window.navigator.clipboard.writeText(password) ;

      setCopied(true) ;
      setTimeout(()=>{
        setCopied(false) ;
      } , 1000)
      
  } , [password])

  useEffect(()=>{
      generatePassword();

  } , [length , numAllowed , charAllowed , generatePassword])





  return (
    <>
    
    <div className = 'w-full max-w-md mx-auto shadow-md rounded-lg my-8 px-4 py-3 text-orange-500 bg-gray-700'>
    <h1 className = 'text-white text-center my-3'> Password Generator</h1>
    <div className = 'flex shadow rounded-lg overflow-hidden mb-4 '>
      <input
      type='text' 
      value={password} 
      className='outline-none w-full py-1 px-3 text-black bg-white'
      placeholder='password' 
      readOnly
      ref = {passwordRef}
      />

      <button onClick={copyPassToClipboard} className='outline-none py-3 px-2 bg-blue-700 text-white shrink-0'>copy</button>
      {copied && (
  <span className="text-white text-sm ml-2 mt-1 animate-fade-in">
    Copied to clipboard!
  </span>
)}
    </div>

    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
        type='range'
        min={6}
        max={100} 
        value={length}
        className='cursor-pointer'
        onChange={(e) => {
            setLength(e.target.value)
        }}
        />
        <label>Length : {length} </label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
          type='checkbox'
          defaultChecked = {numAllowed}
          id='numberInput' 
          onChange = {
            () =>{
              setNumAllowed((prev)=> !prev) ;
            }
          }
        />
        <label htmlFor='numberInput'>Number</label>
      </div>

      <div className='flex items-center gap-x-1'>

        <input
          type='checkbox'
          defaultChecked={charAllowed}
          id = 'charInput'
          onChange={() =>{
            setCharAllowed((prev) => !prev) ;
          }}
        />
        <label htmlFor='charInput'>Characters</label>
      </div>
    </div>

    </div>

    </>
  )
}

export default App
