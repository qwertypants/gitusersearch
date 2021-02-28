import {useState} from 'react';

export default function SearchForm({searchQuery, setSearchQuery}) {
  const [username, setUsername] = useState('');

  function handleSearch(event) {
    event.preventDefault();
    const newQuery = {
      ...searchQuery,
      page: 1,
      items: 0,
      q: username
    };
    setSearchQuery(newQuery);
  }

  const disableButton = username?.length === 0;

  return (
    <form onSubmit={handleSearch} id="search" className="sticky top-0 z-10 px-2">
      <div
        className="bg-white mt-6 pt-4 pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Search Github Users
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <label htmlFor="search-users" className="sr-only">SearchForm</label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                     fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"/>
                </svg>
              </div>
              <input type="text" name="search-users" id="search-users"
                     onChange={(event) => setUsername(event.target.value)}
                     className=" focus:ring-red-500 focus:border-red-500 w-full rounded-none rounded-l-md pl-10  sm:text-sm border-gray-300"
              />
            </div>
            <button type="button"
                    onClick={handleSearch}
                    disabled={disableButton}
                    className={`${disableButton ? 'opacity-50' : ''} -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}>
              <span className="ml-2">Search</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}