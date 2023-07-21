export type PopularPost = Pick<PreviewPost, 'id' | 'subject'>;

export type PreviewPost = {
  subject: string;
  id: string;
  author: {
    image: string;
    username: string;
  };
  category: string;
  content: string;
  createdAt: string;
  likes?: string;
  comments?: string;
  viewCount: number;
};
