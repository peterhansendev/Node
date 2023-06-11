const transformData = (input) => {
    const transformed = {};
  
    input.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
  
        if (!transformed[key]) {
          transformed[key] = new Set([value]);
        } else {
          transformed[key].add(value);
        }
      });
    });
  
    const result = Object.entries(transformed).map(([param, values]) => ({
      param,
      values: Array.from(values).sort(),
    }));
  
    return result;
  };
  
  module.exports = transformData;
  