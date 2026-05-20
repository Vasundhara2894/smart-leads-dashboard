interface NavbarProps {
  onLogout: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {

  return (

    <div className="bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#1e293b]">
            Lead Dashboard
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Track and manage all your leads
          </p>

        </div>

        <div className="flex items-center gap-3">

          <a
            href="http://localhost:5000/api/leads/export/csv"
            target="_blank"
            rel="noreferrer"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
          >
            Export CSV
          </a>

          <button
            onClick={onLogout}
            className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Navbar;