import React from 'react'
import Navbar from './Navbar'

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-4xl font-bold text-pink-600 mb-6">Contact Us</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: <span className="italic">12/5/25</span></p>

        <p className="mb-6 text-lg">
          We'd love to hear from you! Whether you have questions, feedback, or just want to connect, feel free to reach out through any of the platforms below:
        </p>

        <div className="space-y-4 mb-6">
          <p className="text-lg">
            <strong>Email:</strong> <a href="mailto:shubham@noisy.co.in" className="text-pink-500 underline">shubham@noisy.co.in</a>
          </p>
          <p className="text-lg">
            <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/shubhamxkashyap" className="text-pink-500 underline" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/shubhamxkashyap</a>
          </p>
          <p className="text-lg">
            <strong>Instagram:</strong> <a href="https://www.instagram.com/shubhaxkashyap" className="text-pink-500 underline" target="_blank" rel="noopener noreferrer">shubhaxkashyap</a>
          </p>
          <p className="text-lg">
            <strong>YouTube:</strong> <a href="https://www.youtube.com/@Shubhamxkashyap" className="text-pink-500 underline" target="_blank" rel="noopener noreferrer">www.youtube.com/@Shubhamxkashyap</a>
          </p>
        </div>

        <p className="italic text-lg">
          Thank you for being part of the Noisy community! We look forward to connecting with you.
        </p>
      </div>
    </>
  )
}

export default ContactUs
