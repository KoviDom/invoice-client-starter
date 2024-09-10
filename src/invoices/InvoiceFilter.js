import React from 'react';
import InputSelect from '../components/InputSelect';
import InputField from '../components/InputField';

const InvoiceFilter = (props) => {

    const handleChange = (e) => {
        props.handleChange(e); // Použití funkce handleChange z props
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(e); // Použití handleSubmit z props
    };

    const handleReset = () => {
        setFilters({
            buyerID: undefined,
            sellerID: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            product: undefined,
            limit: undefined,
        });
    };

    const filter = props.filter; // Aktuální hodnoty filtrů předané z rodičovské komponenty

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name="buyerID"
                        items={props.buyerList}
                        handleChange={handleChange}
                        label="Odběratel"
                        prompt="nevybrán"
                        value={filter.buyerID}
                    />
                </div>
                <div className="col">
                    <InputSelect
                        name="sellerID"
                        items={props.sellerList}
                        handleChange={handleChange}
                        label="Dodavatel"
                        prompt="nevybrán"
                        value={filter.sellerID}
                    />
                </div>
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Minimální cena"
                        prompt="neuvedeno"
                        value={filter.minPrice || ''}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <InputField
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Maximální cena"
                        prompt="neuvedeno"
                        value={filter.maxPrice || ''}
                    />
                </div>

                <div className="col">
                    <InputField
                        type="text"
                        name="product"
                        handleChange={handleChange}
                        label="Produkt/Služba"
                        prompt="neuvedeno"
                        value={filter.product || ''}
                    />
                </div>

                <div className="col">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit počtu faktur"
                        prompt="neuvedeno"
                        value={filter.limit || ''}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <input
                        type="submit"
                        className="btn btn-secondary float-right mt-2"
                        value={props.confirm}
                    />
                </div>
                <div className="col">
                    <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={handleReset} // Přidání tlačítka reset
                    >
                        reset
                    </button>
                </div>
            </div>
        </form>
    );
};

export default InvoiceFilter;
