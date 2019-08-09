function Header (title, dataIndex, className = null) {
  return {
    title,
    dataIndex,
    className
  };
}

export const rowHeaders = [
  new Header('#', 'rowNum'),
  new Header('Name', 'rowName'),
  new Header('Account', 'rowAccount'),
  new Header('Date', 'rowDate')
];
