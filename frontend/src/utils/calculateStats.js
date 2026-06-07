export function calculateStats(
  history
) {

  let withMask = 0;

  let noMask = 0;

  let incorrectMask = 0;

  history.forEach((item) => {

    if (
      item.label ===
      "with_mask"
    )
      withMask++;

    else if (
      item.label ===
      "no_mask"
    )
      noMask++;

    else
      incorrectMask++;

  });

  return {

    total:
      history.length,

    withMask,

    noMask,

    incorrectMask

  };

}