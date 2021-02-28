import {useEffect, useState} from "react";
import {Octokit} from "@octokit/core";

const LineItem = ({title, value}) => {
  if (!value) return null;
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
        {title}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
        {value}
      </dd>
    </div>
  )
}

export default function Details({username, auth}) {
  const octokit = new Octokit({auth});
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const {name, login, avatar_url, bio, company, followers, following, location, public_gists, public_repos} = user;

  useEffect(() => {
    if (username) {
      octokit
        .request('GET /users/{username}', {
          username
        })
        .then(res => {
          setUser(res.data);
          setOpen(true);
        });
    }
  }, [username]);

  return (
    <div className={`fixed inset-0 overflow-hidden z-20 ${open ? '' : 'hidden'}`}>
      <div className="absolute inset-0 overflow-hidden">
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16"
                 aria-labelledby="slide-over-heading">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 id="slide-over-heading" className="text-lg font-medium text-gray-900">
                    Profile
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={() => setOpen(false)}
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                      <span className="sr-only">Close panel</span>

                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="pb-1 sm:pb-6">
                  <div>
                    <div className="relative h-40 sm:h-56">
                      <img className="absolute h-full w-full object-cover"
                           src={avatar_url}
                           alt={name}/>
                    </div>
                    <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                      <div className="sm:flex-1">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">{name}</h3>
                          </div>
                          <p className="text-sm text-gray-500">@{login}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                  <dl className="space-y-8 px-4 sm:px-6 sm:space-y-6">
                    <LineItem title={'Bio'} value={bio}/>
                    <LineItem title={'Location'} value={location}/>
                    <LineItem title={'Company'} value={company}/>
                    <LineItem title={'Followers'} value={followers}/>
                    <LineItem title={'Following'} value={following}/>
                    <LineItem title={'Public Gists'} value={public_gists}/>
                    <LineItem title={'Public Repos'} value={public_repos}/>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
};
