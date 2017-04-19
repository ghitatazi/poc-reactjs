
export default function (serie) {
  const newSerie = [];
  serie.forEach(v => {
    if (v.value !== null) {
      v.value = parseFloat(v.value);
    }
    v.time = Date.parse(v.time);
    newSerie.push([v.time, v.value]);
  });
  return newSerie;
}
