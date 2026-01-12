export const getTargetRolesForOffer = (offerFor) => {
  switch (offerFor) {
    case "common":
      return ["seller", "retailer", "dealer", "admin"];
    case "retailer":
      return ["retailer", "admin"];
    case "dealer":
      return ["dealer", "admin"];
    default:
      return ["admin"];
  }
};
