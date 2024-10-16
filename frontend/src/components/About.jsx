import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-8 text-center">
            About Our Inventory Management System
          </h1>
          
          <div className="space-y-6 text-lg">
            <p className="text-gray-800 leading-relaxed">
              Welcome to our cutting-edge inventory management system. We are passionate about empowering businesses with efficient and user-friendly solutions to manage their inventory effectively.
            </p>
            
            <div className="bg-indigo-100 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <p className="text-indigo-700 font-semibold">
                Our mission is to streamline your inventory processes, helping you save time and reduce costs.
              </p>
            </div>
            
            <p className="text-gray-800 leading-relaxed">
              Our system is meticulously designed to help you track products, manage stock levels, and optimize your inventory processes. Whether you're a small business or a large enterprise, our scalable tools are tailored to meet your unique needs.
            </p>
            
            <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <p className="text-purple-700 font-semibold">
                From real-time tracking to insightful analytics, we provide the tools you need to make informed decisions and grow your business.
              </p>
            </div>
            
            <p className="text-gray-800 leading-relaxed">
              We understand that every business is unique, which is why our system is flexible and customizable to fit your specific requirements. Our dedicated team is committed to providing exceptional support and continuously improving our platform to meet the evolving needs of our clients.
            </p>
            
            <div className="text-center mt-8">
              <p className="text-xl font-semibold text-indigo-600">
                Have questions or need support? We're here to help!
              </p>
              <a href="/contact" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full hover:from-purple-600 hover:to-indigo-700 transition-colors duration-300">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;