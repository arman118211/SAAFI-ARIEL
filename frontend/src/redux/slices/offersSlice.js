import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offers: [],
  loading: false,
  error: null,
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    //----------------------------------------------
    // 1️⃣ Set All Offers
    //----------------------------------------------
    setOffers: (state, action) => {
      state.offers = action.payload;
    },

    //----------------------------------------------
    // 2️⃣ Create New Offer
    //----------------------------------------------
    addOffer: (state, action) => {
      state.offers.push(action.payload);
    },

    //----------------------------------------------
    // 3️⃣ Update Offer (title, description, status...)
    //----------------------------------------------
    updateOffer: (state, action) => {
      const updatedOffer = action.payload; // must include _id
      const index = state.offers.findIndex((o) => o._id === updatedOffer._id);

      if (index !== -1) {
        state.offers[index] = {
          ...state.offers[index],
          ...updatedOffer,
        };
      }
    },

    //----------------------------------------------
    // 4️⃣ Delete Offer
    //----------------------------------------------
    deleteOffer: (state, action) => {
      const id = action.payload;
      state.offers = state.offers.filter((offer) => offer._id !== id);
    },

    //----------------------------------------------
    // 5️⃣ Select Winner for an Offer
    //----------------------------------------------
    setOfferWinner: (state, action) => {
      const { offerId, winner } = action.payload;
      const offer = state.offers.find((o) => o._id === offerId);

      if (offer) {
        offer.winner = winner; // winner = sellerId or full seller object
      }
    },

    //------------------------------------------------
    // 6️⃣ Add Seller Purchase to an Offer
    //------------------------------------------------
    addSellerPurchase: (state, action) => {
      const { offerId, purchase } = action.payload;

      const offer = state.offers.find((o) => o._id === offerId);

      if (offer) {
        offer.sellerPurchases.push(purchase);
      }
    },

    //------------------------------------------------
    // 7️⃣ Add Order Inside Seller's Purchase
    //------------------------------------------------
    addSellerOrder: (state, action) => {
      const { offerId, sellerId, order } = action.payload;

      const offer = state.offers.find((o) => o._id === offerId);
      if (!offer) return;

      const sellerPurchase = offer.sellerPurchases.find(
        (sp) => sp.sellerId._id === sellerId
      );

      if (!sellerPurchase) return;

      sellerPurchase.orders.push(order);
      sellerPurchase.totalQty += order.qty; // update quantity
    },

    //------------------------------------------------
    // 8️⃣ Update Offer Status (active, expired, closed...)
    //------------------------------------------------
    updateOfferStatus: (state, action) => {
      const { offerId, status } = action.payload;

      const offer = state.offers.find((o) => o._id === offerId);
      if (offer) offer.status = status;
    },
  },
});

// Export Actions
export const {
  offers,
  setOffers,
  addOffer,
  updateOffer,
  deleteOffer,
  setOfferWinner,
  addSellerPurchase,
  addSellerOrder,
  updateOfferStatus,
} = offersSlice.actions;

//-------------------
// Selectors
//-------------------
export const selectOffers = (state) => state.offers.offers;

export const selectOfferById = (id) => (state) =>
  state.offers.offers.find((o) => o._id === id);

export const selectSellerPurchaseForOffer =
  (offerId, sellerId) => (state) => {
    const offer = state.offers.offers.find((o) => o._id === offerId);
    return offer?.sellerPurchases.find(
      (sp) => sp.sellerId._id === sellerId
    );
  };

// Export Reducer
export default offersSlice.reducer;
