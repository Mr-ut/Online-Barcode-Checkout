import { motion } from 'framer-motion';
import { CheckCircle, Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

const PaymentSuccess = ({totalAmount, setPayment, cartItems}) => {
  const receiptRef = useRef();

  const handleDownload = useReactToPrint({
    content: () => receiptRef.current,
    pageStyle: `
      @page {
        size: auto;
        margin: 5mm;
      }
      @media print {
        body { 
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
          background: white;
        }
        .no-print {
          display: none !important;
        }
        .receipt-container {
          box-shadow: none;
          border: none;
          width: 100%;
        }
      }
    `,
    documentTitle: `receipt_${new Date().toISOString().split('T')[0]}`,
    removeAfterPrint: true
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price ), 0);
  const tax = subtotal * 0.1; // 10% tax example
  const grandTotal = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full" ref={receiptRef}>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          
        >
          {/* Header */}
          <div className="bg-green-50 p-6 flex justify-between items-start">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex items-center"
              >
                <CheckCircle className="h-10 w-10 text-green-500 mr-3" />
                <h1 className="text-2xl font-bold text-gray-800">Payment Successful</h1>
              </motion.div>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 mt-2"
              >
                {new Date().toLocaleString()}
              </motion.p>
            </div>
            
          </div>

          {/* Receipt Content */}
          <div className="p-6">
            {/* Order Summary */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="flex justify-between py-2 border-b border-gray-100"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">{1}x</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-gray-800">₹{(item.price ).toFixed(2)}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Totals */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 space-y-2"
            >
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </motion.div>

            {/* Payment Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 p-4 bg-gray-50 rounded-lg"
            >
              <h3 className="font-medium text-gray-800 mb-2">Payment Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Payment Method:</div>
                <div className="text-gray-800">Credit Card (****4242)</div>
                <div className="text-gray-500">Transaction ID:</div>
                <div className="text-gray-800">TXN{Math.floor(Math.random() * 100000000)}</div>
                <div className="text-gray-500">Status:</div>
                <div className="text-green-600 font-medium">Completed</div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="no-print p-6 border-t border-gray-200 text-center"
          >
            <button
              onClick={handleDownload}
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium mr-4"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Receipt
            </button>
            {/* <button className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-lg font-medium">
              Back to Home
            </button> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
export default PaymentSuccess;