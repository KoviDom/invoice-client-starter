// src/invoices/InvoiceTable.js

import React from "react";
import { Link } from "react-router-dom";

const InvoiceTable = ({ label, items, deleteInvoice }) => {
    return (
        <div>
            <p>{label} {items.length}</p>

            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>Odběratel</th>
                        <th>Dodavatel</th>
                        <th>Produkt</th>
                        <th>Cena</th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((invoice, index) => (
                            <tr key={invoice.id || index}>
                                <td>{index + 1}</td>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{invoice.buyer.name}</td>
                                <td>{invoice.seller.name}</td>
                                <td>{invoice.product}</td>
                                <td>{invoice.price} Kč</td>
                                <td>
                                    <Link to={`/invoices/${invoice.id}`} className="btn btn-info">Zobrazit</Link>
                                    <Link to={`/invoices/edit/${invoice.id}`} className="btn btn-warning">Upravit</Link>
                                    <button className="btn btn-danger" onClick={() => deleteInvoice(invoice.id)}>
                                        Odstranit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Žádné faktury nenalezeny</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
};

export default InvoiceTable;
