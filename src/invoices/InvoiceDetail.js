// src/invoices/InvoiceDetail.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../utils/api";

const InvoiceDetail = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/invoices/" + id)
            .then((data) => setInvoice(data))
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    }, [id]);

    if (error) {
        return <div className="alert alert-danger">Chyba: {error}</div>;
    }

    if (!invoice) {
        return <div>Načítání...</div>;
    }

    return (
        <div>
            <h1>Detail faktury</h1>
            <hr />
            <p><strong>Číslo faktury:</strong> {invoice.invoiceNumber}</p>
            <p><strong>Datum:</strong> {invoice.date}</p>
            <p><strong>Cena:</strong> {invoice.price}</p>
            <p><strong>Popis:</strong> {invoice.description}</p>
            <hr />
            <Link to="/invoices" className="btn btn-primary">Zpět na seznam faktur</Link>
            <Link to={`/invoices/edit/${invoice._id}`} className="btn btn-warning ml-2">Upravit</Link>
        </div>
    );
};

export default InvoiceDetail;
