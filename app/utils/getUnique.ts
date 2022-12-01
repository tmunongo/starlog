import type { Place } from "@prisma/client";

export function getUnique(places: Place[]) {
  const flag = {};
  let array: Place[] = [];
  places.forEach((elem: Place) => {
    if (!flag[elem.category]) {
      flag[elem.category] = true;
      array.push(elem);
    }
  });

  return array;
}
