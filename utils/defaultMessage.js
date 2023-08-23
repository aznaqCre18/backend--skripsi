const defaultMessage = (status, data, message) => {
  if (status === 200) {
    return {
      status,
      message,
      data,
    };
  } else if (status === 500) {
    return {
      status,
      message,
    };
  } else if (status === 404) {
    return {
      status,
      message,
    };
  }
};

module.exports = defaultMessage;
