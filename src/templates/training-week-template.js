import React from "react";
import { graphql } from "gatsby";
import { ToWords } from 'to-words';
import { ACTIVITY_WEEK_CORRECTION } from '../constants';

import SEO from "../components/seo";
import PostNavigation from "../components/post-navigation";
import TrainingWeekChart from '../components/training-week-chart';
import Activity from '../components/activity';

const toWords = new ToWords();

const TrainingWeekTemplate = ({
  data: {
    strapiTrainingWeek: {
      strapiId,
      description,
      fromDate,
      toDate,
      totalDistanceCycle,
      totalDistanceRun,
      totalDistanceKayak,
      activities,
    }
  }
}) => {
  const title = `Week ${toWords.convert(strapiId - ACTIVITY_WEEK_CORRECTION)}`;
  return (
    <>
      <SEO title={title} />
      <div className="blog-view">
        <h1>{title}</h1>
        <h5 className="highlight">{`${fromDate} → ${toDate}`}</h5>
        <hr />
        <div className="blog-content">
          <p>{description}</p>
          <TrainingWeekChart
            cycleDist={totalDistanceCycle}
            runDist={totalDistanceRun}
            kayakDist={totalDistanceKayak}
            removeMax
          />
          <br />
          <br />
          <hr />
          <br />
          <br />
          {activities
            .sort((a, b) => {
              const aDay = new Date(a.startDate).getDay() || 8;
              const bDay = new Date(b.startDate).getDay() || 8;
              return aDay - bDay;
            })
            .map(activity => (
              <div key={activity.Title.toLowerCase()}>
                <Activity
                  activity={activity.activity}
                  title={activity.Title}
                  startDate={activity.startDate}
                  duration={activity.time}
                  averageSpeed={activity.averageSpeed}
                  distance={activity.distance}
                  elevation={activity.elevation}
                  polyline={activity.polyline_encoded}
                />
                <hr />
              </div>
            ))
          }
        </div>
      </div>
      <PostNavigation postType="coast-to-coast" />
    </>
  );
};

export default TrainingWeekTemplate;

export const trainingWeekQuery = graphql`
  query TrainingWeekPostById($strapiId: Int!) {
    strapiTrainingWeek(strapiId: { eq: $strapiId }) {
      description
      fromDate(formatString: "MMMM DD")
      toDate(formatString: "MMMM DD")
      totalDistanceCycle
      totalDistanceKayak
      totalDistanceRun
      strapiId
      activities {
        Title
        activity
        startDate
        averageSpeed
        distance
        elevation
        time
        polyline_encoded
      }
    }
  }
`;
