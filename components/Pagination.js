import {config} from "../pages";

export default function Pagination({page, total, setSearchQuery, searchQuery}) {
  const {per_page} = config;
  if (total <= per_page) return null;

  const disablePrevious = page === 1;
  const disableNext = per_page * page >= total;
  const pages = Math.floor(total / per_page);

  function handleClick(number) {
    const newSearch = {
      ...searchQuery,
      page: number,
    };
    setSearchQuery(newSearch);
  }

  return (
    <nav
      className="sticky bottom-0 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination">
      <div className="">
        <p className="text-sm text-gray-700">
          Page <span className="font-medium">{page}</span>&nbsp;
          of <span className="font-medium">{pages}</span>&nbsp;
          Total <span className="font-medium">{total}</span>
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button onClick={() => handleClick(page - 1)}
                disabled={disablePrevious}
                className={`${disablePrevious ? 'opacity-50 cursor-not-allowed' : ''} relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}>
          Previous
        </button>
        <button onClick={() => {
          handleClick(page + 1);
          window.scroll({top: 0, behavior: 'smooth'});
        }}
                className={`${disableNext ? 'opacity-50 cursor-not-allowed' : ''} ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}>
          Next
        </button>
      </div>
    </nav>
  )
}
