import React, { useState } from "react";

const InvoiceFilter = ({ filters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (e) => {
        setLocalFilters({
            ...localFilters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(localFilters);
    };

    const handleReset = () => {
        const resetFilters = {
            buyer: "",
            seller: "",
            minPrice: "",
            maxPrice: "",
            product: "",
            limit: 10
        };
        setLocalFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Odběratel</label>
                <input
                    name="buyer"
                    value={localFilters.buyer}
                    onChange={handleChange}
                    placeholder="(nevybrán)"
                />
            </div>
            <div>
                <label>Dodavatel</label>
                <input
                    name="seller"
                    value={localFilters.seller}
                    onChange={handleChange}
                    placeholder="(nevybrán)"
                />
            </div>
            <div>
                <label>Minimální cena</label>
                <input
                    name="minPrice"
                    type="number"
                    value={localFilters.minPrice}
                    onChange={handleChange}
                    placeholder="neuvedeno"
                />
            </div>
            <div>
                <label>Maximální cena</label>
                <input
                    name="maxPrice"
                    type="number"
                    value={localFilters.maxPrice}
                    onChange={handleChange}
                    placeholder="neuvedeno"
                />
            </div>
            <div>
                <label>Produkt/Služba</label>
                <input
                    name="product"
                    value={localFilters.product}
                    onChange={handleChange}
                    placeholder="neuvedeno"
                />
            </div>
            <div>
                <label>Limit počtu faktur</label>
                <select
                    name="limit"
                    value={localFilters.limit}
                    onChange={handleChange}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <button type="submit">FILTR</button>
            <button type="button" onClick={handleReset}>reset</button>
        </form>
    );
};

export default InvoiceFilter;
