exports.success = function (req, res, data, status) {
  res.status(status || 200).json({
    body: data
  });
}

exports.error = function (req, res, message, status, details) {
  res.status(status || 500).json({
    error: message
  });
}
