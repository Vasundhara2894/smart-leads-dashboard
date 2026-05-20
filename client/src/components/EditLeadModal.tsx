import { useEffect, useState } from "react";
import axios from "axios";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  refreshLeads: () => void;
}

const EditLeadModal = ({
  isOpen,
  onClose,
  lead,
  refreshLeads
}: EditLeadModalProps) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website"
  });

  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {

    if (lead) {

      setFormData({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source
      });
    }

  }, [lead]);

  if (!isOpen || !lead) return null;

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

      await axios.put(
        `${API_URL}/leads/${lead._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      refreshLeads();

      onClose();

    } catch (error) {

      console.log(error);

      alert("Failed to update lead");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Edit Lead
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          >

            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>

          </select>

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          >

            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>

          </select>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl"
            >
              {loading ? "Updating..." : "Update Lead"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditLeadModal;