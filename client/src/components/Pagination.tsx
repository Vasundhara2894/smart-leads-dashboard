interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  setPage
}: PaginationProps) => {

  return (

    <div className="flex items-center justify-between px-6 py-5 bg-gray-50">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="bg-white border border-gray-200 px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 disabled:opacity-40"
      >
        Previous
      </button>

      <p className="text-sm text-gray-600">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </p>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;