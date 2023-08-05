import { getPostsByCategory } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: string[];
};

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const pageNum = params.slug[0];
  const category = params.slug[1];
  console.log(params);
  return getPostsByCategory(pageNum, category).then((data) =>
    NextResponse.json(data)
  );
}
