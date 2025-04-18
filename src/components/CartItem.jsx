import React from 'react';
import { Trash2 } from 'lucide-react';

const CartItem = ({ product, productId, setCartItems  }) => {
    // console.log(product)
    const handleRemove = () => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };
    
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
                {/* Product image */}
                <div className="w-14 h-12 bg-gray-100 rounded">
                    <img
                        src={"/zecode.jpg"}
                        alt='img'
                        className="w-full h-full object-cover rounded"
                    />
                </div>

                <div>
                    <p className="font-medium text-gray-800 text-left truncate max-w-[200px]">
                        {product.name}
                    </p>
                    <p className="text-sm text-gray-600 text-left">Size: {product.size}</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                         Item added to the Cart
                    </p>
                </div>
            </div>

            {/* Trash icon to remove item */}
            <button aria-label="Remove item " onClick={handleRemove}>
                <Trash2 className="w-5 h-5 mt-10 mr-3 text-gray-600 hover:text-red-600" />
            </button>
        </div>
    );
};

export default CartItem;