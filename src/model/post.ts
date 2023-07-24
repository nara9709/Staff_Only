export type PopularPost = Pick<PreviewPost, 'id' | 'subject'>;

export type DefaultPost = {
  subject: string;
  id: string;
  author: {
    image: string;
    username: string;
    id: string;
  };
  category: string;
  content: string;
  createdAt: string;
  comments?: string;
  viewCount: number;
  image: string;
};

export type PreviewPost = Omit<DefaultPost, 'image'> & {
  comments: number;
};
