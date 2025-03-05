export type PaginateInterface = {
  data: any[];
  page: number;
  perPage: number;
  totalData: number;
};

export const paginate = ({ data, page, perPage, totalData }: PaginateInterface) => {
  const response = {
    data,
    meta: {
      currentPage: Number(page),
      lastPage: Math.ceil(totalData / perPage),
      perPage: perPage,
      totalPages: Math.ceil(totalData / perPage),
      totalItems: totalData,
    },
  };

  return response;
};
