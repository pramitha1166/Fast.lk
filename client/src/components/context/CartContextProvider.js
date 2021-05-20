import React, { Component, createContext } from 'react'

export const CartContext = createContext();

class CartContextProvider extends Component {

     constructor(props) {
         super(props)
     }

    state = {
        cartData: this.props.cartData
    }

    render() {
        return (
            <CartContext.Provider value={{...this.state}}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export default CartContextProvider