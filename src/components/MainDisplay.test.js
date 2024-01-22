import React from 'react';
import { render, screen } from '@testing-library/react';
import QRCodeComponent from './QRcodeComponent';


describe("QRCodeComponent", () => {
    let sessionId = "newSessionId";

    it("renders the component with title and QRCode", () => {
        render(<QRCodeComponent sessionId={ sessionId } title="This is QRCode" /> );

        const title = screen.getByText('This is QRCode');
        expect(title).toBeInTheDocument();

        const QRCode = screen.getByTestId('qrcode');
        expect(QRCode).toBeInTheDocument();
      });
})