interface FilterBarProps {
  search: string;
  status: string;
  source: string;

  setSearch: (value: string) => void;
  setStatus: (value: string) => void;
  setSource: (value: string) => void;

  setPage: (page: number) => void;
}

const FilterBar = ({
  search,
  status,
  source,
  setSearch,
  setStatus,
  setSource,
  setPage
}: FilterBarProps) => {

  return (

    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300"
        />

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300"
        >

          <option value="">
            All Status
          </option>

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
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-300"
        >

          <option value="">
            All Sources
          </option>

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

      </div>

    </div>
  );
};

export default FilterBar;