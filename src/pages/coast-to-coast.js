import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import slugify from "slugify";
import { ToWords } from 'to-words';
import { ACTIVITY_WEEK_CORRECTION } from '../constants';

import SEO from "../components/seo";
import Hero from "../components/hero";
import TrainingWeekChart from '../components/training-week-chart';

const toWords = new ToWords();

const C2C = () => {
  const weeks = useStaticQuery(graphql`
    {
      allStrapiTrainingWeek(sort: { order: DESC, fields: strapiId }) {
        nodes {
          fromDate(formatString: "MMMM DD")
          toDate(formatString: "MMMM DD")
          totalDistanceCycle
          totalDistanceKayak
          totalDistanceRun
          strapiId
        }
      }
    }
  `);

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
          weeks.allStrapiTrainingWeek.nodes.map(week => {
            const to = `week-${slugify(toWords.convert(week.strapiId - ACTIVITY_WEEK_CORRECTION), { lower: true, remove: /[/()]/gi })}`
            return (
              <Link
                className="blog"
                key={week.strapiId}
                to={to}
              >
                <h2 className="blog-title">{`Week ${toWords.convert(week.strapiId - ACTIVITY_WEEK_CORRECTION)}`}</h2>
                <h5 className="blog-subtitle">
                  {week.fromDate} → {week.toDate}
                </h5>
                <div>
                  <TrainingWeekChart
                    cycleDist={week.totalDistanceCycle}
                    runDist={week.totalDistanceRun}
                    kayakDist={week.totalDistanceKayak}
                  />
                </div>
              </Link>
            );
          })
        }
      </div>
    </>
  );
};

export default C2C;
