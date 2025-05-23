import type { NextApiRequest, NextApiResponse } from 'next';
import Review from '@/data/Review';
import pool from '@/utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { rating, review } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }
    if (review && review.length > 500) {
      return res
        .status(400)
        .json({ error: 'Review cannot be more than 500 characters.' });
    }
  }
  if (req.method === 'GET') {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const offset = (page - 1) * pageSize;

    try {
      const result = await pool.query(
        'SELECT * FROM reviews ORDER BY id ASC LIMIT $1 OFFSET $2',
        [pageSize, offset],
      );
      res.status(200).json(result.rows);
    } catch (error) {
      // TODO: (ET) Add error handling
      console.error('Database error:', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong while retrieving reviews.',
      });
    }
  }
}
