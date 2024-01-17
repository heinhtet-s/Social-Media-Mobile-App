import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import Config from 'react-native-config';

const axiosConfig = axios.create({
  baseURL: Config.API_URL + '/api/v1',
  headers: {'Content-Type': 'application/json'},
});
export interface ApiResponse<T> {
  data: T | null;
  status: string;
}
axiosConfig.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
      config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
// const errorHandling = (error: any) => {
//   if (error.response.status === 401) {
//     localStorage.clear();
//     window.location.href = "/";
//   }
//   throw error;
// };

export async function getData(endpoint: string) {
  try {
    const {data, status} = await axiosConfig.get(endpoint);
    return {...data, status};
  } catch (error: any) {
    console.log('error', error);
    // console.log('error', error.response.status);
    // if (error.response.status === 401) {
    //   localStorage.clear();
    //   window.location.href = '/';
    // }
    throw error;
  }
}

export async function postData(endpoint: string, body: any) {
  try {
    const {data, status} = await axiosConfig.post(endpoint, body, {
      headers: {
        Accept: 'application/json',
      },
    });
    return {...data, status};
  } catch (error: any) {
    throw error;
  }
}

export async function putData(endpoint: string, body: FormData | {}) {
  try {
    const {data, status} = await axiosConfig.put(endpoint, body, {
      headers: {
        Accept: 'application/json',
      },
    });
    return {...data, status};
  } catch (error: any) {
    throw error;
  }
}

export async function updateData(endpoint: string, body: FormData | {}) {
  try {
    const {data, status} = await axiosConfig.patch(endpoint, body);
    return {...data, status};
  } catch (error: any) {
    throw error;
  }
}

export async function deleteData(endpoint: string, body: FormData | {} = {}) {
  try {
    const response = await axiosConfig.delete(endpoint, {data: body});
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function postImage(body: FormData | {}) {
  try {
    const response = await axiosConfig.post('/v1/photo_upload', body, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function getImage(name: string) {
  try {
    const response = await axiosConfig.get(`/v1/images/${name}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function postFile(body: FormData | {}) {
  try {
    const response = await axiosConfig.post('/v1/file_upload', body, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function getFile(name: string) {
  try {
    const response = await axiosConfig.get(`/v1/files/${name}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}
