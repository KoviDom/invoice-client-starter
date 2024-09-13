import React, { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const Statistics = () => {
  const [invoiceStats, setInvoiceStats] = useState({});
  const [personStats, setPersonStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Získání statistik faktur
    apiGet("/api/invoices/statistics")
      .then((data) => setInvoiceStats(data))
      .catch((error) => setError(error.message));

    // Získání statistik osob
    apiGet("/api/persons/statistics")
      .then((data) => setPersonStats(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div className="alert alert-danger">Chyba: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Statistiky</h1>
      <hr />

      {/* Sekce statistik faktur */}
      <h2>Statistika faktur</h2>
      <p><strong>Součet za letošní rok:</strong> {invoiceStats.currentYearSum} Kč</p>
      <p><strong>Součet za všechny období:</strong> {invoiceStats.allTimeSum} Kč</p>
      <p><strong>Počet záznamů:</strong> {invoiceStats.invoicesCount}</p>

      {/* Sekce statistik osob */}
      <h2>Statistika osob</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Jméno</th>
            <th>Příjmy</th>
          </tr>
        </thead>
        <tbody>
          {personStats.map((person) => (
            <tr key={person.personId}>
              <td>{person.personId}</td>
              <td>{person.personName}</td>
              <td>{person.revenue} Kč</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
