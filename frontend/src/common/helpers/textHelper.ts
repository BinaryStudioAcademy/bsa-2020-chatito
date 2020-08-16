export const getTextPart = (text: string, length: number) => {
  const pozz = text.substr(0, length).lastIndexOf(' ');
  let textPart = text.substr(0, pozz - 1);
  if (textPart.length < text.length) {
    textPart += ' ...';
  }
  return textPart;
};
