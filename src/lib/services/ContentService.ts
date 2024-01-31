'use client';

import {UseQueryResult, useQuery} from 'react-query';
import {ApiResponse, getData} from '.';
import { useMemo } from 'react';
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
export const useGetContentDetail = <T>(
  slug: string,
): UseQueryResult<ApiResponse<T>> => {
  return useQuery('home-content', () => getData(`content/slug/${slug}`));
};
export const useGetComment = <T>(
  id: number | string | undefined,
): UseQueryResult<ApiResponse<T>> => {
  return useQuery(
    ['home-content-comment', id],

    () => getData(`content/${id}/comments?cursor=0&pagesize=30`),
    {
      enabled: !!id,
    },
  );
};
export const useGetBrowseContent = <T>(): UseQueryResult<ApiResponse<T>> => {
  return useQuery(
    ['home-content-browse'],

    () => getData(`/content/browse?page=${1}&pagesize=10`),
  );
};

// export const useGetBrowseInfinite = ({
//   search,
//   type,
// }: {
//   search: string | null;
//   type: string;
// }): SWRInfiniteResponse => {
//   return useSWRInfinite(
//     (index: number) =>
//       type === "all" && (!search || search === "")
//         ? null
//         : `/content/browse?page=${index + 1}&${type === "all" ? "" : `category=${type}`}&pagesize=10${
//             search ? `&search=${search}` : ""
//           }`,
//     {
//       revalidateFirstPage: true,
//       revalidateAll: true,
//       revalidateIfStale: true,
//       revalidateOnFocus: true,
//       revalidateOnReconnect: true,
//       parallel: false,
//     }
//   );
// };
// export const useGetComment = (id: number | string): SWRInfiniteResponse => {
//   const getKey = (index: number) => `/content/${id}/comments?cursor=${index}&pagesize=30`;
//   return useSWRInfinite<CommentResponse>(getKey, {
//     revalidateFirstPage: true,
//     revalidateAll: true,
//     revalidateIfStale: true,
//     revalidateOnFocus: true,
//     revalidateOnReconnect: true,
//     parallel: false,
//   });
// };
// export const useGetContentBySlug = <ContentData>(slug: string): SWRResponse => {
//   const url = `content/slug/${slug}`;
//   return useSWR<ContentData>(url);
// };
// export const useGetContentCategory = <T>(): UseQueryResult<ApiResponse<T>> => {
//   return useSWR<ContentType>(`content/browse/all?${routeFilter(params)}`);

// export const useGetContentCategory = <ContentCategoryResponse>(): SWRResponse<ContentCategoryResponse, any> => {
//   return useSWR<ContentCategoryResponse>(`/admin/contentcategories`);
// };
