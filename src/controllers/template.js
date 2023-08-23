exports.function = async (req, res) => {
  try {
    res.send({
      status: "Success",
      message: "Action success",
    });
  } catch (error) {
    res.send({
      status: "Error",
      message: "Server Error",
    });
  }
};
