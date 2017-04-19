import { timestampToDate } from './DateFormatter';

export default function (datapoints, selectedFeed) {
  // formatter les valeurs pour obt SERIE type: [{"name": Feed1, data: [value1, value2 ...]}]
  // formatter les valeurs pour obt CATEGORY type: [timestamp1, timestamp2 ...]
  const serie = {};
  serie.name = `Feed ${selectedFeed}`;
  serie.data = [];
  const category = [];
  const result = {};

  if (datapoints) {
    datapoints.forEach(p => {
      const val = Number(parseFloat(p.value).toFixed(2));
      serie.data.push(val);
      const t = timestampToDate(p.timestamp);
      category.push(t);
    });

    result.serie = serie;
    result.category = category;
  }

  return result;
}
