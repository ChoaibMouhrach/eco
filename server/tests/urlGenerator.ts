/**
 * This function helps generating url using base url + query params such as sort fields order and search
 * */
export const generateUrl = ({
  baseUrl,
  sort,
  fields,
  order,
  search,
}: {
  baseUrl: string;
  sort?: string;
  fields?: string;
  order?: string;
  search?: string;
}) => {
  let url: string = baseUrl + "?";

  if (sort) {
    url += `sort=${sort}&`;
  }

  if (fields) {
    url += `fields=${fields}&`;
  }

  if (order) {
    url += `order=${order}&`;
  }

  if (search) {
    url += `search=${search}&`;
  }

  return url;
};
