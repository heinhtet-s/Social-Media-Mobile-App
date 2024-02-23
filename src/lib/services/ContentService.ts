'use client';

import {
  QueryClient,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {ApiResponse, getData, postData} from '.';

export const useGetContentCategory = <T>(): UseQueryResult<ApiResponse<T>> => {
  return useQuery('category', () => getData(`/admin/contentcategories`));
};
export const useGetHomeContent = <T>(): UseQueryResult<ApiResponse<T>> => {
  return useQuery('home-content', () => getData(`/content/browse/all`), {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
export const useGetContentDetail = <T>(
  slug: string,
): UseQueryResult<ApiResponse<T>> => {
  return useQuery(['home-content-detail', slug], () =>
    getData(`content/slug/${slug}`),
  );
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
// const { mutate: orderMudate } = useMutation({
//   mutationFn: (body: any) => {
//     return updateData(
//       `/v1/project/explore_true/list/for_group/${session?.user?.target_group?.id}`,
//       body
//     );
//   },
//   onSuccess: (data) => {
//     openSnackBar("Success ");

//     refetch();
//     queryClient.invalidateQueries([
//       "projects",
//       search,
//       page,
//       rowsPerPage,
//       session?.user?.target_group?.id,
//     ]);
//   },
//   onError: (err: any) => {
//     showServerError(err);
//   },
// });

export const usePostComment = () => {
  return useMutation((data: {id: string; comment: string}) =>
    postData(`content/${data?.id}/comment`, data),
  );
};
export const usePostContentLike = () => {
  return useMutation((data: {id: string}) =>
    postData(`content/like/${data.id}`, data),
  );
};
export const usePostContentSave = () => {
  return useMutation((data: {id: string}) => postData(`content/save`, data));
};
export const useCommentLike = () => {
  return useMutation((data: {id: string; parent_id: string}) =>
    postData(`content/${data.parent_id}/comments/${data.id}/likes`, data),
  );
};

// export const useLikeComment = () =>
//   useSWRMutation(`/content`, (url, { arg }: CommentArgType) => {
//     return appAxios.post(`${url}/${arg.parent_id}/comments/${arg.id}/likes`, arg);
//   });

// export const usePostComment = () =>
//   useQuery(`/content`, (url, { arg }: CommentArgType) => {
//     return appAxios.post(`${url}/${arg.id}/comments`, arg);
//   });
type saveContentArg = {
  arg: {
    id: number | string;
  };
};
// export const useSaveContent = () =>
//   useSWRMutation(`/content/save`, (url, { arg }: saveContentArg) => {
//     return appAxios.post(`${url}/${arg.id}`, arg);
//   });

// export const useLikeComment = () =>
//   useSWRMutation(`/content`, (url, { arg }: CommentArgType) => {
//     return appAxios.post(`${url}/${arg.parent_id}/comments/${arg.id}/likes`, arg);
//   });

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
