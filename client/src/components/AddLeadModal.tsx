import { useState } from "react";
import axios from "axios";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshLeads: () => void;
}

const AddLeadModal = ({
  isOpen,
  onClose,
  refreshLeads
}: AddLeadModalProps) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website"
  });

  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/leads`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      refreshLeads();

      onClose();

      setFormData({
        name: "",
        email: "",
        status: "New",
        source: "Website"
      });

    } catch (error) {

      console.log(error);

      alert("Failed to create lead");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl font-bold text-gray-800">
            Add New Lead
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Enter lead name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />

          {/* STATUS */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300"
          >

            <option value="New">
              New
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Qualified">
              Qualified
            </option>

            <option value="Lost">
              Lost
            </option>

          </select>

          {/* SOURCE */}
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300"
          >

            <option value="Website">
              Website
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="Referral">
              Referral
            </option>

          </select>

          {/* BUTTONS */}
          <div className="flex items-center justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
            >
              {loading ? "Creating..." : "Create Lead"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddLeadModal;