import type { NextApiRequest, NextApiResponse } from 'next';
import Review from '@/data/Review';
import pool from '@/utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
