export const myArrayQry = (array: any[], queryName: string) =>
  array
    .map((el, idx) => {
      return `${queryName}['${idx}']=` + el;
    })
    .join('&');
