

import React from "react";
import logo from "../assets/UniLogo.webp";

function formatRegNumber(num) {
  const s = num.toString();
  return s.length > 4 ? `${s.slice(0, 4)}-${s.slice(4)}` : s;
}

function DegreeCard({ degree }) {
  const { id, degreeName, major, issuingUniversity, Name, FName, regNumber, dateIssued, isValid } = degree;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${id.toString()}`;

  return (
    <div className="degree-cert">
      <span className="degree-cert-serial">Serial No. {id.toString()}</span>

      <div className="degree-cert-header">
        <h1>Shaheed Benazir Bhutto University, Sheringal</h1>
        <p>Dir Upper, Khyber Pakhtunkhwa, Pakistan</p>
      </div>

      <div className="degree-cert-seal">
        <img src={logo} alt="University seal" />
      </div>

      <p className="degree-cert-line">Having fulfilled all the requirements for the Degree of</p>
      <h2 className="degree-cert-degree">{degreeName} — {major}</h2>

      <p className="degree-cert-name">{Name} S/O {FName}</p>
      <p className="degree-cert-line">Registration No: {formatRegNumber(regNumber)}</p>

      <p className="degree-cert-line">
        Issued by <span className="degree-cert-mono">{issuingUniversity}</span>
        {" "}on {new Date(Number(dateIssued) * 1000).toLocaleDateString()}
      </p>

      <div className="degree-cert-footer">
        <img src={qrUrl} alt="Verification QR code" className="degree-cert-qr" />
        <span className={isValid ? "degree-cert-valid" : "degree-cert-revoked"}>
          {isValid ? "VERIFIED VALID" : "REVOKED"}
        </span>
      </div>
    </div>
  );
}

export default DegreeCard;