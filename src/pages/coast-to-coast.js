import React from "react";
import { ToWords } from 'to-words';

import SEO from "../components/seo";
import Hero from "../components/hero";
import { Link } from "gatsby";

const toWords = new ToWords();

const C2C = () => {
  // TODO: graphql query to strapi for strava weeks
  const weeks = [
    {
      id: 38,
      fromDate: 'April 5',
      toDate: 'April 11',
      totalDistance: {
        cycle: 130,
        run: 16,
        kayak: 10,
      }
    },
    {
      id: 2,
      fromDate: 'March 29',
      toDate: 'April 4',
      totalDistance: {
        cycle: 90,
        run: 20,
        kayak: 60,
      }
    },
    {
      id: 1,
      fromDate: 'March 22',
      toDate: 'March 29',
      totalDistance: {
        cycle: 120,
        run: 30,
        kayak: 50,
      }
    },
  ];

  return (
    <>
      <SEO title="Coast to Coast" />
      <Hero
        text="Coast to Coast: Since 1983, people have tested themselves against the elements, against each other and against themselves."
        highlights={["Coast to Coast"]}
      />
      <p className="reading-view page-blurb">
        I'm training for the <a href="https://www.coasttocoast.co.nz/" target="_blank" rel="noopener noreferrer" className="highlight">Kathmandu Coast to Coast</a>, a race from the west coast → east coast of New Zealand.<br />
        The race invloves running, cycling and kayaking.<br />
        This is my first race of this caliber, follow my journey from novice to athlete (hopefully) below.
      </p>
      <hr />
      <div className="posts reading-view">
        {
          weeks.map(week => (
            <Link className="blog" key={week.id}>
              <h2 className="blog-title">{`Week ${toWords.convert(week.id)}`}</h2>
              <h5 className="blog-subtitle">
                {week.fromDate} → {week.toDate}
              </h5>
              {/* TODO: add chart.js for horizontal bar charts for total distances */}
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default C2C;
