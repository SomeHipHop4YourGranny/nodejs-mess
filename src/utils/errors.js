import http from "http";

function httpErrorCreater({
  status: status = 500,
  message: message = "",
  additionalData: additionalData = "",
}) {
  const err = new Error();
  err.status = status;
  err.message =
    message === ""
      ? `${http.STATUS_CODES[status]} ${additionalData}`
      : `${message} ${additionalData}` || 500;

  return err;
}

export default httpErrorCreater;
