import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [value, setValue] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleSliderChange = (event) => {
    setLength(parseInt(event.target.value));
  };

  const handleIncludeNumbersChange = () => {
    setIncludeNumbers((prevState) => !prevState);
  };
  const handleIncludeCharactersChange = () => {
    setIncludeCharacters((prevState) => !prevState);
  };
  
 
    const generaterandomtext = () => {
      const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const numbers = "123456789";
      const characters = "!@#$%^&*_+|;:,.<>?/~";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * char.length);
        result += char[randomIndex];
      }

      if (includeNumbers) {
        const resultArr = result.split("");
        const addednum = Math.floor(length / 2);
        for (let i = 0; i < addednum; i++) {
          const randomposition = Math.floor(Math.random() * result.length);
          const randomnumbers = numbers[Math.floor(Math.random() * numbers.length)];
          resultArr[randomposition] = randomnumbers;
        }
        result = resultArr.join("");
      }
      if (includeCharacters){
        const resultArr = result.split("");
        const addedchar = Math.floor(length/2);
        for(let i=0;i<addedchar;i++){
          const randomposition = Math.floor(Math.random() * result.length);
          const randomcharacters = characters[Math.floor(Math.random() * characters.length)];
          resultArr[randomposition] = randomcharacters;
        }
        result = resultArr.join("");

      }
      setValue(result);
    };
     useEffect(() => {
    generaterandomtext();
  }, [length, includeNumbers, includeCharacters]);

  return (
    <div className="main_container">
      <div className="title">
        <h1>
          Password Generator
        </h1>
      </div>
      <div>
        <input
          type="text"
          value={value}
          readOnly
          inputMode="none"
          className="input_box"
        />
        <button className="copy_button" onClick={handleCopy}>
          COPY
        </button>
        <button className="generate_button" onClick={generaterandomtext}>
          Generate
        </button>
      </div>

      <div style={{ marginTop: "30px", display: "flex", alignItems: "center", gap: "20px", fontSize: "18px" }}>
        <div>
          <label htmlFor="length-slider" style={{ color: "white", marginLeft: "70px" }}></label>
          <input
            id="length-slider"
            type="range"
            min="8"
            max="20"
            value={length}
            onChange={handleSliderChange}
            style={{ marginLeft: "10px" }}
          />
          <span style={{ color: "white", marginLeft: "15px" }}>Length: {length}</span>
        </div>

        <div>
          <input
            type="checkbox"
            id="toggleFeature"
            checked={includeNumbers}
            onChange={handleIncludeNumbersChange}
            style={{ marginRight: "10px", marginLeft: "80px" }}
          />
          <label htmlFor="toggleFeature">
            Numbers
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="toggleFeature"
            checked={includeCharacters}
            onChange={handleIncludeCharactersChange}
            style={{ marginRight: "10px", marginLeft: "80px" }}
          />
          <label htmlFor="toggleFeature">
            Special characters
          </label>
        </div>
      </div>
    </div>
  );
}
export default App;
