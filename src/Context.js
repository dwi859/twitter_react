import React, { Component } from 'react';
import axios from 'axios';
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
// createContext agar dapat mengakses state satu ke halaman lain;
// jadi dapat di gunakan di halaman lain;

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0,
        total : null,
        per_page:null,
        current_page:null
    }
    makeHttpRequestWithPage = async PageNumber => {
        let response = await fetch("http://localhost:3000/data?page=${pageNumber}",{
            method : 'GET',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
            },
        });
            const data =  await response.json();
            console.log(data)
            this.setState({
                products: data,
                total : data.total,
                per_page : data.per_page,
                current_page:data.page,
            })
    }





    componentDidMount() {
        axios.get("http://localhost:3000/data")
        .then((result) => {
            console.log(result)
            this.setState({
            products: result.data
        })
        // console.log(result)
    })
   
    console.log(this.state.products)
    }

    // setProducts = () => {
    //     let tempProducts = [];
    //     storeProducts.forEach(item => {
    //         const singleItem = { ...item };
    //         tempProducts = [...tempProducts, singleItem];
    //         // jika titik 3 kali maka maksudnya adalah mengambil semua data isi yang didalamnya
    //     });
    //     this.setState(() => {
    //         return { products: tempProducts };
    //     });
    // }

    getItem = index => {
        const product = this.state.products.find(item => item.index === index);
        return product;
    }

    handleDetail = index => {
        const product = this.getItem(index);
        this.setState(() => {
            return { detailProduct: product }
        })
    }

    addToCart = index => {
        let tempProducts = [...this.state.products];
        const id = tempProducts.indexOf(this.getItem(index));
        const product = tempProducts[id];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return { products: tempProducts, cart: [...this.state.cart, product] };
        },
            () => {
                this.addTotals();
            }
        )
    }

    openModal = index => {
        const product = this.getItem(index);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = index => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }

    increase = index => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.index === index)
        const id = tempCart.indexOf(selectedProduct);
        const product = tempCart[id];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart: [...tempCart]
            }
        },
            () => {
                this.addTotals();
            })
    }

    decrease = index => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.index === index)
        const id = tempCart.indexOf(selectedProduct);
        const product = tempCart[id];

        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;

            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            },
                () => {
                    this.addTotals();
                })
        }
    }

    removeItem = index => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.index !== index);

        const id = tempProducts.indexOf(this.getItem(index));
        let removeProduct = tempProducts[id];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            };
        }, () => {
            this.addTotals();
        })
    }

    clearCart = () => {
        this.setState(() => {
            return { cart: [] };
        },
            () => {
                // this.setProducts();
                // mengubah status nya yang sebelumnya in cart karena sudah di hapus
                this.addTotals();
            })
    }

    addTotals = () => {
        let subtotal = 0;
        this.state.cart.map(item => (subtotal += item.total));
        const tempTax = subtotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        // ini untuk menggunapkan menjadi desimal 2 angka
        const total = subtotal + tax;
        this.setState(() => {
            return {
                cartSubtotal: subtotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart, openModal: this.openModal, closeModal: this.closeModal,
                increase: this.increase, decrease: this.decrease,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };