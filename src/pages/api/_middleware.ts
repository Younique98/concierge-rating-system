import { NextApiRequest, NextApiResponse } from 'next';
import helmet from 'helmet';

export default function middleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void,
) {
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
      },
    },
    frameguard: { action: 'sameorigin' }, // Prevents Clickjacking
    xssFilter: true, // Prevents reflected XSS attacks
    noSniff: true, // Prevents MIME sniffing
  })(req as any, res as any, next);
}
