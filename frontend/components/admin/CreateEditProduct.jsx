import React from "react";
import { updateProduct, createProduct, deleteProduct } from "../../helpers/adminHelper";
import productModel from "../../models/productModel";

class CreateEditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = { product: new productModel() };
        if (props.product !== undefined) {
            console.log("ARTRRGHHBERANS");
            this.state = { product: props.product };
        }
    }

    handleNumChange = (event, type) => {
        console.log(event.target.value.length);

        const re =
            /"^£?-?([0-9]{1}[0-9]{0,2}(,\d{3})*(\.\d{0,2})?|[0-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^-?£?([0-9]{1}\d{0,2}(,\d{3})*(\.\d{0,2})?|[0-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(£?([0-9]{1}\d{0,2}(,\d{3})*(\.\d{0,2})?|[0-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$"/gm;
        if (re.test(event.target.value) || event.target.value.length === 0) {
            this.state.product[type] = parseFloat(event.target.value);
        } else {
            console.log("BAD");
            event.target.value = this.state.product[type];
        }
        console.log(this.state.product);
    };

    handleChange = (event, type) => {
        this.state.product[type] = event.target.value;
        console.log(this.state.product);
    };

    submitButton = async () => {
        if (this.props.product !== undefined) {
            console.log(this.state.product);
            await updateProduct(this.state.product);
        } else {
            await createProduct(this.state.product);
        }
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    setArrayLength = (event) => {
        let num = parseInt(event.target.value);
        while (num > this.state.product.editors.length) {
            this.state.product.editors.push("");
        }
        while (num < this.state.product.editors.length) {
            this.state.product.editors.pop();
        }
        this.forceUpdate();
    };

    updateEditor = (event, ind) => {
        this.state.product.editors[ind] = event.target.value;
    };

    deleteButton = async () => {
        await deleteProduct(this.state.product);
        console.log(this.props.closeTab);
        this.props.closeTab();
        console.log("closedTab");
    };

    render() {
        console.log("RENDERING");
        return (
            <>
                {" "}
                <div className="my-2 p-2 rounded border-2 border-amber-500 flex flex-col">
                    <label>
                        {" "}
                        Product name:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="name"
                            type="text"
                            defaultValue={this.state.product.name}
                            onChange={(event) => this.handleChange(event, "name")}
                        />
                    </label>

                    <label>
                        {" "}
                        Product price:
                        <input
                            className=" ml-2 mb-2 rounded border-2 border-slate-500"
                            name="noTickets"
                            type="number"
                            defaultValue={this.state.product.price}
                            onChange={(event) => this.handleNumChange(event, "price")}
                            onKeyDown={(event) => {
                                if (!/[0-9.]/.test(event.key) && event.key !== "Backspace") {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </label>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-red-700">Remove Product?!</h3>
                            <p className="py-4">Are you sure you want to remove this product?</p>
                            <div className="modal-action">
                                <label
                                    onClick={() => this.deleteButton()}
                                    htmlFor="my-modal"
                                    className="btn"
                                >
                                    Yes
                                </label>
                                <label htmlFor="my-modal" className="btn">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                    onClick={this.submitButton}
                >
                    Save Product
                </button>
                {this.props.product !== undefined && (
                    <label
                        htmlFor="my-modal"
                        className="bg-amber-400 rounded px-2 py-3 hover:cursor-pointer transition hover:bg-amber-600 ml-4 modal-button"
                    >
                        Delete Product
                    </label>
                )}
            </>
        );
    }
}

export default CreateEditProduct;
