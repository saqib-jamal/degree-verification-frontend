// components/DegreeCard.js

import React from "react";
import logo from "../assets/UniLogo.webp";

function DegreeCard({ degree }) {
  const { id, degreeName, major, issuingUniversity, dateIssued, isValid } = degree;

  return (
    <div className="degree-card">
      <div className="degree-card-header">
        <div className="degree-card-seal">
          <img src={logo} alt="University logo" className="degree-card-logo" />
        </div>
      </div>

      <div className="degree-card-body">
        <h3>{degreeName}</h3>
        <p className="degree-card-major">{major}</p>

        <div className="degree-card-row">
          <span className="degree-card-label">Degree ID</span>
          <span>{id.toString()}</span>
        </div>
        <div className="degree-card-row">
          <span className="degree-card-label">Issued by</span>
          <span className="degree-card-address">{issuingUniversity}</span>
        </div>
        <div className="degree-card-row">
          <span className="degree-card-label">Date issued</span>
          <span>{new Date(Number(dateIssued) * 1000).toLocaleDateString()}</span>
        </div>

        <span className={isValid ? "status-valid" : "status-revoked"}>
          {isValid ? "Valid" : "Revoked"}
        </span>
      </div>
    </div>
  );
}

export default DegreeCard;