export interface PageInfo {
    endCursor: string | null
    startCursor: string | null
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface Pagination extends PageInfo {
    first: number
}