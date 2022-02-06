const basicResponse = (res, status, success, message) => {
  res.status(status).json({
    status: status,
    success: success,
    message: message,
  });
};

const dataResponse = (res, status, message, success, data) => {
  res.status(status).json({
    status: status,
    success: success,
    message: message,
    data: data,
  });
};

const tokenResponse = (res, status, message, success, token) => {
  res.status(status).json({
    status: status,
    success: success,
    message: message,
    token: token,
  });
};

const responseTypes = {
  basicResponse,
  dataResponse,
  tokenResponse,
};

export default responseTypes;
