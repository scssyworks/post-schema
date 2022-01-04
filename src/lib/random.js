module.exports = function random(min = 0, max = 9) {
  // Safety check for invalid values
  min = typeof min === 'number' ? Math.floor(min) : 0;
  max = typeof max === 'number' ? Math.floor(max) : 9;
  return Math.floor(Math.random() * (max - min + 1) + min);
};
