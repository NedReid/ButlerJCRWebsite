import React from "react";
import { getProducts } from "../../helpers/adminHelper";
import CreateEditProduct from "./CreateEditProduct";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = { addingProduct: false, products: [], currentProduct: undefined };
    }

    async componentDidMount() {
        const products = await getProducts();
        this.setState({ products: products });
        console.log(products);
    }

    editProduct = (event) => {
        const currentProduct = this.state.products.find((product) => {
            return product._id === event.target.value;
        });
        console.log(currentProduct);
        this.setState({ currentProduct: currentProduct });
    };

    onUpdated = async () => {
        this.currentProduct = undefined;
        this.setState({ products: [] });
        const products = await getProducts();
        this.setState({ products: products });
    };

    onCreated = async () => {
        this.setState({ addingProduct: false });
        this.setState({ products: [] });
        const products = await getProducts();
        this.setState({ products: products });
    };

    render() {
        return (
            <div className="my-2 p-2 rounded border-2 border-amber-500">
                {this.state.addingProduct === false && (
                    <button
                        className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                        onClick={() => {
                            this.setState({ addingProduct: true });
                        }}
                    >
                        Add Product
                    </button>
                )}
                {this.state.addingProduct === true && (
                    <>
                        <button
                            className="bg-amber-400 rounded p-2 transition hover:bg-amber-600"
                            onClick={() => {
                                this.setState({ addingProduct: false });
                            }}
                        >
                            Cancel
                        </button>
                        <CreateEditProduct closeTab={this.onCreated} />
                    </>
                )}
                <br />
                Edit Products:
                <br />
                <select
                    defaultValue=""
                    onChange={this.editProduct}
                    key="products"
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Select Product</option>
                    {this.state.products.map((product, index) => {
                        return (
                            <option value={product._id} key={"product_" + index}>
                                {product.name}
                            </option>
                        );
                    })}
                </select>
                <br />
                {this.state.currentProduct !== undefined &&
                    this.state.products.map((product, index) => {
                        if (product === this.state.currentProduct) {
                            console.log("AGHGG");
                            return (
                                <CreateEditProduct
                                    closeTab={this.onUpdated}
                                    key={index}
                                    product={this.state.currentProduct}
                                />
                            );
                        }
                    })}
            </div>
        );
    }
}

export default Products;
