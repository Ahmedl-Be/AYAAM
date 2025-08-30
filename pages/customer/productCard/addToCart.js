import Toast from "../../../components/ui/toast.js";

export function addToCart({ product, selectedColor, selectedSize, qty }) {
  if (!selectedColor) {
    Toast.notify("Please select a color", "warning");
    return false;
  }

  const variant = product.stock.find((v) => v.color === selectedColor);
  let sizeData;
  if (selectedSize) {
    sizeData = variant?.sizes.find((s) => s.name === selectedSize);
    if (!sizeData) {
      Toast.notify("This size is not available for the selected color", "danger");
      return false;
    }
  }

  const maxQty = sizeData ? sizeData.qty : variant?.qty || Infinity;
  let cart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];

  const existingItem = cart.find(
    (item) =>
      item.id === product.id &&
      item.color === selectedColor &&
      (selectedSize ? item.size === selectedSize : true)
  );

  if (existingItem) {
    if (existingItem.qty + qty > maxQty) {
      Toast.notify(`Only ${maxQty} units available,You already have ${existingItem.qty}.`, "warning");
      return false;
    }
    existingItem.qty += qty;
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
    Toast.notify(`Quantity updated! Added +${qty}. Total: ${existingItem.qty}`, "info");
    window.dispatchEvent(new Event("cartUpdated"));
    return true;
  }

  if (qty > maxQty) {
    Toast.notify(`Only ${maxQty} units available`, "warning");
    return false;
  }

  cart.push({
    id: product.id,
    name: product.name,
    price: (product.price * (1 - product.sale)).toFixed(2),
    size: selectedSize || null,
    color: selectedColor,
    qty,
  });

  sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
  Toast.notify(`${qty} x ${product.name} (${selectedSize || "One Size"}, ${selectedColor}) added to cart!`, "success");
  return true;
}