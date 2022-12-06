export function getTagColor(tag: 'momos' | 'dominos' | 'coke') {
  const tagColorMap = {
    momos: '#61dafb',
    dominos: '#42b883',
    coke: '#dd1b16',
  };
  return tagColorMap[tag] || '#000';
}
