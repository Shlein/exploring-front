import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import {
  ArticleSortField,
  ArticleType
} from 'entities/Article/model/types/ArticleDetailsTypes';
import { SortOrder } from 'shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
  pageNumber: number;
  limit?: number;
  hasMore: boolean;

  //filters
  view: ArticleView;
  search: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;

  _inited: boolean;
}
