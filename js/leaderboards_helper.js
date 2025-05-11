const levels_by_name = { easy: 0, medium: 1 };

function sortByTime(a, b) {
  return a.time - b.time;
}

function sortByLevel(a, b) {
  return levels_by_name[b.level] - levels_by_name[b.level];
}

function sortByFieldDifficulty(a, b) {
  return b.field_difficulty - a.field_difficulty;
}

function sortByFieldDifficultyperSecond(a, b) {
  let time_by_first = Math.max(0.5, a.time * 1.0);
  let time_by_second = Math.max(0.5, b.time * 1.0);

  return (
    b.field_difficulty / time_by_second - a.field_difficulty / time_by_first
  );
}

function sortByEfficiency(a, b) {
  return b.efficiency - a.efficiency;
}

function sortByDate(a, b) {
  return a.date - b.date;
}

export function sortResultByTime(a, b) {
  let result = sortByTime(a, b);
  if (result != 0) {
    return result;
  }
  result = sortByLevel(a, b);
  if (result != 0) {
    return result;
  }
  result = sortByFieldDifficulty(a, b);
  if (result != 0) {
    return result;
  }
  result = sortByEfficiency(a, b);
  if (result != 0) {
    return result;
  }
  return sortByDate(a, b);
}

export function sortResultByEfficiency(a, b) {
  let result = sortByEfficiency(a, b);
  if (result != 0) {
    return result;
  }
  return sortByTime(a, b);
}

export function sortResultBy3BV(a, b) {
  let result = sortByFieldDifficulty(a, b);
  if (result != 0) {
    return result;
  }
  return sortByTime(a, b);
}

export function sortResultBy3BVperSecond(a, b) {
  let result = sortByFieldDifficultyperSecond(a, b);
  if (result != 0) {
    return result;
  }
  return sortResultBy3BV(a, b);
}
