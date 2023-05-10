import { Document } from 'mongoose'

export interface IProduct {
  name: string
  images: string[]
  price: number
  discount: number
  inStock: boolean
  shortDescription: string
  description: string
  categories: string[]
  deletedAt?: Date | null
}

export interface IProductDocument extends Document, IProduct {}
