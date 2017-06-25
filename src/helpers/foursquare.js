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

export const getVenuePhoto = id =>
  foursquare.venues.getVenuePhotos({
    venue_id: id,
    limit: 1,
  });

export const getScore = ({ checkinsCount, usersCount, tipCount }) =>
  checkinsCount + tipCount + usersCount;

const toRadians = degrees => degrees * Math.PI / 180;

export function calculateHeading({ from, to, userHeading }) {
  const R = 6371e3; // metres
  const φ1 = toRadians(from.latitude);
  const φ2 = toRadians(to.latitude);
  const Δφ = toRadians(to.latitude - from.latitude);
  const Δλ = toRadians(to.longitude - from.longitude);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d - toRadians(userHeading);
}
