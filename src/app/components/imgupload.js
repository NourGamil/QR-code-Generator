import React, { useState } from 'react';
import Image from 'next/image';



export default function UploadPage({ onButtonClick,mainColor }) {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real application, you would upload this file to a server
      // and get a public URL back. For demonstration, we use a FileReader.
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // This would be the URL from your backend/CDN
      };
      reader.readAsDataURL(file); // Reads file as base64 for immediate display (not for production storage)
    }
  };
      return (
    <div >
      <div className="thirdContainer" id='my-element-thirDid' style={{background:mainColor}}>
      {imageUrl && (
        <div>
          <div className='imgInputContainer'>
          <Image
            src={imageUrl}
            alt=""
            width={120} // Provide appropriate dimensions
            height={120} // Provide appropriate dimensions
            layout="responsive" // Or "fill" with parent positioning
            className='imageUserInput'
          />
          </div>
        </div>
      )}
      </div>
      <div className='thirdContainerAdds'>
        <label htmlFor="inputImg" className='pointer inputImgTitle'>Upload your logo <img src="images/imgUpload.svg" alt="" style={{width:40,height:40}} /></label>
        <input type="file" accept="image/*" onChange={handleFileChange} className='inputImg pointer' id='inputImg'/>
        <button onClick={onButtonClick} className='pointer'>Generate PNG</button>
        </div>
    </div>
      );
    }