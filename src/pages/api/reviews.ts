import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/utils/db';
import { withCors } from '@/lib/middleware/cors';
import { withRateLimit } from '@/lib/middleware/rateLimit';
import { sanitizeInput } from '@/utils/sanitize';
import logger from '@/utils/logger';
import { applySecurityHeaders } from '@/utils/security';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

async function reviewsHandler(req: NextApiRequest, res: NextApiResponse) {
  applySecurityHeaders(req, res); // Apply security headers

  if (req.method === 'GET') {
    try {
      const page = parseInt(req.query.page as string) || DEFAULT_PAGE_NUMBER;
      const pageSize =
        parseInt(req.query.pageSize as string) || DEFAULT_PAGE_SIZE;
      const offset = (page - 1) * pageSize;

      const result = await pool.query(
        'SELECT * FROM reviews ORDER BY id DESC LIMIT $1 OFFSET $2',
        [pageSize, offset],
      );
      logger.info(`GET /api/reviews - 200 - ${req.socket.remoteAddress}`);
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(
        `[DB_ERROR]: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      if (res.statusCode === 405) {
        return res.status(405).json({
          error: 'Internal Server Error',
          message: 'Method Not Allowed.',
        });
      }

      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong while retrieving reviews.',
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { rating, review, author } = req.body;
      if (!rating || rating < 1 || rating > 5) {
        logger.warn(
          `POST /api/reviews - 400 - Invalid rating value from ${req.socket.remoteAddress}`,
        );
        return res.status(400).json({
          error: 'Invalid rating value',
          message: 'Rating must be between 1 and 5.',
        });
      }
      if (!author || typeof author !== 'string') {
        return res.status(400).json({
          error: 'Invalid author value',
          message: 'Author name is required.',
        });
      }

      const sanitizedReview = review ? sanitizeInput(review) : null;
      const sanitizedAuthor = sanitizeInput(author);

      const result = await pool.query(
        'INSERT INTO reviews (rating, review, author) VALUES ($1, $2, $3) RETURNING *',
        [rating, sanitizedReview || null, sanitizedAuthor],
      );
      logger.info(
        `POST /api/reviews - 201 - Review submitted by ${author} from ${req.socket.remoteAddress}`,
      );
      return res
        .status(201)
        .json({ message: 'Review submitted', review: result.rows[0] });
    } catch (error) {
      logger.error(
        `500 Internal Server Error - ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong while creating the review.',
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    logger.warn(`405 Method Not Allowed - ${req.method}`);
    return res.status(405).json({
      error: 'Method Not Allowed',
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return await withCors(withRateLimit(reviewsHandler))(req, res);
}
