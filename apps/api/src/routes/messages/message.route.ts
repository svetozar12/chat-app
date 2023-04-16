import { Router } from 'express';
import {
  CreateMessage,
  DeleteMessage,
  GetListMessage,
  UpdateMessage,
} from './message.controller';

const messageRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Message
 *     description: Message
 */

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     description: Get list of messages
 *     tags: [Message]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/id'
 *       - $ref: '#/parameters/user_id'
 *     responses:
 *       200:
 *         description: message
 *         schema:
 *           type: array
 *           $ref: '#/components/schemas/message'
 */
messageRouter.get('/', (req, res) => {
  return GetListMessage(req, res);
});

/**
 * @swagger
 * /messages:
 *   post:
 *     description: Create message
 *     tags: [Message]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/components/schemas/message'
 *     responses:
 *       200:
 *         description: message
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/message'
 */
messageRouter.post('/', (req, res) => {
  return CreateMessage(req, res);
});

messageRouter.put('/:id', (req, res) => {
  return UpdateMessage(req, res);
});

messageRouter.delete('/:id', (req, res) => {
  return DeleteMessage(req, res);
});

export { messageRouter };
