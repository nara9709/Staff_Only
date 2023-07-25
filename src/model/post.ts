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

export type DefaultSubComment = {
  author: {
    image: string;
    username: string;
  };
  commentToId: string;
  commentToUser: string;
  id: string;
  subcomment: string;
};

export type DefaultComment = {
  comment: string;
  id: string;
  author: {
    id: string;
    userProfileImage: string;
    username: string;
  };
};

export type CommentFromSanity = {
  comments: DefaultComment[];
  subComments: DefaultSubComment[];
  postId: string;
};
