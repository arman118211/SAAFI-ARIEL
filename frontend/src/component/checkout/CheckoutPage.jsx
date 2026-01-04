import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../../redux/slices/cartSlice"

function CheckoutPage() {
const dispatch = useDispatch()
const { items } = useSelector((state) => state.cart)
console.log("items In the cart-->",items)
  return (
    <div>CheckoutPage</div>
  )
}

export default CheckoutPage