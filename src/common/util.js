// eslint-disable-next-line camelcase,import/prefer-default-export
export function clamp(x, from_x, to_x) {
  // eslint-disable-next-line camelcase,no-param-reassign
  if (x < from_x) x = from_x;
  // eslint-disable-next-line camelcase,no-param-reassign
  if (x > to_x) x = to_x;

  return x;
}
