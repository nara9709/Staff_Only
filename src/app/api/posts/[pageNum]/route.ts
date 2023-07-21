import { getPostsByCategory } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    pageNum: string;
  };
};

export async function GET(_: NextRequest, context: Context) {
  return getPostsByCategory(context.params.pageNum).then((data) =>
    NextResponse.json(data)
  );
}
