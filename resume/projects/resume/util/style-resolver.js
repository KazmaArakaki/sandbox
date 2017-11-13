export default styles => {
  return (...classNames) => {
    return classNames.map(className => {
      return styles[className];
    }).join(" ");
  };
}
