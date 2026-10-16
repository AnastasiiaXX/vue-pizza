export default function (element, dictionary) {
  return { ...element, value: dictionary[element.id] };
}
