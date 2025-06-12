const toISOString = (datetimeLocalValue) => {
    if (!datetimeLocalValue) return null;
    const date = new Date(datetimeLocalValue);
    return date.toISOString(); // Converts to UTC ISO with Z
  };
export default toISOString;