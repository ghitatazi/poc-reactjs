
export default function (feeds) {
  const newFeeds = [];
  feeds.forEach(v => {
    if (v.id !== null && v.name !== null && v.description !== null) {
      newFeeds.push({ id: v.id, name: v.name, description: v.description });
    }
  });
  return newFeeds;
}
