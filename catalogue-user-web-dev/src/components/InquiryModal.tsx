"use client";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegCircleCheck } from "react-icons/fa6";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const InquiryModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white relative flex text-black mx-3 flex-col rounded-lg shadow-lg w-96 p-6 transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-90"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h1 className="text-2xl font-semibold mb-4">Inquiry Form</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-900 focus:border-blue-900 focus:outline-none text-blue-950"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-900 focus:border-blue-900 focus:outline-none text-blue-950"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              className="w-full p-2 border border-gray-300 rounded resize-none focus:ring-blue-900 focus:border-blue-900 focus:outline-none text-blue-950"
              rows={4}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 btn"
            >
              <FaRegCircleCheck className="text-xl" />
              Submit
            </button>
          </form>
        </div>
        <IoIosCloseCircleOutline
          className="text-black text-3xl cursor-pointer absolute top-4 right-4"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default InquiryModal;
