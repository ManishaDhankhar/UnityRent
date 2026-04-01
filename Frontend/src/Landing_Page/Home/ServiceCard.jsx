
// const ServiceCard = ({ service }) => {
//   return (
//     <div className="border rounded-lg shadow-md p-4 flex flex-col gap-2">
//       <img 
//         src={service.image} 
//         alt={service.serviceName} 
//         className="w-full h-48 object-cover rounded-md"
//       />
//       <div className="flex justify-between items-center">
//         <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded">
//           {service.category}
//         </span>
//         <span className="text-yellow-500 font-semibold">
//           ★ {service.rating}
//         </span>

//       </div>
//       <h3 className="text-xl font-bold">{service.serviceName}</h3>
//       <p className="text-gray-600 text-sm line-clamp-2">{service.description}</p>
//       <p className="text-sm italic text-gray-500">By {service.providerName}</p>
//       <div className="mt-auto pt-4 flex justify-between items-center border-t">
//         <span className="text-lg font-bold text-green-600">
//           ₹{service.price} <small className="text-gray-500 text-xs">{service.priceUnit}</small>
//         </span>
//         <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
//           Book Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;