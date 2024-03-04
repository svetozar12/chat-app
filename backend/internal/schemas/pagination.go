package schemas

type PaginationSchema[T any] struct {
	Pagination Pagination `json:"pagination" binding:"required"`
	Data       T          `json:"data" binding:"required"`
}

type Pagination struct {
	Total  int64 `json:"total" binding:"required"`
	Offset int   `json:"offSet" binding:"required"`
	Limit  int   `json:"limit" binding:"required"`
}
