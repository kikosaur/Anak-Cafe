import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { formatCurrency } from '../utils/currency';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import type { CupSize } from '../types';

const CUP_SIZES = [
  { label: 'Small', value: 'small', priceModifier: 0 },
  { label: 'Medium', value: 'medium', priceModifier: 20 },
  { label: 'Large', value: 'large', priceModifier: 40 },
];

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(CUP_SIZES[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (id) {
        const data = await getProductById(id);
        if (data) {
          // Patch missing fields for compatibility with Product type
          setProduct({
            ...data,
            id: typeof data.id === 'string' ? parseInt(data.id, 10) : data.id,
            image: data.image_url || '',
            inStock: typeof data.inStock === 'boolean' ? data.inStock : (typeof data.in_stock === 'boolean' ? data.in_stock : true),
          } as Product);
        } else {
          setProduct(null);
        }
      } else {
        setProduct(null);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!product) return <div className="p-8 text-red-500">Product not found.</div>;

  const basePrice = product.price || 0;
  const finalPrice = basePrice + selectedSize.priceModifier;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize.value as CupSize);
    }
  };

  const handleCheckout = () => {
    if (product) {
      addToCart(product, quantity, selectedSize.value as CupSize);
      navigate('/checkout', { state: { product, size: selectedSize, price: finalPrice, quantity } });
    }
  };

  return (
    <div className="container-custom py-12 flex flex-col md:flex-row gap-12">
      <div className="flex-1 flex justify-center">
        {product.image_url && (
          <img src={product.image_url} alt={product.name} className="w-80 h-80 object-cover rounded-lg shadow" />
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="mb-4 text-gray-600">{product.category.replace('-', ' ')}</div>
        <div className="mb-6 text-lg">{product.description}</div>
        <div className="mb-6">
          <div className="font-semibold mb-2">Select Cup Size:</div>
          <div className="flex gap-4">
            {CUP_SIZES.map(size => (
              <button
                key={size.value}
                className={`btn ${selectedSize.value === size.value ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedSize(size)}
              >
                {size.label} {size.priceModifier > 0 && `(+₱${size.priceModifier})`}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-outline"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >-</button>
            <span className="font-bold text-lg w-8 text-center">{quantity}</span>
            <button
              className="btn btn-outline"
              onClick={() => setQuantity(q => q + 1)}
              aria-label="Increase quantity"
            >+</button>
          </div>
          <span className="text-xl font-bold">Total: ₱{formatCurrency(finalPrice * quantity)}</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <button className="btn btn-primary w-full md:w-auto" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="btn btn-success w-full md:w-auto" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
