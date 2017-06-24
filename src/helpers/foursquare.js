import foursquareApi from 'react-foursquare';

const foursquare = foursquareApi({
  clientID: process.env.REACT_APP_FOURSQUARE_ID,
  clientSecret: process.env.REACT_APP_FOURSQUARE_SECRET,
});

export const getVenues = ({ latitude, longitude, ...query }) =>
  foursquare.venues.getVenues({
    ll: `${latitude},${longitude}`,
    ...query,
  });

export const getScore = ({ checkinsCount, usersCount, tipCount }) =>
  checkinsCount + tipCount + usersCount;
