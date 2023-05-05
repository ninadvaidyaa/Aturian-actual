import dayjs from "dayjs";

export const getFormattedDate = (
  data: Date | string,
  dateFormat: string,
  targetFormat?: string
) => {
  // eslint-disable-next-line valid-typeof
  const date = data instanceof Date ? dayjs(data) : dayjs(data, dateFormat);
  return date.format(targetFormat ?? "MM/DD/YYYY");
};
