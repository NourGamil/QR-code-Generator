// Example using react-color-palette
    import React, { useState } from 'react';
    import { ColorPicker, useColor } from 'react-color-palette';
    import "react-color-palette/css"; // Import the CSS for react-color-palette

    function ColorPickerComponent({ onDataReceived }) {
      const [color, setColor] = useColor("hex", "#121212"); // Initial color state
        const sendDataToParent = (event) => {
        // const valueToSend = event;
        // onDataReceived(valueToSend); // Call the parent's callback function
      };
      const syncBothFunction = (event)=>{
        setColor(event);
        onDataReceived(event);
      }
      return (
        <div>
          <ColorPicker height={200} color={color} onChange={syncBothFunction} />
          <p>Selected Color: {color.hex}</p>
        </div>
      );
    }

    export default ColorPickerComponent;