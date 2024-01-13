import axios from 'axios';

// export default axios.create({
//   baseURL: process?.env?.NEXT_PUBLIC_BACKEND_URL + '/api',
//   headers: {'Content-Type': 'application/json'},
// });

// const errorHandling = (error: any) => {
//   if (error.response.status === 401) {
//     localStorage.clear();
//     window.location.href = "/";
//   }
//   throw error;
// };

export async function getData(endpoint: string) {
  try {
    const {data, status} = await axios.get(endpoint);
    return {...data, status};
  } catch (error: any) {
    // console.log('error', error.response.status);
    // if (error.response.status === 401) {
    //   localStorage.clear();
    //   window.location.href = '/';
    // }
    // throw error;
  }
}

export async function postData(endpoint: string, body: any) {
  try {
    const {data, status} = await axios.post(endpoint, body, {
      headers: {
        Accept: 'application/json',
      },
    });
    return {...data, status};
  } catch (error: any) {
    throw error;
  }
}
export async function postLoginData(endpoint: string, body: any) {
  try {
    const {data, status} = await axios.post(endpoint, body, {
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
    const {data, status} = await axios.put(endpoint, body, {
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
    const {data, status} = await axios.patch(endpoint, body);
    return {...data, status};
  } catch (error: any) {
    throw error;
  }
}

export async function deleteData(endpoint: string, body: FormData | {} = {}) {
  try {
    const response = await axios.delete(endpoint, {data: body});
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function postImage(body: FormData | {}) {
  try {
    const response = await axios.post('/v1/photo_upload', body, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function getImage(name: string) {
  try {
    const response = await axios.get(`/v1/images/${name}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function postFile(body: FormData | {}) {
  try {
    const response = await axios.post('/v1/file_upload', body, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function getFile(name: string) {
  try {
    const response = await axios.get(`/v1/files/${name}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}
