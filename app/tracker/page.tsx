import React from 'react'
import matches from '@/app/tracker/matches.json';
import Match from '../components/Match';
import MatchesList from '../components/MatchesList';
import PageTitle from '../components/PageTitle';

const Tracker = async () => {
  console.log(matches);

  return (
    <>
      <header>
        <PageTitle title="PVP Tracker" />
      </header>
      <div className="divider"></div>
      <section id="matchInputSection" className="m-5">
        <h2 className="text-center">Match input section</h2>
      </section>
      <section id="contentSection" className="flex flex-wrap content-center justify-center sm:justify-start">
        <div className="w-[320px]">
          <MatchesList matches={matches} />
        </div>
        <div className="divider"></div>
        <div className="m-5">
          <h2 className="text-center">Statistics Section</h2>
        </div>
      </section>
    </>
  )
}

export default Tracker;