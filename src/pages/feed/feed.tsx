import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectIsLoading, selectOrders } from '../../services/feed-info/slice';
import { fetchFeedInfoThunk } from '../../services/feed-info/actions';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleGetFeeds = () => {
    dispatch(fetchFeedInfoThunk());
  };

  useEffect(() => {
    dispatch(fetchFeedInfoThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
