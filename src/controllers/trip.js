import {
  makeTrip,
  deleteTrip,
  updateTrip,
  findTripByUserId,
  findTripByAirport,
  findTripById,
  getTrips
} from "../models/trip";
import jwt, { Secret } from "jsonwebtoken";

export const getAllTrips = async (req, res, next) => {
  const paramsId = req.params.id;
  if (!paramsId && !req.token.is_admin) {
    try {
      const { id } = req.token;
      const trips = await getTrips();
      if (trips == false) {
        return res.status(404).json({ msg: "404: Trips cannot be found." });
      }

      res.status(200).json(trips);
    } catch (e) {
      e.statusCode = 400;
      next(e);
    }
  } else if (!paramsId && req.token.is_admin) {
    const { airport } = req.token;
    const trips = await getTrips();
    if (trips == false) {
      return res
        .status(404)
        .json({ msg: "404: Trips cannot be found for your airport." });
    }
    res.status(200).json(trips);
  } else {
    try {
      const { id } = req.params;
      const trips = await findTripById(id);
      if (trips == false) {
        return res.status(404).json({ msg: "404: Trips cannot be found." });
      }
      res.status(200).json(trips);
    } catch (e) {
      e.statusCode = 400;
      next(e);
    }
  }
};

export const get = async (req, res, next) => {
  const paramsId = req.params.id;
  if (!paramsId && !req.token.is_admin) {
    try {
      const { id } = req.token;
      const trips = await findTripByUserId(id);
      if (trips == false) {
        return res.status(404).json({ msg: "404: Trips cannot be found." });
      }

      res.status(200).json(trips);
    } catch (e) {
      e.statusCode = 400;
      next(e);
    }
  } else if (!paramsId && req.token.is_admin) {
    const { airport } = req.token;
    const trips = await findTripByAirport(airport);
    if (trips == false) {
      return res
        .status(404)
        .json({ msg: "404: Trips cannot be found for your airport." });
    }
    res.status(200).json(trips);
  } else {
    try {
      const { id } = req.params;
      const trips = await findTripById(id);
      if (trips == false) {
        return res.status(404).json({ msg: "404: Trips cannot be found." });
      }
      res.status(200).json(trips);
    } catch (e) {
      e.statusCode = 400;
      next(e);
    }
  }
};

export const put = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trip = req.body;
    const updatedTrip = await updateTrip(id, trip);
    res.status(201).json(updatedTrip);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const post = async (req, res, next) => {
  try {
    const { id } = req.token;
    const trip = req.body;
    trip.user_id = id;
    const addedTrip = await makeTrip(trip);
    res.status(201).json(addedTrip);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};

export const deleteT = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTrip = await deleteTrip(id);
    res.status(201).json(deletedTrip);
  } catch (e) {
    e.statusCode = 400;
    next(e);
  }
};
