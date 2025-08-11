// Example using react-color-palette
    import React, { useState } from 'react';
    import { ColorPicker, useColor } from 'react-color-palette';
    import "react-color-palette/css"; // Import the CSS for react-color-palette

    function ColorPickerComponent({onColorChange}) {
      const [color, setColor] = useColor("hex", "#121212"); // Initial color state
      const bothColorFun = (event)=>{
        setColor(event)
        onColorChange(event.hex)
      }
      return (
        <div className='colorPickerContainer'>
          <ColorPicker height={200} color={color} onChange={bothColorFun} />
                  <div className="anchorDiv">
                    <p className="">Designed by</p> 
                      <a className="linkToPort" href="https://nourgamil.github.io/My-portfolio/">Nour Gamil</a>
                      <a className="linkToPort" href="https://nourgamil.github.io/My-portfolio/"><img src="images/main icon.ico" alt="" /></a>
                    
                </div>
        </div>
      );
    }

    export default ColorPickerComponent;