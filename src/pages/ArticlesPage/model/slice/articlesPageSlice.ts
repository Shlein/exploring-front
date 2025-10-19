import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView
} from 'entities/Article';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ARTICLES_VIEW_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';
import { SortOrder } from 'shared/types';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: article => article.id
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  state => state.articlePage || articlesAdapter.getInitialState()
);

const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
    pageNumber: 1,
    hasMore: true,
    limit: 9,
    order: 'asc',
    search: '',
    sort: ArticleSortField.CREATED,
    type: ArticleType.ALL,
    _inited: false
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(
        ARTICLES_VIEW_LOCAL_STORAGE_KEY,
        action.payload
      );
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    initState: state => {
      const view = localStorage.getItem(
        ARTICLES_VIEW_LOCAL_STORAGE_KEY
      ) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.BIG ? 4 : 9;
      state._inited = true;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticlesList.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;

        if (action.meta.arg.replace) {
          articlesAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.hasMore = action.payload.length >= state.limit;
        state.hasMore = action.payload.length > 0;

        if (action.meta.arg.replace) {
          articlesAdapter.setAll(state, action.payload);
        } else {
          articlesAdapter.addMany(state, action.payload);
        }
      })
      .addCase(fetchArticlesList.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { reducer: articlesPageReducer } = articlesPageSlice;
export const { actions: articlesPageActions } = articlesPageSlice;
