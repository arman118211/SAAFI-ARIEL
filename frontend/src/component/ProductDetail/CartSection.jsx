import React from "react"
import { Minus, Plus, Truck, Tag } from "lucide-react"
import { useSelector , useDispatch } from "react-redux"
import { addToCart, updateCartQty, removeFromCart  } from "../../redux/slices/cartSlice"


const CartSection = ({
  price,              // price of ONE bag (before discount)
  discount ,       // % discount on bag
  currency,
  deliveryTime,
  returnWindow,
  quantity,
  onQuantityChange,
  seller,
  packSize,
  pricePerProduct
}) => {

  const dispatch = useDispatch()
  console.log("seller-->",seller)

  const cartItem = useSelector((state) =>
    state.cart.items.find((i) => i.productId === seller.productId)
  )

  console.log("cart data-->",seller.productId,seller.productName,quantity,pricePerProduct,packSize,seller.imageUrl,discount)
  
const handleAddToCart = () => {
  dispatch(
    addToCart({
      productId: seller.productId, // pass from parent
      name: seller.productName,
      qty: quantity,              // number of bags
      price: pricePerProduct,    // price per product
      packSize,
      imageUrl: seller.imageUrl,
      discount,
    })
  )
  console.log("added successfully")
}

  const subtotal = price * quantity
  const discountAmount =
    discount > 0 ? (subtotal * discount) / 100 : 0
  const totalPayable = subtotal - discountAmount

  const handleDecrement = () => {
    onQuantityChange(Math.max(1, quantity - 1))
  }

  const handleIncrement = () => {
    onQuantityChange(quantity + 1)
  }

  return (
    <div className="md:sticky md:top-24 space-y-6 p-4 md:p-6 ">

      {/* Price Per Bag */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Price per bag</p>
        <div className="flex items-end gap-3 flex-wrap">
          {/* Discounted Price */}
          <span className="text-3xl font-bold text-gray-900">
            {currency}
            {discount > 0
              ? (price - (price * discount) / 100).toFixed(2)
              : price.toFixed(2)}
          </span>

          {/* Original Price (Cut) */}
          {discount > 0 && (
            <span className="text-lg text-gray-500 line-through font-semibold">
              {currency}{price.toFixed(2)}
            </span>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
              <Tag size={12} />
              {discount}% OFF
            </span>
          )}
        </div>


        <p className="text-xs text-gray-500 mt-1">
          {currency}{pricePerProduct.toFixed(2)} per product • {packSize} products / bag
        </p>
      </div>

      {/* Delivery */}
      <div className="flex items-center gap-2 text-green-600 font-semibold">
        <Truck size={18} />
        <span>{deliveryTime} Delivery</span>
      </div>

      {/* Return */}
      <div className="text-sm text-gray-600">
        Bag Size:{" "}
        <span className="font-semibold text-gray-900">{packSize} pcs</span>
      </div>

      {/* Quantity Selector */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Number of bags</p>
        <div className="flex items-center gap-3 border border-gray-300 rounded-lg w-fit">
          <button
            onClick={handleDecrement}
            className="p-2 hover:bg-gray-100 rounded-l-lg"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="px-4 font-semibold min-w-[40px] text-center">
            {quantity}
          </span>

          <button
            onClick={handleIncrement}
            className="p-2 hover:bg-gray-100 rounded-r-lg"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({quantity} bag{quantity > 1 ? "s" : ""})
          </span>
          <span className="font-semibold">
            {currency}{subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discount}%)</span>
            <span>- {currency}{discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total Payable</span>
          <span>{currency}{totalPayable.toFixed(2)}</span>
        </div>
      </div>

      {/* Add to Cart */}
      {!cartItem ? (
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          ADD TO CART
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              dispatch(updateCartQty({
                productId:seller.productId,
                qty: cartItem.qty - 1
              }))
            }
            disabled={cartItem.qty === 1}
            className="px-3 py-2 bg-gray-200 rounded"
          >
            <Minus size={14} />
          </button>

          <span className="font-bold">{cartItem.qty}</span>

          <button
            onClick={() =>
              dispatch(updateCartQty({
                productId:seller.productId,
                qty: cartItem.qty + 1
              }))
            }
            className="px-3 py-2 bg-gray-200 rounded"
          >
            <Plus size={14} />
          </button>

          <button
            onClick={() => dispatch(removeFromCart(seller.productId))}
            className="ml-auto text-red-600 text-sm font-semibold"
          >
            Remove
          </button>
        </div>
      )}


      {/* Seller */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center gap-3">
          <img
            src={seller.image}
            alt={seller.name}
            className="w-12 h-12 rounded-md border border-gray-200 object-contain"
          />
          <div className="min-w-0">
            <p className="text-sm text-gray-600 truncate">
              Sold by{" "}
              <a href={seller.storeLink} className="text-blue-600 font-semibold">
                {seller.name}
              </a>
            </p>
            <p className="text-xs text-gray-500 truncate">
              {seller.vendorSource}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CartSection
