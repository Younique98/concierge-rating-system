import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/utils/db';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 5;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    // TODO: (ET) Add better  error handling
    return res
      .setHeader('Allow', ['GET'])
      .status(405)
      .json({
        error: 'Method Not Allowed',
        message: 'This endpoint only supports GET requests.',
      });
  }

  try {
    // TODO: (ET) Add error handling and types for the request and response
    const page = parseInt(req.query.page as string) || DEFAULT_PAGE_NUMBER;
    const pageSize =
      parseInt(req.query.pageSize as string) || DEFAULT_PAGE_SIZE;
    const offset = (page - 1) * pageSize;

    const result = await pool.query(
      'SELECT * FROM reviews ORDER BY id ASC LIMIT $1 OFFSET $2',
      [pageSize, offset],
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(
      `[DB_ERROR]: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong while retrieving reviews.',
    });
  }
}
