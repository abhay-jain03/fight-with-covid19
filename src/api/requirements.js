import Constants from '../constants';
import { Http } from '../http';

export const addNeeds = (data) => {
  const HttpHandler = new Http();
  const baseUrl = new Constants();
  let url = `${baseUrl.url.base_url}/addneed`
  
  return HttpHandler.post(
    url,
    {
      ...data
    },
  );
}

export const addSupply = (data) => {
  const HttpHandler = new Http();
  const baseUrl = new Constants();
  let url = `${baseUrl.url.base_url}/addsupply`
  
  return HttpHandler.post(
    url,
    {
      ...data
    },
  );
}

export const getList = (city, category) => {
  const HttpHandler = new Http();
  const baseUrl = new Constants();
  let url = `${baseUrl.url.base_url}/supply/${city}?category=${category}`
  
  return HttpHandler.get(
    url
  );
}

export const getHelp = (city, category) => {
  const HttpHandler = new Http();
  const baseUrl = new Constants();
  let url = `${baseUrl.url.base_url}/need/${city}?category=${category}`
  
  return HttpHandler.get(
    url
  );
}
