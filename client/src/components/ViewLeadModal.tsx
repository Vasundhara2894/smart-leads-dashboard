interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

interface ViewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

const ViewLeadModal = ({
  isOpen,
  onClose,
  lead
}: ViewLeadModalProps) => {

  if (!isOpen || !lead) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Lead Details
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ×
          </button>

        </div>

        <div className="space-y-4 text-gray-700">

          <div>
            <p className="text-sm text-gray-400">
              Name
            </p>

            <h3 className="text-lg font-semibold">
              {lead.name}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Email
            </p>

            <h3 className="text-lg font-semibold">
              {lead.email}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Status
            </p>

            <h3 className="text-lg font-semibold">
              {lead.status}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Source
            </p>

            <h3 className="text-lg font-semibold">
              {lead.source}
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ViewLeadModal;