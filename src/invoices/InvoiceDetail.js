// src/invoices/InvoiceDetail.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../utils/api";

const InvoiceDetail = () => {
    const { id } = useParams();
    console.log(id);
    const [invoice, setInvoice] = useState({});
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
        return <div>Žádná data k zobrazení.</div>;
    }

    return (
        <>
            <div className="container">
                <h1>Detail faktury</h1>
                <hr />
                <h3>#{invoice.invoiceNumber} ({invoice.product})</h3>
                <p>
                    <strong>Datum vystavení:</strong>
                    <br />
                    {invoice.issued}
                </p>
                <p>
                    <strong>Datum splatnosti:</strong>
                    <br />
                    {invoice.dueDate}
                </p>
                <p>
                    <strong>Dodavatel:</strong>
                    <br />
                    {invoice.sellerID}
                </p>
                <p>
                    <strong>Odběratel:</strong>
                    <br />
                    {invoice.buyerID}
                </p>
                <p>
                    <strong>Produkt:</strong>
                    <br />
                    {invoice.product}
                </p>
                <p>
                    <strong>Cena:</strong>
                    <br />
                    {invoice.price}
                </p>
                <p>
                    <strong>Popis:</strong>
                    <br />
                    {invoice.note}
                </p>
                <Link to="/invoices" className="btn btn-primary">Zpět</Link>
            </div>
        </>
    );
};

export default InvoiceDetail;
