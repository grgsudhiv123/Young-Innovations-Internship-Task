export const getPlainText = (htmlText: string | undefined) => {
  if (!htmlText) return;

  return htmlText
    .replace(/<(.|\n)*?>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};
