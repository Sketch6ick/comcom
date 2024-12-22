import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';  // แก้ไขให้ import ถูกต้อง

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// เรียกใช้ฟังก์ชัน reportWebVitals
reportWebVitals();  // ฟังก์ชันนี้จะใช้ในการตรวจสอบ Web Vitals หากต้องการ
