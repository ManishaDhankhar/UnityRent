// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function MyCart() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userPhone = localStorage.getItem("userPhone");

//   useEffect(() => {
//     if (userPhone) {
//       // Note: Ensure this URL matches your backend route exactly
//       axios.get(`http://localhost:8080/api/booking/my-cart/${userPhone}`)
//         .then(res => {
//           // Filter to show ONLY completed payments if you don't want to see failed ones
//           console.log("Full API Response:", res.data); // Debug: Check what's actually in the DB
//           setBookings(res.data); // Show everything first to test
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error("Cart Fetch Error:", err);
//           setLoading(false);
//         });
//     }
//   }, [userPhone]);

//   if (!userPhone) return <div style={{padding: '100px', textAlign: 'center', marginTop: '80px'}}>Please book an item first to see your cart.</div>;
//   if (loading) return <div style={{padding: '100px', textAlign: 'center', marginTop: '80px'}}>Loading your bookings...</div>;

//   return (
//     <div style={{ padding: '40px 5%', marginTop: '80px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//       <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111', marginBottom: '30px' }}>My Rental Bookings</h2>
      
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
//         {bookings.length > 0 ? bookings.map((booking) => (
//           <div 
//             key={booking._id} 
//             style={{ 
//               backgroundColor: 'white', 
//               borderRadius: '28px', 
//               padding: '20px', 
//               boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
//               border: '1px solid #f0f0f0' 
//             }}
//           >
//             {/* Blue background frame like FeaturedItems */}
//             <div style={{ backgroundColor: '#002d5b', borderRadius: '20px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '15px' }}>
//               <img 
//                 src={booking.product?.image} 
//                 alt={booking.product?.title} 
//                 style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} 
//               />
//             </div>

//             <div style={{ padding: '0 10px' }}>
//               <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 10px 0' }}>
//                 {booking.product?.title || "Product Name"}
//               </h3>
              
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
//                 <span style={{ backgroundColor: '#e6f4ea', color: '#1e7e34', padding: '5px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold' }}>
//                    {booking.paymentStatus}
//                 </span>
//                 <span style={{ fontWeight: '900', color: '#111' }}>
//                   {/* Fixed the data path to match your backend pricing object */}
//                   ₹{booking.pricing?.totalPayable}
//                 </span>
//               </div>

//               <p style={{ fontSize: '0.85rem', color: '#666', margin: '5px 0' }}>
//                 <strong>Booking ID:</strong> {booking._id.slice(-8).toUpperCase()}
//               </p>
//               <p style={{ fontSize: '0.85rem', color: '#666', margin: '5px 0' }}>
//                 <strong>Address:</strong> {booking.renterAddress}
//               </p>
//             </div>
//           </div>
//         )) : (
//           <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
//             <p style={{ color: '#888', fontSize: '1.1rem' }}>You haven't rented any UnityRent items yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyCart;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyCart() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userPhone = localStorage.getItem("userPhone");

  useEffect(() => {
    if (userPhone) {
      axios.get(`http://localhost:8080/api/booking/my-cart/${userPhone}`)
        .then(res => {
          console.log("Data from DB:", res.data);
          // We show all items, regardless of payment status, to verify the bypass
          setBookings(res.data); 
          setLoading(false);
        })
        .catch(err => {
          console.error("Cart Fetch Error:", err);
          setLoading(false);
        });
    }
  }, [userPhone]);

  if (!userPhone) return <div style={{padding: '100px', textAlign: 'center', marginTop: '80px'}}>Please book an item first to see your cart.</div>;
  if (loading) return <div style={{padding: '100px', textAlign: 'center', marginTop: '80px'}}>Loading your bookings...</div>;

  return (
    <div style={{ padding: '40px 5%', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111', marginBottom: '30px' }}>My Rental Bookings</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
        {bookings.length > 0 ? bookings.map((booking) => (
          <div 
            key={booking._id} 
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '28px', 
              padding: '20px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              border: '1px solid #f0f0f0' 
            }}
          >
            <div style={{ backgroundColor: '#002d5b', borderRadius: '20px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '15px' }}>
              <img 
                src={booking.product?.image} 
                alt={booking.product?.title} 
                style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} 
              />
            </div>

            <div style={{ padding: '0 10px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 10px 0' }}>
                {booking.product?.title || "Product Name"}
              </h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ 
                    backgroundColor: booking.paymentStatus === "COMPLETED" ? '#e6f4ea' : '#fff3cd', 
                    color: booking.paymentStatus === "COMPLETED" ? '#1e7e34' : '#856404', 
                    padding: '5px 12px', 
                    borderRadius: '10px', 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold' 
                }}>
                   {booking.paymentStatus || "PENDING"}
                </span>
                <span style={{ fontWeight: '900', color: '#111' }}>
                  ₹{booking.pricing?.totalPayable || booking.amountToPay}
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#666', margin: '5px 0' }}>
                <strong>Booking ID:</strong> {booking._id.slice(-8).toUpperCase()}
              </p>
              <p style={{ fontSize: '0.85rem', color: '#666', margin: '5px 0' }}>
                <strong>Address:</strong> {booking.renterAddress}
              </p>
            </div>
          </div>
        )) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
            <p style={{ color: '#888', fontSize: '1.1rem' }}>You haven't rented any UnityRent items yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCart;