// src/invoices/InvoiceForm.js

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";
import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        date: "",
        amount: "",
        description: "",
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? <div className="alert alert-danger">{errorState}</div> : null}
            {sentState && (
                <FlashMessage
                    theme={successState ? "success" : ""}
                    text={successState ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
                />

                <InputField
                    required={true}
                    type="date"
                    name="date"
                    label="Datum"
                    prompt="Zadejte datum"
                    value={invoice.date}
                    handleChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                />

                <InputField
                    required={true}
                    type="number"
                    name="amount"
                    label="Částka"
                    prompt="Zadejte částku"
                    value={invoice.amount}
                    handleChange={(e) => setInvoice({ ...invoice, amount: e.target.value })}
                />

                <InputField
                    type="text"
                    name="description"
                    label="Popis"
                    prompt="Zadejte popis"
                    value={invoice.description}
                    handleChange={(e) => setInvoice({ ...invoice, description: e.target.value })}
                />

                <input type="submit" className="btn btn-primary" value="Uložit" />
            </form>
        </div>
    );
};

export default InvoiceForm;
