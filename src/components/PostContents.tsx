import { DefaultPost } from '@/model/post';
import React, { useState } from 'react';
import Avatar from './UI/Avatar';
import { parseDate } from '@/utils/date';
import { FcPrevious } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { AiOutlineDelete } from 'react-icons/ai';
import useMe from '@/hooks/useMe';
import { useSWRConfig } from 'swr';
import { usePosts } from '@/hooks/usePosts';

type Props = {
  post: DefaultPost;
  isLoading: boolean;
};

function PostContents({ post, isLoading }: Props) {
  const {
    category,
    author,
    subject,
    createdAt,
    viewCount,
    content,
    image,
    id,
  } = post;

  const router = useRouter();
  const { user } = useMe();
  const { mutate: globalMutate } = useSWRConfig();
  const { delPost } = usePosts('', 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState();

  const deletePost = () => {
    delPost(id);
    router.push('/');
  };

  return (
    <>
      <span>
        <FcPrevious className="w-6 h-6 mb-2 " onClick={() => router.back()} />
      </span>
      <div className="pb-4 ">
        <div className="flex justify-between">
          <span className="font-bold text-blue-900 text-lg">{category}</span>
          <span className="text-xs">{parseDate(createdAt)}</span>
        </div>
        <h1 className="text-xl font-bold mt-2 text-stone-700">{subject}</h1>
        <div className="flex items-center mt-4 justify-between">
          <span className="flex items-center ">
            <Avatar image={author.image} size="sm" name={author.username} />
            <span className="ml-2 text-stone-500">
              {author.username} | 조회수 {viewCount}
            </span>
          </span>
          {author.id === user?.id && (
            <span>
              <AiOutlineDelete
                className="hover:opacity-50 w-7 h-7"
                fill="red"
                onClick={() => deletePost()}
              />
            </span>
          )}
        </div>
      </div>
      <div className=" border-t-[0.5px] border-t-stone-300 pt-4 min-h-[150px]">
        <p className=" text-lg">{content}</p>
      </div>
    </>
  );
}

export default PostContents;
