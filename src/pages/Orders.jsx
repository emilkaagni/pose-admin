// import { useState, useEffect } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     if (!token) {
//       return null;
//     }
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/order/list`,
//         {}, // Empty object as body
//         {
//           headers: {
//             token, // Properly set the token in headers
//           },
//         }
//       );
//       if (response.data.success) {
//         setOrders(response.data.orders);
//         console.log(response.data.orders);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {orders.map((order, index) => (
//           <div key={index}>
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <div>
//                 {order.items.map((item, index) => (
//                   <p key={index}>
//                     {item.name} x {item.quantity}
//                     <span> {item.size} </span>
//                     {index === order.items.length - 1 ? "" : ","}
//                   </p>
//                 ))}
//               </div>
//               <p>{order.address.firstName + " " + order.address.lastName}</p>
//               <div>
//                 <p>{order.address.street + ","}</p>
//                 <p>{order.address.city + "," + order.address.landmark + ","}</p>
//               </div>
//               <p>{order.address.phone}</p>
//             </div>
//             <div>
//               <p>Items : {order.items.length}</p>
//               <p>Method : {order.paymentMethod}</p>
//               <p>Payment : {order.payment ? "Done" : "Pending"}</p>
//               <p>Date : {new Date(order.date).toLocaleDateString()}</p>
//             </div>
//             <p>
//               {currency}
//               {order.amount}
//             </p>
//             <select>
//               <option value="Order Placed">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Out For Delivery">Out For Delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;


import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h3>
      <div className="grid gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-start gap-6 sm:gap-8"
          >
            {/* Parcel Icon */}
            <div className="flex-shrink-0">
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              />
            </div>

            {/* Order Details and Customer Info (Left Column) */}
            <div className="flex-1">
              {/* Order Details */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 text-lg sm:text-xl mb-3">Order Details</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <p
                      key={index}
                      className="text-gray-700 text-sm sm:text-base"
                    >
                      <span className="font-medium">{item.name}</span> x {item.quantity}{" "}
                      <span className="text-gray-500 text-xs">({item.size})</span>
                      {index !== order.items.length - 1 && <span>,</span>}
                    </p>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-gray-800 text-lg sm:text-xl mb-3">Customer Info</h3>
                <div className="text-gray-600 text-sm sm:text-base space-y-1">
                  <p className="font-medium text-gray-800">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>
                    {order.address.street}, {order.address.city}, {order.address.landmark}
                  </p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
            </div>

            {/* Order Summary (2nd Column) */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg sm:text-xl mb-3">Order Summary</h3>
              <div className="text-gray-700 text-sm sm:text-base space-y-2">
                <p>
                  <span className="font-semibold">Items:</span> {order.items.length}
                </p>

                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>

              </div>
            </div>

            {/* Payment info */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg sm:text-xl mb-3">Billing Info</h3>
              <div className="text-gray-700 text-sm sm:text-base space-y-2">

                <p>
                  <span className="font-semibold">Method:</span> {order.paymentMethod}
                </p>
                <p>
                  <span className="font-semibold">Payment:</span> {order.payment ? "Done" : "Pending"}
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {currency}
                  {order.amount}
                </p>
              </div>
            </div>

            {/* Order Status & Payment (Right Column) */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-lg sm:text-xl mb-3">Order Status</h3>
              <select
                value={order.status}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 w-full mb-4"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          </div>


        ))}
      </div>
    </div>
  );
};

export default Orders
