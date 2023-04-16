import { Request, Response } from 'express';
import { Message } from '@chat-app/api/db';

export async function GetListMessage(req: Request, res: Response) {
  const user_id: string = req.body.user_id;
  const messages = await Message.find({
    $where: () => {
      user_id;
    },
  });
  return res.json({ messages });
}

export async function CreateMessage(req: Request, res: Response) {
  const message = await Message.create(req.body);
  return res.json({ message });
}

export async function UpdateMessage(req: Request, res: Response) {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body);
  return res.json({ message });
}

export async function DeleteMessage(req: Request, res: Response) {
  const message = await Message.findByIdAndDelete(req.params.id, {
    user_id: req.query.user_id,
  });
  return res.json({ message });
}
