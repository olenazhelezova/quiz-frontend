import React from 'react'
import QRCode from "react-qr-code";

const QRCodeComponent = ({ sessionId, title }) => {
    return (
      <div className="qr-code-section">
        <h3>{title}</h3>
        <QRCode value={sessionId} data-testid="qrcode" />
      </div>
    );
  };
  
export default QRCodeComponent;