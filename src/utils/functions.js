import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const elapsedTime = (date) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: fr,
  });

const getRedirectionPath = (params) => {
  let path = "";
  for (let value of params.values()) {
    path += `/${value}`;
  }

  return path;
};

export { elapsedTime, getRedirectionPath };
