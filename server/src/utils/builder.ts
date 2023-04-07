import { FilterQuery, Types } from "mongoose"

export const queryBuilder = (search: string | undefined, fillables: string[]) => {

  const query: FilterQuery<any> = {};

  if (search) {

    query.$or = [];

    if (Types.ObjectId.isValid(search)) {
      query.$or.push({ _id: search })
    }

    fillables.forEach((fillable: string) => {
      query.$or?.push({ [fillable]: { $regex: new RegExp(search, "ig") } })
    })

  }

  return query
}

export const projectionBuilder = (fields: string | undefined, fillables: string[]) => {

  const projection: Record<string, boolean> = {}

  if (fields) {

    if (fields.includes(",")) {

      fields.split(",").forEach((field: string) => {
        if (fillables.includes(field)) {
          projection[field] = true
        }
      })

    } else {

      if (fillables.includes(fields)) {
        projection[fields] = true
      }

    }

  }

  return projection
}

export const sortingBuilder = (sorting: string | undefined, order: "desc" | "asc" | undefined, fillables: string[]) => {

  let sortingCriteria: Record<string, -1 | 1> = {};

  if (sorting) {

    if (fillables.includes(sorting)) {

      sortingCriteria[sorting] = order === "desc" ? -1 : 1

    }

  }

  return sortingCriteria
}

/**
* This function used to create pagination 
*
* @param paginationValue : number = 8 is the number of displayed documents
* @param page : number = 0 is the displayed page
* @returns { skib : number, limit : number }
* */
export const paginationBuilder = (page: string | undefined, paginationValue: number = 8): { skip: number, limit: number } => {

  return {
    skip: Number(page) ? ( Number(page) * paginationValue - paginationValue ) : 0 ,
    limit: paginationValue
  }

}

/**
* generate random id that can be used to index a file in storage
* */
export const randomId = () => {
  return Date.now() + '-' + Math.round(Math.random() * 1E9)
}

