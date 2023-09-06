import { useState,useCallback,useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [pass, setPass] = useState("");
  const [length, setLen] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);

  const passgen=useCallback(()=>{
    let pas="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(num) str+="1234567890"
    if(char) str+="!@#$%^&*(){}[]"
    for(let i=0;i<length;i++)
    {
      let ln=Math.floor(Math.random()*str.length+1)
      pas+=str.charAt(ln);
    }
    setPass(pas);
  },[length,num,char])

  useEffect(()=>{passgen()},[length,num,char,passgen])
  
  const copy=useRef(null)

  const copyToClip=useCallback(()=>{
    copy.current?.select();
    navigator.clipboard.writeText(`${pass}`);
  },[pass])


  return (
    <>
      <h1>Password Generator</h1>
      <div className="contents">
        <div className="text">
          <input type="text" value={pass} readOnly ref={copy}/>
          <button onClick={copyToClip}>copy</button>
        <div className="choice">
          <input type="range"
          min={8}
          max={50}
          value={length}
          onChange={(e)=>{setLen(e.target.value)}}/><label>{length}</label>
          <input type="checkbox"
          onChange={()=>{setNum((prev)=>!prev)}}/><label>Numbers</label>
          <input type="checkbox"
           onChange={()=>{setChar((prev)=>!prev)}}/><label>Special character</label>
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
