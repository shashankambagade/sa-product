import axios from 'axios';
import { env } from '../config/env.js';

export async function fetchPageSpeed(url: string) {
  if (!env.PAGESPEED_API_KEY) {
    throw new Error('PAGESPEED_API_KEY is required');
  }

  const { data } = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
    params: { url, key: env.PAGESPEED_API_KEY, category: ['performance'], strategy: 'mobile' }
  });

  const audits = data?.lighthouseResult?.audits || {};
  return {
    lcpMs: Math.round((audits['largest-contentful-paint']?.numericValue ?? 0)),
    fidMs: Math.round((audits['max-potential-fid']?.numericValue ?? 0)),
    cls: audits['cumulative-layout-shift']?.numericValue ?? 0,
    ttfbMs: Math.round((audits['server-response-time']?.numericValue ?? 0)),
    score: Math.round((data?.lighthouseResult?.categories?.performance?.score ?? 0) * 100)
  };
}
