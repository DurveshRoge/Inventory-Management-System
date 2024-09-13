// // src/components/LoginForm.jsx
// import React, { useState } from 'react';

// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('YOUR_BACKEND_URL/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });
//             const data = await response.json();
//             if (data.token) {
//                 localStorage.setItem('token', data.token);
//                 window.location.href = '/protected';
//             } else {
//                 setError(data.message);
//             }
//         } catch (err) {
//             setError('Something went wrong!');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Login</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     className="w-full px-3 py-2 border rounded"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="w-full px-3 py-2 border rounded"
//                 />
//                 <button
//                     type="submit"
//                     className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                     Login
//                 </button>
//                 {error && <p className="text-red-500">{error}</p>}
//             </form>
//         </div>
//     );
// };

// export default LoginForm;
