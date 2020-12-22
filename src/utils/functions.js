import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const elapsedTime = (date) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: fr,
  });

export { elapsedTime };
