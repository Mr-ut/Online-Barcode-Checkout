import { useState, useEffect } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import CartItem from './CartItem';
import PaymentSuccess from './PaymentSuccess';
import { div } from 'framer-motion/client';
import UserDetailsForm from './UserDetailsForm';


export default function Scan() {
    const [activeStep, setActiveStep] = useState('scan');
    const [cartItems, setCartItems] = useState([]);
    const [scanError, setScanError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [payment, setPayment] = useState(false);

    const [lastAdded, setLastAdded] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (cartItems.length > 0) {
            setLastAdded(cartItems[cartItems.length - 1]);
            setShowNotification(true);
            const timer = setTimeout(() => setShowNotification(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [cartItems]);

    // Mock database of products (in a real app, this would be an API call)
    const productDatabase = {
        '100000000001': { name: 'Men Rust Pink Regular Fit Solid Casual Linen Cotton Shirt', price: 799, size: 'M' },
        '100000000002': { name: 'Men Maroon Printed Lounge T-shirt', price: 249, size: 'M' },
        '100000000003': { name: 'Graphic Printed Drop-Shoulder Sleeves Oversized T-shirt', price: 399, size: 'L' },
        '100000000004': { name: 'Pure Cotton Polo Collar T-shirt', price: 699, size: 'M' },
        '100000000005': { name: 'Floral Printed Mandarin Collar Fit and Flare Dresses', price: 799, size: 'S' },
        '100000000006': { name: 'Floral Printed Sleeveless Fit & Flare Dress', price: 599, size: 'M' },
        '100000000007': { name: 'Girls Layered Ruffles Fit & Flare Dress', price: 699, size: '9-10 Y' },
        '100000000008': { name: 'Girls Print Puff Sleeve Dress', price: 599, size: '5-6 Y' },
        '100000000009': { name: 'Floral Printed Mandarin Collar Mirror Work Pure Cotton Straight Short Kurti', price: 699, size: 'M' },
        '100000000010': { name: 'Floral Embroidered Thread Work A-Line Kurta With Trousers & Dupatta', price: 999, size: 'M' },
        '100000000011': { name: 'Men Baggy Fit Cotton Elasticated Waist Jeans', price: 999, size: 'M' },
        '100000000012': { name: 'Men Heavy Fade Mid Rise Baggy Relaxed Fit Jeans', price: 899, size: 'M' },
        '100000000013': { name: 'Boys Striped Mid Rise Pure Cotton Shorts', price: 499, size: '5-6 Y' },
        '100000000014': { name: 'Boys Pack Of 2 Typographic Printed Cotton Sports Shorts', price: 699, size: '9-10 Y' },
        '100000000015': { name: 'Women Bootcut Fit Mid-Rise Jeans', price: 899, size: 'S' },
        '100000000016': { name: 'Medium Coverage Non-Padded Bralette Bra', price: 799, size: 'S' },
        '100000000017': { name: 'Men Colour blocked Sneakers', price: 899, size: '40' },
        '100000000018': { name: 'White Botanical Design One-Shoulder Dress', price: 799, size: 'XS' },
        '100000000019': { name: 'Off-White Abstract Printed Cotton-Blend A-Line Dress', price: 899, size: 'XS' },
        '100000000020': { name: 'V-Neck Pleated Apple Hem Kurta With Trouser', price: 799, size: 'M' },
    };

    const productId = '100000000020';
    const product = productDatabase[productId];
    const handleRemoveItem = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };
    const handleAddItem = (barcode) => {
        setIsScanning(false); // Stop scanning after successful scan
        setScanError(null); // Clear previous errors

        try {
            // Validate barcode
            // if (!barcode || typeof barcode !== 'string') {
            //   throw new Error('Invalid barcode format');
            // }

            // Lookup product in database
            // barcode = JSON.stringify(barcode)
            const product = productDatabase[barcode];

            if (!product) {
                throw new Error('Product not found in database');
            }

            // Add to cart
            setCartItems(prevItems => [
                ...prevItems,
                {
                    id: Date.now(), // Unique ID for the cart item
                    barcode,
                    ...product
                }
            ]);

            // Play success sound
            new Audio('/beep-02.mp3').play().catch(() => { });

        } catch (error) {
            setScanError(error.message);
            // Play error sound
            new Audio('beep-02.mp3').play().catch(() => { });
        }
    };

    // Mock function to simulate scanning an item
    // const handleScan = () => {
    //     new Audio('/beep-02.mp3').play().catch(() => { });
    //     const newItem = {
    //         id: Date.now(),
    //         name: `Product ${cartItems.length + 1}`,
    //         price: Math.floor(Math.random() * 100) + 10
    //     };
    //     setCartItems([...cartItems, newItem]);
    // };

    // Calculate total price
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="container">
            {activeStep === 'user' && (
                <UserDetailsForm setActiveStep={setActiveStep}/>
            )}
            {!payment ? (
                <div className="min-h-screen bg-gray-50 p-4">
                    {/* Navigation Tabs */}
                    <div className="flex justify-between mb-8 bg-white rounded-lg shadow">
                        <button
                            onClick={() => setActiveStep('scan')}
                            className={`flex-1 py-3 px-4 text-center font-medium ${activeStep === 'scan' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                        >
                            Scan
                        </button>
                        <button
                            onClick={() => setActiveStep('review')}
                            className={`flex-1 py-3 px-4 text-center font-medium ${activeStep === 'review' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            disabled={cartItems.length === 0}
                        >
                            Review Cart
                        </button>
                        <button
                            onClick={() => setActiveStep('pay')}
                            className={`flex-1 py-3 px-4 text-center font-medium ${activeStep === 'pay' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                            disabled={cartItems.length === 0}
                        >
                            Pay
                        </button>
                    </div>

                    {/* Step Content */}

                    <div className="bg-white rounded-lg shadow-md p-6">
                        {activeStep === 'scan' && (
                            <div className="text-center">
                                <div className="relative">
                                    {/* Scanner with border and subtle shadow */}
                                    <div className="border-4 border-blue-100 rounded-xl shadow-lg overflow-hidden">
                                        <BarcodeScannerComponent
                                            width={492}
                                            height={292}
                                            onUpdate={(err, result) => {
                                                if (result) {
                                                    handleAddItem(result.text);
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Optional corner accents */}
                                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
                                    <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-500 rounded-tr-xl"></div>
                                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-xl"></div>
                                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-500 rounded-br-xl"></div>

                                    {/* Optional scanning guide text */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                                            Align barcode within frame
                                            {showNotification && lastAdded && (
                                                <div className="animate-fadeInOut fixed top-30 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                                    Added: {lastAdded.name} (${lastAdded.price.toFixed(2)})
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                                {/* <h2 className="text-xl font-small mt-3 mb-4">Scan Item to add to your cart</h2> */}
                                <button

                                    className="mt-4 bg-black text-white font-small rounded-3xl py-2 px-4 rounded"
                                >
                                    Scan Item to add to your cart
                                </button>
                                {/* <button
                            onClick={handleScan}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg mb-4"
                        >
                            Simulate Scan
                        </button> */}
                                {/* <p className="text-gray-600 mt-1">Items in cart: {cartItems.length}</p> */}

                                {cartItems.length > 0 ? (
                                    // <p className="text-gray-600 mt-1">
                                    //     Last added: {cartItems[cartItems.length - 1].name} (${cartItems[cartItems.length - 1].barcode})
                                    // </p>
                                    <CartItem product={productDatabase[cartItems[cartItems.length - 1].barcode]}
                                        setCartItems={setCartItems}
                                        productId={cartItems[cartItems.length - 1].id}
                                    />

                                ) : (
                                    <p className="text-gray-600 mt-1">Your cart is empty</p>
                                )}

                                {/* <CartItem product={product} /> */}

                                {cartItems.length > 0 && (
                                    <button
                                        onClick={() => setActiveStep('user')}
                                        className="mt-4 bg-black hover:bg-green-700 text-white font-small rounded-3xl py-2 px-4 rounded"
                                    >
                                        Proceed to Review →
                                    </button>
                                )}
                            </div>
                        )}

                        {activeStep === 'review' && (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Review Your Cart</h2>
                                <div className="mb-6">
                                    {cartItems.length === 0 ? (
                                        <p className="text-gray-500">Your cart is empty</p>
                                    ) : (
                                        <ul className="divide-y divide-gray-200">
                                            {cartItems.map(item => (
                                               
                                                <CartItem key={item.id} productId={item.id} product={productDatabase[item.barcode]}
                                                    setCartItems={setCartItems}
                                                />
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total:</span>
                                        <span>₹
                                            {total}</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-between">
                                    <button
                                        onClick={() => setActiveStep('scan')}
                                        className="mt-2 bg-black hover:bg-green-700 text-white font-small rounded-3xl py-2 px-4 rounded"
                                    >
                                        Back to Scan
                                    </button>
                                    <button
                                        onClick={() => setActiveStep('pay')}
                                        className="mt-2 bg-black hover:bg-green-700 text-white font-small rounded-3xl py-2 px-4 rounded"
                                        disabled={cartItems.length === 0}
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeStep === 'pay' && (
                            <div>
                            <h2 className="text-xl font-bold mb-4">Payment</h2>
                            <div className="mb-6">
                                <p className="font-bold text-lg mb-2">Total: ₹{total}</p>
                                
                                {/* Payment Method Selection */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2">Payment Method</label>
                                    <div className="flex space-x-4 mb-4">
                                        <button className="flex items-center justify-center p-3 border rounded-lg flex-1 bg-white hover:bg-gray-50">
                                            <span className="mr-2">💳</span> Card
                                        </button>
                                        <button className="flex items-center justify-center p-3 border rounded-lg flex-1 bg-white hover:bg-gray-50">
                                            <span className="mr-2">📱</span> UPI
                                        </button>
                                    </div>
                                </div>
                        
                                {/* Card Payment Form */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-gray-700 mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="flex space-x-4">
                                        <div className="flex-1">
                                            <label className="block text-gray-700 mb-1">Expiry</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-gray-700 mb-1">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                    </div>
                                </div>
                        
                                {/* UPI Payment Form */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-gray-700 mb-1">UPI ID</label>
                                        <input
                                            type="text"
                                            placeholder="yourname@upi"
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="flex items-center justify-center p-2 border rounded-lg bg-white hover:bg-gray-50">
                                            <img src="https://img.icons8.com/?size=100&id=am4ltuIYDpQ5&format=png&color=000000" alt="Google Pay" className="h-6 w-6" />
                                        </button>
                                        <button className="flex items-center justify-center p-2 border rounded-lg bg-white hover:bg-gray-50">
                                            <img src="https://img.icons8.com/?size=100&id=OYtBxIlJwMGA&format=png&color=000000" alt="PhonePe" className="h-6 w-6" />
                                        </button>
                                        <button className="flex items-center justify-center p-2 border rounded-lg bg-white hover:bg-gray-50">
                                            <img src="https://img.icons8.com/?size=100&id=68067&format=png&color=000000" alt="Paytm" className="h-6 w-6" />
                                        </button>
                                        <button className="flex items-center justify-center p-2 border rounded-lg bg-white hover:bg-gray-50">
                                            <img src="https://img.icons8.com/?size=100&id=5RcHTSNy4fbL&format=png&color=000000" alt="BHIM" className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-between">
                                <button
                                    onClick={() => setActiveStep('review')}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Back to Cart
                                </button>
                                <button
                                    onClick={() => setPayment(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    disabled={cartItems.length === 0}
                                >
                                    Pay Now
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                </div>) : <PaymentSuccess totalAmount={total} setPayment={setPayment} cartItems={cartItems}/>}
        </div>
    );
}
