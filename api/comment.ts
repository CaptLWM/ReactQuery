import client from './client';
import {Comment} from './types';

// 댓글 목록 조회
export async function getComments(articleId: number) {
  const response = await client.get<Comment[]>(
    `/articles/${articleId}/comments`,
  );

  return response.data;
}
