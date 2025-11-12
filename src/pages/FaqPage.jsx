import React from "react";
import { FaArrowDown } from "react-icons/fa";

const faqItems = [
  {
    q: "How can I pay my utility bill online?",
    a: "You can pay your utility bill easily through our secure portal. Simply log in, navigate to the 'Payments' section, select your preferred payment method (credit card, debit card, or bank transfer), and confirm the transaction.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as direct bank transfers. We are constantly working to integrate new, convenient payment options for our users.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes, absolutely. We use industry-standard encryption (SSL/TLS) and comply with all necessary data protection regulations to ensure your payment information is kept safe and confidential at all times.",
  },
  {
    q: "How long does it take for a payment to process?",
    a: "Payments are typically processed instantly. However, depending on your bank, it may take up to 24 hours for the transaction to reflect in your utility provider's account. Always check your confirmation email for details.",
  },
  {
    q: "What if I made a payment error?",
    a: "If you believe you have made an error, please contact our support team immediately with your transaction ID. We will review the payment details and assist you in correcting the mistake or processing a refund if necessary.",
  },
];

const FaqItem = ({ question, answer }) => {
  return (
    <details className="group bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-xl">
      <summary className="cursor-pointer flex justify-between items-center text-xl font-semibold text-[#3468c0] focus:outline-none py-1 list-none">
        {question}

        <FaArrowDown />
      </summary>
      <div className="mt-4 pt-4 border-t border-gray-200 text-[#706f6f]">
        {answer}
      </div>
    </details>
  );
};

export default function FaqPage() {
  return (
    <div className="bg-[#f0f0f0] min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-[#001c30] text-center mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FaqItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}
