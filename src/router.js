import { Router } from 'express';
import SurveyController from "./controllers/surveyController";

const router = Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     tags:
 *       - Hello WiredPlus!!
 *     description: Hello WiredPlus
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 *
 * /unsubscribe-reasons:
 *   post:
 *     tags:
 *     - Survey API's
 *     description: Unsubscribe reasons
 *     produces:
 *     - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *                 description: Unique id of User
 *               campaignId:
 *                 type: string
 *                 description: survey campaign id
 *               unsubscribeReason:
 *                 type: string
 *                 description: Rason of unsubscribe
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *               accountId:
 *                 type: string
 *                 description: Unique id of User
 *               campaignId:
 *                 type: string
 *                 description: survey campaign id
 *               unsubscribeReason:
 *                 type: string
 *                 description: Rason of unsubscribe
 *       500:
 *         description: Any error from server
 */
 router.post('/unsubscribe-reasons', SurveyController.updateUnsubscribeReasons);

/**
 * @swagger
 * /unsubscribe-reasons/{campaignId}/:
 *   get:
 *     tags:
 *     - Survey API's
 *     description: Returns scheduled deliveries for the specified store
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/components/parameters/campaignId'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Any error from server
 */
router.get('/unsubscribe-reasons/:campaignId/', SurveyController.getUnsubscribeReasons);

export default router;