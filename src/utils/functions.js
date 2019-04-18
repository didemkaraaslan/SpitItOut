import * as Tag from "./Tags";

export const pickTagColor = tag => {
  let tagColor = "grey";
  switch (tag) {
    case Tag.REGRET:
      tagColor = "yellow";
      break;
    case Tag.FIRST_EXPERIENCE:
      tagColor = "yellow";
      break;
    case Tag.SAD:
      tagColor = "yellow";
      break;
    case Tag.GUILTY:
      tagColor = "yellow";
      break;
    case Tag.LOVE:
      tagColor = "yellow";
      break;
    case Tag.HAPPY:
      tagColor = "yellow";
      break;
    case Tag.CONGRATULATIONS:
      tagColor = "yellow";
      break;
    case Tag.DEPRESSION:
      tagColor = "yellow";
      break;
    case Tag.CHEATING:
      tagColor = "yellow";
      break;
    case Tag.MOCKING:
      tagColor = "yellow";
      break;
    case Tag.SEXUAL_ABUSE:
      tagColor = "yellow";
      break;
  }

  return tagColor;
};
