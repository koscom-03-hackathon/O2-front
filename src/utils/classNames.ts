export const classNames = (...props: Array<string | boolean | undefined>) =>
  props.filter((elem) => elem && typeof elem !== 'boolean').join(' ')
