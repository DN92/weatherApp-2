export default function createInlineStyleObj(...args: Array<React.CSSProperties>): React.CSSProperties {
  const allInputs = Array.from(args).reverse(); // using reverse here should make the first arg have the highest priority
  return allInputs.reduce((acc, next) => {
    return { ...acc, ...next };
  }, {});
}
