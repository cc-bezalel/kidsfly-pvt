import db from "../../data/dbConfig";

export const makeTrip = trip => {
  return db("trip")
    .insert(trip)
    .returning("id");
};

export function deleteTrip(id) {
  return db("trip")
    .where({ id })
    .del();
}

export function updateTrip(id, updatedTrip) {
  return db("trip")
    .where({ id })
    .update(updatedTrip);
}

export function findTripByUserId(id) {
  return db("trip").where({ user_id: id });
}

export function findTripById(id) {
  return db("trip").where({ id });
}

export function findTripByAirport(airport) {
  return db("trip").where({ airport: airport });
}


export const getTrips = () => db('trip');

