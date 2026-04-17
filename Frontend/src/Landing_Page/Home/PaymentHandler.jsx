// import axios from 'axios';

// const loadRazorpayScript=()=>{
//     // lazy loading 
//     return new Promise((resolve)=>{
//         const script=document.createElement("script");
//         script.src="https://checkout.razorpay.com/v1/checkout.js";
//         script.onload=()=>resolve(true);
//         script.onerror=()=>resolve(false);

//         document.body.appendChild(script);
//     });
// };

// export const processPayment=async(bookingData,navigate)=>{
//        const isScriptLoaded=await loadRazorpayScript();

//        if(!isScriptLoaded){
//         alert("Razorpay is not able to load, please check your internet connection");
//         return;
//        }

//      try{
//         const response=await axios.post("http://localhost:8080/api/booking/new",bookingData);
//         console.log("Backend Response:", response.data);
//         const { bookingId, amountToPay, razorpayOrderId } = response.data;

//         // 2. Configuration for the Razorpay Popup
//         const options = {
//             key: "rzp_test_SdQyahlRvGquqk",
//             amount:amountToPay * 100,
//             currency: "INR",
//             name: "UnityRent",
//             description: "Secure Rental Payment",
//             order_id: razorpayOrderId, 
//             handler: async function (response) {
                
//                 try {
//                     const verifyRes = await axios.post("http://localhost:8080/api/booking/verify", {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                         bookingId
//                     });

//                     if (verifyRes.status === 200) {
//                         console.log("Phone being saved:", bookingData.renterPhone);
//                         localStorage.setItem("userPhone", bookingData.renterPhone);
//                         navigate("/cart");
//                     }
//                 } catch (err) {
//                     alert("Payment verification failed. Please contact support.");
//                 }
//             },
//             prefill: {
//                 contact: bookingData.renterPhone,
//             },
//             theme: {
//                 color: "#002d5b", 
//             },
//         };

//         const paymentObject = new (window.Razorpay || window.default.Razorpay)(options);
//         paymentObject.open();
//      }catch(err){
//         console.error("Payment Initialization failed");
//         alert("Razorpay server is not working,error in loading");
//      }
// }

import axios from 'axios';

// Keeping this here so you don't have to delete it, 
// but we won't call it in the bypass logic.
const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export const processPayment = async (bookingData, navigate) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
        alert("Razorpay is not able to load. Check your connection.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:8080/api/booking/new", bookingData);
        const { bookingId, amountToPay, razorpayOrderId } = response.data;

        // --- BYPASS LOGIC START ---
        // We save the phone and prep the redirect BEFORE the payment is even finished.
        console.log("Saving data to cart immediately (Bypassing payment check)...");
        localStorage.setItem("userPhone", bookingData.renterPhone);
        
        // We set a small timeout to let the Razorpay popup initialize, then redirect
        setTimeout(() => {
            navigate("/cart");
        }, 3000); 
        // --- BYPASS LOGIC END ---

        const options = {
            key: "rzp_test_SdQyahlRvGquqk",
            amount: amountToPay * 100,
            currency: "INR",
            name: "UnityRent",
            description: "Secure Rental Payment",
            order_id: razorpayOrderId,
            handler: async function (response) {
                // This will still run if payment succeeds, but the redirect happened already
                console.log("Payment actually succeeded:", response);
            },
            prefill: {
                contact: bookingData.renterPhone,
            },
            theme: {
                color: "#002d5b",
            },
        };

        const paymentObject = new (window.Razorpay || window.default.Razorpay)(options);
        paymentObject.open();

    } catch (err) {
        // Even if Razorpay order creation fails, we try to force the cart view
        console.error("Razorpay Error, but forcing cart view...");
        localStorage.setItem("userPhone", bookingData.renterPhone);
        navigate("/cart");
    }
}

