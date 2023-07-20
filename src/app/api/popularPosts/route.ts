import { getPopularPosts } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  return getPopularPosts().then((data) => NextResponse.json(data));
}
