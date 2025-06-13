const toISOString = (datetimeLocalValue) => {
    if (!datetimeLocalValue) return null;
    const date = new Date(datetimeLocalValue);
    return date.toISOString(); // Converts to UTC ISO with Z to send to the server 
  };
export default toISOString;