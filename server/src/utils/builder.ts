import { FilterQuery, Types } from "mongoose";

export const queryBuilder = (search: string | undefined, fillables: string[]) => {
  const query: FilterQuery<any> = {};

  if (search) {
    query.$or = [];

    if (Types.ObjectId.isValid(search)) {
      query.$or.push({ _id: search });
    }

    fillables.forEach((fillable: string) => {
      query.$or?.push({ [fillable]: { $regex: new RegExp(search, "ig") } });
    });
  }

  return query;
};

export const projectionBuilder = (fields: string | undefined, fillables: string[]) => {
  const projection: Record<string, boolean> = {
  };

  fillables = [...fillables, "updatedAt", "createdAt", "deletedAt"]

  if (fields) {
    if (fields.includes(",")) {
      fields.split(",").forEach((field: string) => {
        if (fillables.includes(field)) {
          projection[field] = true;
        }
      });
    } else {
      if (fillables.includes(fields)) {
        projection[fields] = true;
      }
    }
  }

  return projection;
};

export const sortingBuilder = (sorting: string | undefined, order: "desc" | "asc" | undefined, fillables: string[]) => {
  let sortingCriteria: Record<string, -1 | 1> = {};

  fillables = [...fillables, "createdAt", "deletedAt", "updatedAt", "_id"]

  if (sorting) {
    if (fillables.includes(sorting)) {
      sortingCriteria[sorting] = order === "desc" ? -1 : 1;
    }
  }

  return sortingCriteria;
};

/**
 * This function used to create pagination
 *
 * @param paginationValue : number = 8 is the number of displayed documents
 * @param page : number = 0 is the displayed page
 * @returns { skib : number, limit : number }
 * */
export const paginationBuilder = (page: string | undefined, paginationValue: number = 8): { skip: number; limit: number } => {
  return {
    skip: Number(page) ? Number(page) * paginationValue - paginationValue : 0,
    limit: paginationValue,
  };
};

/**
 * generate random id that can be used to index a file in storage
 * */
export const randomId = () => {
  return Date.now() + "-" + Math.round(Math.random() * 1e9);
}

export const paginate = (data: any, pagination: { limit: number, skip: number }, count: number, page: string | undefined) => {
  return {
    data,
    limit: pagination.limit,
    skip: pagination.skip,
    count,
    page: Number(page) ? Number(page) : 1,
  }
};
