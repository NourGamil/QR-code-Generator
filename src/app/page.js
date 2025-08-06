"use client"
// pages/index.js or a separate component

import React, { useState,useRef,useEffect } from 'react';
    import { useQRCode } from 'next-qrcode';
    import html2canvas from 'html2canvas';


    function QRCodeGenerator() {
      const [qrValue, setQrValue] = useState('https://www.example.com');
      const { Image } = useQRCode();
      const [count, setCount] = useState(0);
              const options = {
          margin:1,
          filename: 'my-document.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 1, scrollX: 0, scrollY: 0, width: 320},
        
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
      const contentRef = useRef(null);
      let html2pdfInstance;

      useEffect(() => {
        // Import html2pdf.js only on the client-side
        import('html2pdf.js').then((module) => {
          html2pdfInstance = module.default;
        });
      }, [count]); // Empty dependency array ensures this runs once after mount

      const generatePdf = async () => {
        if (html2pdfInstance && contentRef.current) {
          await html2pdfInstance().from(contentRef.current).set(options).save('document.pdf');
        }
      };

      const handleExport = async () => {
  const elementToCapture = document.getElementById('my-element-id'); // Target the element to convert
  if (elementToCapture) {
    const canvas = await html2canvas(elementToCapture);
    const image = canvas.toDataURL('image/png'); // Get data URL of the PNG
    
    // Create a link to download the image
    const link = document.createElement('a');
    link.href = image;
    link.download = 'my-exported-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
      return (
        <div className='main'>
          <div className='container'>
          
            <div ref={contentRef} id='my-element-id'>
            <Image
              text={qrValue === "" ||qrValue === null || qrValue === undefined ? ' ' : qrValue}
              options={{
                type: 'image/jpeg',
                quality: 1,
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 320,
                color: {
                  dark: '#000',
                  light: '#FFFFFF',
                },
              }}
            />
          </div>
          <div className='addsContainer'>
            
          <h1 className='qrtitle'>QR Code</h1>

          <div className='inputContainer'>
                      <label htmlFor="qrcodeInput" className='pointer'>URL</label>
          <input
            required
            className='pointer mainInput'
            type="text"
            id='qrcodeInput'
            value={qrValue}
            onChange={(e) => setQrValue(e.target.value)}
            placeholder="Enter text or URL"
          />
          </div>

          <div className='btnsContainer'>
          <button onClick={(event) => {
      generatePdf(event);
      setInterval( ()=> {setCount((c) => c + 1)}, 1000);
    }} className='pointer'>Generate PDF</button>
          <button onClick={handleExport} className='pointer'>Generate PNG</button>
          </div>

          </div>
          </div>
        </div>
      );
    }
export default QRCodeGenerator;