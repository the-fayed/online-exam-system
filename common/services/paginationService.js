const paginationService = (page, size) => {
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 10;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  return { limit, skip };
};

module.exports = paginationService;
