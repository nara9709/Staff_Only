import { getPostsByCategory } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const pageNum = params.slug[0];
  const category = params.slug[1];
  return getPostsByCategory(pageNum, category).then((data) =>
    NextResponse.json(data)
  );
}
