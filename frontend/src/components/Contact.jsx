import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center">
            Contact Us
          </h1>
          
          <div className="space-y-8 text-lg">
            <p className="text-gray-800 leading-relaxed text-center">
              We'd love to hear from you! Whether you have a question about our services, need technical support, or want to explore how we can help your business, our team is ready to assist you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Get in Touch</h2>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span className="text-gray-800">support@inventorysystem.com</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <span className="text-gray-800">+1 (555) 123-4567</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-purple-700 mb-4">Visit Us</h2>
                <p className="text-gray-800 leading-relaxed">
                  123 Inventory Street<br />
                  Suite 456<br />
                  Stockville, IN 78901<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="bg-pink-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-pink-700 mb-4">Business Hours</h2>
              <p className="text-gray-800">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-xl font-semibold text-purple-600 mb-4">
                Ready to optimize your inventory management?
              </p>
              <a href="#" className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full hover:from-indigo-600 hover:to-purple-700 transition-colors duration-300">
                Request a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;