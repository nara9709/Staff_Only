import { getPostsByCategory } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[];
  };
};

type Categories =
  | '카페'
  | '배달전문'
  | '프렌차이즈'
  | '사무보조'
  | '주점'
  | '식당'
  | '엔터테이먼트';

export async function GET(_: NextRequest, context: Context) {
  const [category, pageNum] = context.params.slug;

  return getPostsByCategory(pageNum, category).then((data) =>
    NextResponse.json(data)
  );
}
