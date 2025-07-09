import { useState } from 'react';
import './Qrcode.css';
export const Qrcode = () => {
  const [img,setImg]=useState("");
  const [loading ,setLoading]=useState(false);
  const [data,setData]=useState("");
  const [size,setSize]=useState("");
  async function gemerateQRCode(){
    setLoading(true);
    try{
      const url =`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
      setImg(url);
    }
    catch(err){
      console.error("Error generating QR code:", err);
    }
    finally{
      setLoading(false);
    }
  }
  function downloadQRCode(){
    fetch(img)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(err => {
        console.error("Error downloading QR code:", err);
      });
  }
  return (
    <div className="app-container">
        <h1>QR Code Generator</h1>
        {loading && <p>Please Wait</p>}
       { img && <img src={img} alt="" />}
        <div>
        <label htmlFor="dataInput" className='input-label'>
            Data for QR code:
        </label>
        <input
          type="text"
          id='dataInput'
          placeholder='data for QR code'
          value={data}
          onChange={e => setData(e.target.value)}
          required
        />
        <label htmlFor="sizeInput" className='input-label'>
            Image Size (eg. 150px):
        </label>
        <input
          type="text"
          id='sizeInput'
          placeholder='Enter Image Size'
          value={size}
          onChange={e => setSize(e.target.value)}
        />
        <button className='generate-button' disabled={loading} onClick={gemerateQRCode}>Generate QR code</button>
        <button className='download-button'  onClick={downloadQRCode}>Download QR code</button>
    </div>
    <p>Designed By Me</p>
    </div>
  )
}

