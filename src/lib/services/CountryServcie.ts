'use client';

import {UseQueryResult, useQuery} from 'react-query';
import {ApiResponse, getData} from '.';

export const useGetCountries = <T = any>(): UseQueryResult<ApiResponse<T>> => {
  return useQuery('countries', () => getData(`/details/countries`));
};
