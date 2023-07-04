function getStockDetails(symbolName) {
  const regex = /([A-Z]+)(\d{2})([A-Z]+)(\d{2})(\d+)([A-Z]+)/;
  const [, option_name, day, month, year, value, type] =
    symbolName.match(regex);

  return [option_name, day, month, year, value, type];
}

function checkUnderlying(symbolName) {
  if (symbolName.endsWith("PE") || symbolName.endsWith("CE")) return false;
  return true;
}

module.exports = {
  getStockDetails,
  checkUnderlying,
};
