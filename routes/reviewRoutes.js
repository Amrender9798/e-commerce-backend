import { Router } from 'express';
const router = Router();
import { getReviews, addReview } from '../controllers/reviewController.js';
import authenticate from '../middlewares/authenticate.js';

// Endpoint to get reviews for a specific product
router.get('/:productId', getReviews);

// Endpoint to add a new review
router.post('/add', authenticate,addReview);

export default router;
