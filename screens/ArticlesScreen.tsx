// 게시글 목록 조회
import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useInfiniteQuery, useQuery} from 'react-query';
import {getArticles} from '../api/articles';
import {Article} from '../api/types';
import Articles from '../components/Articles';
import {useUserState} from '../contexts/UserContext';

function ArticlesScreen() {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(
    'articles',
    ({pageParam}) => getArticles({...pageParam}),
    {
      getNextPageParam: lastPage =>
        lastPage.length === 10
          ? {cursor: lastPage[lastPage.length - 1].id}
          : undefined,
      getPreviousPageParam: (_, allPages) => {
        const validPage = allPages.find(page => page.length > 0);
        if (!validPage) {
          return undefined;
        }
        return {
          prevCursor: validPage[0].id,
        };
      },
    },
  );

  const items = useMemo(() => {
    if (!data) {
      return null;
    }
    return ([] as Article[]).concat(...data.pages); // Article[][]를 Articlep[]로 변환, [] 이라고 먼저 선언 해준 후 concat
  }, [data]);
  const [user] = useUserState();

  if (!data) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }
  return (
    <Articles
      articles={items}
      showWriteButton={!!user}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      refresh={fetchPreviousPage}
      isRefreshing={isFetchingPreviousPage} // 조건 : 요청이 진행 중인데, 다음 페이지에 대한 요청은 진행중이지 않을때, !isFetchingNextPage를 확인하지 않으면 다음페이지를 불러오고 있을때도 상단에 로딩표시
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default ArticlesScreen;
