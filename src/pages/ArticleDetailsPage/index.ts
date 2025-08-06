export { ArticleDetailsPageLazy as ArticleDetailsPage } from './ui/ArticleDetailsPage/ui/ArticleDetailsPage.lazy';

export { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';

export { fetchCommentsByArticleId } from './model/services/fetchCommentsByArticleId';

export { ArticleDetailsRecommendationsSchema } from './model/types/ActicleDetailsRecommendationsSchema';

export { fetchArticleRecommendations } from './model/services/fetchArticleRecommendations';

export { ArticleDetailsPageSchema } from './model/types/index';

export { articleDetailsPageReducer } from './model/slice/index';
