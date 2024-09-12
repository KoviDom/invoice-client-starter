import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut } from "../utils/api";

import FlashMessage from '../components/FlashMessage';
import InputField from '../components/InputField';
import InputSelect from '../components/InputSelect';

const InvoiceForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        seller: {
            _id: 0
        },
        buyer: {
            _id: 0
        },
        issued: "",
        dueDate: "",
        product: "",
        price: 0,
        vat: 0,
        note: ""
    });
    const [persons, setPersons] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        if (id) {
            apiGet(`/api/invoices/${id}`).then((data) => setInvoice(data));
        }
        apiGet("api/persons/").then((data) => setPersons(data.content)); //pak se mrknout vice na ten content, kde se vzal :D
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut(`/api/invoices/${id}`, invoice) : apiPost(`/api/invoices`, invoice))
            .then((data) => {
                console.log('succcess', data)
                setSent(true);
                setSuccess(true);
                //mozna pak pridat neco pozdeji
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    return (
        <div className="container">
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && success ? (
                <FlashMessage
                    theme={"success"}
                    text={"Uložení faktury proběhlo úspěšně."}
                />
            ) : null}
            <div>
                <form onSubmit={handleSubmit}>
                    <InputField
                        required={true}
                        type="text"
                        name="invoiceNumber"
                        min="3"
                        label="Číslo faktury"
                        prompt="Zadejte číslo faktury"
                        value={invoice.invoiceNumber}
                        handleChange={(e) => {
                            setInvoice({ ...invoice, invoiceNumber: e.target.value });
                        }}
                    />
                </form>
            </div>
        </div>
    )

    /*
    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? <div className="alert alert-danger">{errorState}</div> : ""}
            {sent && success ? (
                <FlashMessage
                    theme={"success"}
                    text={"Uložení faktury proběhlo úspěšně."}
                />
            ) : null}

            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    min="3"
                    label="Název"
                    prompt="Zadejte název díla"
                    value={invoiceNumberState}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="number"
                    name="dueDate"
                    label="Rok vydání"
                    prompt="Zadejte datum vystavení"
                    min="0"
                    value={dueDateState}
                    handleChange={handleChange}
                />

                <InputSelect
                    required={true}
                    name="buyers"
                    items={buyerListState}
                    multiple={true}
                    label="Odběratel"
                    prompt="Vyberte odběratele"
                    value={buyersState}
                    handleChange={handleChange}
                />

                <InputSelect
                    required={true}
                    name="sellers"
                    items={sellerListState}
                    multiple={true}
                    label="Dodavatel"
                    prompt="Vyberte dodavatele"
                    value={sellersState}
                    handleChange={handleChange}
                />

                <input type="submit" className="btn btn-primary" value="Uložit" />
            </form>
        </div>
    ); */


    /*
    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState && <div className="alert alert-danger">{errorState}</div>}
            {sentState && successState && (
                <FlashMessage
                    theme={"success"}
                    text={"Faktura byla úspěšně uložena."}
                />
            )}

            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    label="Číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={handleChange}
                />

                <InputSelect
                    required={true}
                    name="buyer"
                    label="Odběratel"
                    options={buyerListState || []}
                    value={invoice.buyer}
                    handleChange={handleChange}
                />

                <InputSelect
                    required={true}
                    name="seller"
                    label="Dodavatel"
                    options={sellerListState  || []}
                    value={invoice.seller}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Produkt"
                    value={invoice.product}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    value={invoice.price}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="DPH"
                    value={invoice.vat}
                    handleChange={handleChange}
                />

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={handleChange}
                />

                <input type="submit" className="btn btn-primary" value="Uložit" />
            </form>
        </div>
    );*/
}

export default InvoiceForm;
