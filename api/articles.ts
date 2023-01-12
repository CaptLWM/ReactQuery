import client from './client';
import {Article} from './types';

// 게시글 목록 조회
export async function getArticles() {
  const response = await client.get<Article[]>('/articles');
  return response.data;
}

// 게시글 조회
export async function getArticle(id: number) {
  const response = await client.get<Article>(`/articles/${id}`);
  return response.data;
}
