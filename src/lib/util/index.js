export const isDefined = (value) => {
    return value !== null && value !== undefined;
}

export const truncateText = () => {
  return `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
};

export const truncateTextInRows = (rowCount) => {
  if (!isDefined(rowCount) || rowCount == 0 || rowCount == 1) {
    return truncateText();
  }

  return `
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    word-break: break-all;

    @supports (-webkit-line-clamp: ${rowCount}) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: initial;
      display: -webkit-box;
      -webkit-line-clamp: ${rowCount};
      -webkit-box-orient: vertical;    
    }
  `;
};