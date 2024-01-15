import { notification } from 'antd';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { getMockupData, getMockupPostData } from '../mockupdata';

let window;
const baseurl = window && window.__RUNTIME_CONFIG__ && window.__RUNTIME_CONFIG__.WEBAPI_URL;

export const composeUrl = (url) => {
  const _url = url.startsWith('/') ? url.substring(1) : url;
  return baseurl + _url;
};

function getHeaders() {
  const token = sessionStorage.getItem('token');

  return {
    headers: {
      Authorization: token !== null ? 'Bearer ' + token : '',
    },
  };
}

export async function doAxiosPut(url, postParams, props) {
  try {
    if (url.startsWith('@')) {
      return { executionResult: false, error: 'ENDPOINT TO DO' };
    }
    const _url = composeUrl(url);

    const result = await axios.put(_url, postParams, getHeaders());

    if (result.status === 200 || result.status === 201 || result.status === 202) {
      return { executionResult: true, data: result.data };
    } else {
      return { executionResult: false, error: undefined };
    }
  } catch (error) {
    return ManageAxiosError(url, error, props);
  }
}

export async function doAxiosPatch(url, postParams, props) {
  try {
    if (url.startsWith('@')) {
      return { executionResult: false, error: 'ENDPOINT TO DO' };
    }
    const _url = composeUrl(url);

    const result = await axios.patch(_url, postParams, getHeaders());

    if (result.status === 200 || result.status === 201 || result.status === 202) {
      return { executionResult: true, data: result.data };
    } else {
      return { executionResult: false, error: undefined };
    }
  } catch (error) {
    return ManageAxiosError(url, error, props);
  }
}

export async function doAxiosPost(url, postParams, props) {
  try {
    if (url.startsWith('@')) {
      return getMockupPostData(url.substring(1), postParams);
    }
    const _url = composeUrl(url);

    const result = await axios.post(_url, postParams, getHeaders());

    if (result.status === 200 || result.status === 201 || result.status === 202) {
      return { executionResult: true, data: result.data };
    } else {
      return { executionResult: false, error: undefined };
    }
  } catch (error) {
    return ManageAxiosError(url, error, props);
  }
}

export async function doAxiosGet(url, props) {
  try {
    if (url.startsWith('@')) {
      return getMockupData(url.substring(1));
    }
    const _url = composeUrl(url);

    const result = await axios.get(_url, getHeaders());

    if (result.status === 200 || result.status === 202) {
      return { executionResult: true, data: result.data };
    } else {
      return { executionResult: false, error: undefined };
    }
  } catch (error) {
    return ManageAxiosError(url, error, props);
  }
}

export async function doAxiosDelete(url, props) {
  try {
    const _url = composeUrl(url);

    const result = await axios.delete(_url, getHeaders());

    if (result.status === 200 || result.status === 202 || result.status === 204) {
      return { executionResult: true, data: result.data };
    } else {
      return { executionResult: false, error: undefined };
    }
  } catch (error) {
    return ManageAxiosError(url, error, props);
  }
}

function ManageAxiosError(url, error, props) {
  const { logout } = useAuth();

  if (error && error.response && error.response.status === 401) {
    if (props && props.history) {
      logout();
      props.history.push('/login');
    }
  }

  notification.error({
    message: 'Errore',
    description: url + ': ' + error.message,
    placement: 'topRight',
  });

  return { executionResult: false, error: error };
}
