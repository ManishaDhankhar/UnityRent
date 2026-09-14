export const BACKEND_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BACKEND_URL) || 
  (typeof process !== 'undefined' && process.env && process.env.BACKEND_URL) || 
  "https://unityrent.onrender.com";

export default BACKEND_URL;