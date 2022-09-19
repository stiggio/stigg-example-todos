export function guid() {
  const s4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function randomColor() {
  const hex = Math.floor(Math.random() * 0xffffff);
  const color = '#' + hex.toString(16);

  return color;
}
