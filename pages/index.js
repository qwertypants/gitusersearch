import Head from "next/head";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Octokit} from "@octokit/core";
import Pagination from "../components/Pagination";
import Details from "../components/Details";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import {mockResults} from "../__mock/results";

export const config = {
  per_page: 15,
}

const NotFound = ({searchQuery, allResults, loading}) => {
  if (searchQuery.q && allResults.items.length === 0 && !loading) {
    return <p className="p-5 pl-0">No results found 😿</p>
  }
  return null;
}

const Loading = ({loading}) => {
  if (loading) {
    return (
      <div className="flex justify-center m-20">
        <Image
          className="animate-spin-slow"
          src="/Octocat.png"
          alt="loading"
          width={300}
          height={300}
        />
      </div>
    );
  }
  return null;
}

export default function Home(props) {
  const {auth, query} = props;
  const [searchQuery, setSearchQuery] = useState(query);
  const [allResults, setAllResults] = useState({items: [], total_count: 0});
  const [currentUsername, setCurrentUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const octokit = new Octokit({auth});
  const {items, total_count: total} = allResults;
  const {page} = searchQuery;

  useEffect(() => {
    if (searchQuery?.q) {
      setLoading(true);
      octokit
        .request('GET /search/users', searchQuery)
        .then(res => {
          setAllResults(res.data);
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [searchQuery]);

  return (
    <div>
      <Head>
        <title>Git Search</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className="m-auto max-w-4xl ">
        <SearchForm setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                    loading={loading}/>
        <NotFound searchQuery={searchQuery}
                  allResults={allResults}
                  loading={loading}/>
        <Loading loading={loading}/>
        <SearchResults items={items}
                       setCurrentUserName={setCurrentUsername}/>
        <Details username={currentUsername}
                 auth={auth}/>
        <Pagination page={page}
                    total={total}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}/>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const {per_page} = config;
  return {
    props: {
      auth: process.env.ACCESS_TOKEN,
      query: {
        page: 1,
        per_page,
      }
    }
  }
}