import { generic } from "../constants";

const buildUrl = (endpoint: string, query?: [{ name: string; value: string }], param?: string) => {
  let url = new URL(generic.rest_api_url);
  url.href += endpoint;
  if (param) url.href += `/${param}`;

  query?.forEach((element) => {
    url.searchParams.append(element.name, element.value);
  });

  return url.href;
};

export default buildUrl;
