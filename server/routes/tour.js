import express from "express";
import {
    createTour,
    getTours,
    getTour,
    getToursByUser,
    deleteTour,
    updateTour,
    getTourBySearch,
    getToursByTag,
} from "../controllers/tour.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/search', getTourBySearch);
router.get('/tag/:tag', getToursByTag);
router.get('/', getTours);
router.get('/:id', getTour);

router.post('/', auth, createTour);
router.delete('/:id', auth, deleteTour);
router.patch('/:id', auth, updateTour);
router.get('/userTours/:id', auth, getToursByUser);

export default router;
