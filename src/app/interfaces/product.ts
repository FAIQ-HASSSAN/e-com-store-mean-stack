export interface IProduct{
    _id? : string,
    name : String,
    description : String,
    shortDescription : String,
    Price : Number,
    discount : Number,
    images : String[],
    categoryId? : string,
    isFeatured : boolean,
    isNewProducts : boolean
}
