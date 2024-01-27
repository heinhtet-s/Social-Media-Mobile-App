'use client';

import {UseQueryResult, useQuery} from 'react-query';
import {ApiResponse, getData} from '.';
// export const useGetHomeContent = <ContentType>(params?: ParamsType): SWRResponse<ContentType, any> => {
//   return useSWR<ContentType>(`content/browse/all?${routeFilter(params)}`);
// };
export const useGetCountries = <T>(): UseQueryResult<ApiResponse<T>> => {
  return useQuery('content-all', () => getData(`content/browse/all`));
};
export const useGetContentCategory = <T>(): UseQueryResult<ApiResponse<T>> => {
  return useQuery('category', () => getData(`/admin/contentcategories`));
};
export const useGetHomeContent = <T>(): UseQueryResult<ApiResponse<T>> => {
  return useQuery('home-content', () => getData(`/content/browse/all`));
};
// export const useGetContentCategory = <T>(): UseQueryResult<ApiResponse<T>> => {
//   return useSWR<ContentType>(`content/browse/all?${routeFilter(params)}`);

// export const useGetContentCategory = <ContentCategoryResponse>(): SWRResponse<ContentCategoryResponse, any> => {
//   return useSWR<ContentCategoryResponse>(`/admin/contentcategories`);
// };
