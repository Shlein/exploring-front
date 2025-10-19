export { ArticleDetailsPageLazy as ArticleDetailsPage } from './ui/ArticleDetailsPage/ui/ArticleDetailsPage.lazy';

export type { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';

export { fetchCommentsByArticleId } from './model/services/fetchCommentsByArticleId';

export type { ArticleDetailsRecommendationsSchema } from './model/types/ActicleDetailsRecommendationsSchema';

export { fetchArticleRecommendations } from './model/services/fetchArticleRecommendations';

export type { ArticleDetailsPageSchema } from './model/types/index';

export { articleDetailsPageReducer } from './model/slice/index';

export { ArticleDetailsPageHeader } from './ui/ArticleDetailsPageHeader/ArticleDetailsPageHeader';

export { ArticleDetailsComments } from './ui/ArticleDetailsComments/ArticleDetailsComments';
