import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import LeadTable from "../components/LeadTable";
import Pagination from "../components/Pagination";

import AddLeadModal from "../components/AddLeadModal";
import EditLeadModal from "../components/EditLeadModal";
import ViewLeadModal from "../components/ViewLeadModal";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

const Dashboard = () => {

  const [leads, setLeads] = useState<Lead[]>([]);


  const [search, setSearch] = useState("");

  const [debouncedSearch] =
    useDebounce(search, 500);

  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");

 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [openEditModal, setOpenEditModal] =
    useState(false);

  
  const [openViewModal, setOpenViewModal] =
    useState(false);

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

 
  const fetchLeads = async () => {

    try {

      setLoading(true);

      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_URL}/leads?search=${debouncedSearch}&status=${status}&source=${source}&page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLeads(response.data?.leads || []);

      setTotalPages(response.data?.totalPages || 1);

    } catch (error) {

      console.log(error);

      setError("Failed to fetch leads");

      setLeads([]);

    } finally {

      setLoading(false);

    }
  };


  const handleDelete = async (id: string) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `${API_URL}/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchLeads();

    } catch (error) {

      console.log(error);

      alert("Failed to delete lead");
    }
  };


  const handleEdit = (lead: Lead) => {

    setSelectedLead(lead);

    setOpenEditModal(true);
  };

 
  const handleView = (lead: Lead) => {

    setSelectedLead(lead);

    setOpenViewModal(true);
  };


  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/login";
  };

  useEffect(() => {

    fetchLeads();

  }, [debouncedSearch, status, source, page]);

  return (

    <div className="min-h-screen bg-[#f5f7fb]">

   
      <Navbar onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6">

      
        <FilterBar
          search={search}
          status={status}
          source={source}
          setSearch={setSearch}
          setStatus={setStatus}
          setSource={setSource}
          setPage={setPage}
        />

      
        <div className="flex justify-end mb-4">

          <button
            onClick={() => setOpenModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-medium"
          >
            + Add Lead
          </button>

        </div>

        {error && (

          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">

            {error}

          </div>

        )}

    
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">

          {loading ? (

            <div className="p-10 text-center">

              <div className="animate-pulse text-indigo-600 text-lg">
                Loading leads...
              </div>

            </div>

          ) : leads.length === 0 ? (

            <div className="p-10 text-center">

              <h2 className="text-xl font-semibold text-gray-600">
                No Leads Found
              </h2>

              <p className="text-gray-400 mt-2">
                Try changing filters or add new leads
              </p>

            </div>

          ) : (

            <>
          
              <div className="overflow-x-auto">

                <LeadTable
                  leads={leads}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

              </div>

          
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />

            </>

          )}

        </div>

      </div>

      <AddLeadModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        refreshLeads={fetchLeads}
      />

    
      <EditLeadModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        lead={selectedLead}
        refreshLeads={fetchLeads}
      />

     
      <ViewLeadModal
        isOpen={openViewModal}
        onClose={() => setOpenViewModal(false)}
        lead={selectedLead}
      />

    </div>
  );
};

export default Dashboard;