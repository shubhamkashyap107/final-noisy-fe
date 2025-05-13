import React from 'react'
import Navbar from './Navbar'

const RefundPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 min-h-screen">
        <h1 className="text-4xl font-bold text-pink-600 mb-6">Refund Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: <span className="italic">12/5/25</span></p>

        <p className="mb-6">
          Welcome to <strong>Noisy</strong> (<a href="https://noisy.co.in" className="text-pink-500 underline">noisy.co.in</a>). This Refund Policy outlines the terms and conditions under which we offer refunds for any paid services. By using our platform, you agree to the terms outlined in this policy.
        </p>

        <h2 className="text-2xl font-semibold text-pink-500 mt-10 mb-4">1. Eligibility for Refund</h2>
        <p className="mb-6">Refunds are available for users who have experienced issues with the platform that significantly impact the user experience. If you feel your service was not as described or there was an issue with the platform, you may be eligible for a refund.</p>

        <h2 className="text-2xl font-semibold text-pink-500 mt-10 mb-4">2. Refund Process</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>To request a refund, contact our support team at <a href="mailto:support@noisy.co.in" className="text-pink-500 underline">support@noisy.co.in</a>.</li>
          <li>Include details of your purchase and the issue you encountered with the service.</li>
          <li>Refund requests must be made within 14 days of the purchase date to be considered.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-500 mt-10 mb-4">3. Non-Refundable Services</h2>
        <p className="mb-6">Certain services, such as those related to personalized or one-time use, may not be eligible for a refund. We reserve the right to determine which services are non-refundable.</p>

        <h2 className="text-2xl font-semibold text-pink-500 mt-10 mb-4">4. Refund Processing Time</h2>
        <p className="mb-6">Once your refund request is approved, we will process the refund within 7-10 business days. The amount will be refunded to your original payment method.</p>

        <h2 className="text-2xl font-semibold text-pink-500 mt-10 mb-4">5. Modifications to Refund Policy</h2>
        <p className="mb-6">
          We may update this Refund Policy from time to time. Any changes will be posted on this page with an updated effective date. Please review this policy periodically.
        </p>

        <h2 className="text-2xl font-semibold text-pink-500 mt-10 mb-4">6. Contact Us</h2>
        <p className="mb-1">If you have any questions or concerns regarding our refund policy, feel free to contact us:</p>
        <p className="mb-6">Email: <a href="mailto:support@noisy.co.in" className="text-pink-500 underline">support@noisy.co.in</a></p>

        <p className="italic">Thank you for being part of the Noisy community.</p>
      </div>
    </>
  )
}

export default RefundPolicy
