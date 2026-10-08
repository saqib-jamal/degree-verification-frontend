

import React from "react";
import logo from "../assets/UniLogo.webp";

function formatRegNumber(num) {
  const s = num.toString();
  return s.length > 4 ? `${s.slice(0, 4)}-${s.slice(4)}` : s;
}

function DegreeCard({ degree }) {
  const { id, degreeName, major, issuingUniversity, Name, FName, regNumber, dateIssued, isValid } = degree;

  

  return (
    <div className="degree-cert">
      <span className="degree-cert-serial">Serial No. {id.toString()}</span>

      <div className="degree-cert-header">
<svg viewBox="0 -20 600 180" className="degree-cert-arch">
  <defs>
   <path id="archPath" d="M 20 150 Q 300 -10 580 150" />
  </defs>
  <text>
  <textPath
    href="#archPath"
    startOffset="50%"
    textAnchor="middle"
    style={{ fontSize: window.innerWidth < 480 ? '18px' : '30px' }}
  >
    Shaheed Benazir Bhutto University, Sheringal
  </textPath>
</text>
</svg>

<div className="degree-cert-seal">
        <img src={logo} alt="University seal" />
      </div>

      
  <p>Dir Upper, Khyber Pakhtunkhwa, Pakistan</p>
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
        <span className={isValid ? "degree-cert-valid" : "degree-cert-revoked"}>
          {isValid ? "VERIFIED VALID" : "REVOKED"}
        </span>
      </div>
    </div>
  );
}

export default DegreeCard;