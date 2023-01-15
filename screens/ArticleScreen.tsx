import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {getArticle} from '../api/articles';
import {getComments} from '../api/comment';
import ArticleView from '../components/ArticleView';
import CommentItem from '../components/CommentItem';
import {useUserState} from '../contexts/UserContext';
import {RootStackParamList} from './types';

// id 라우트 파라미터 조회
type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;
  const [currentUser] = useUserState();

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  // 화면 하단 필수 여백 크기 조회
  const {bottom} = useSafeAreaInsets();

  // 둘 중 하나라도 준비되지 않은 데이터가 있으면 스피너 보여주기
  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  const {title, body, published_at, user} = articleQuery.data;
  // 현재 사용자 정보와 게시글 정보 비교
  const isMyArticle = currentUser?.id === user.id;

  return (
    // 댓글 많이 달리는 상황 고려하여 flatlist 사용
    <FlatList
      style={styles.flatList}
      // 홈버튼 없는 기종을 위해 화면 하단 필수 여백 크기 가져와서 paddingbottom으로 지정
      contentContainerStyle={[styles.flatListContent, {paddingBottom: bottom}]}
      data={commentsQuery.data}
      renderItem={({item}) => (
        <CommentItem
          id={item.id}
          message={item.message}
          publishedAt={item.published_at}
          username={item.user.username}
        />
      )}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <ArticleView
          title={title}
          body={body}
          publishedAt={published_at}
          username={user.username}
          id={id}
          isMyArticle={isMyArticle}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  flatList: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});

export default ArticleScreen;
