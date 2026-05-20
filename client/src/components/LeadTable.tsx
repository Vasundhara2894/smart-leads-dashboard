interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

interface LeadTableProps {
  leads: Lead[];

  onView: (lead: Lead) => void;

  onEdit: (lead: Lead) => void;

  onDelete: (id: string) => void;
}

const LeadTable = ({
  leads,
  onView,
  onEdit,
  onDelete
}: LeadTableProps) => {

  const getStatusColor = (status: string) => {

    switch (status) {

      case "Qualified":
        return "bg-emerald-100 text-emerald-700";

      case "Contacted":
        return "bg-sky-100 text-sky-700";

      case "Lost":
        return "bg-rose-100 text-rose-700";

      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  return (

    <table className="w-full min-w-[700px]">

      <thead className="bg-[#eef2ff]">

        <tr>

          <th className="text-left px-6 py-4 text-sm font-semibold text-[#312e81]">
            Name
          </th>

          <th className="text-left px-6 py-4 text-sm font-semibold text-[#312e81]">
            Email
          </th>

          <th className="text-left px-6 py-4 text-sm font-semibold text-[#312e81]">
            Status
          </th>

          <th className="text-left px-6 py-4 text-sm font-semibold text-[#312e81]">
            Source
          </th>

          <th className="text-left px-6 py-4 text-sm font-semibold text-[#312e81]">
            Actions
          </th>

        </tr>

      </thead>

      <tbody>

        {leads.map((lead) => (

          <tr
            key={lead._id}
            className="border-b border-gray-100 hover:bg-gray-50 transition"
          >

            {/* NAME */}
            <td className="px-6 py-5 text-gray-800 font-medium">
              {lead.name}
            </td>

            {/* EMAIL */}
            <td className="px-6 py-5 text-gray-600">
              {lead.email}
            </td>

            {/* STATUS */}
            <td className="px-6 py-5">

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}
              >
                {lead.status}
              </span>

            </td>

            {/* SOURCE */}
            <td className="px-6 py-5 text-gray-600">
              {lead.source}
            </td>

            {/* ACTIONS */}
            <td className="px-6 py-5">

              <div className="flex items-center gap-3">

                {/* VIEW */}
                <button
                  onClick={() => onView(lead)}
                  className="bg-sky-100 hover:bg-sky-200 text-sky-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  View
                </button>

                {/* EDIT */}
                <button
                  onClick={() => onEdit(lead)}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => onDelete(lead._id)}
                  className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  Delete
                </button>

              </div>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
};

export default LeadTable;