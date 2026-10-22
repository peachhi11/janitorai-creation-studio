export function rejectOversizedRequest(req, res, maxBytes) {
  const rawLength = req.headers["content-length"];
  if (rawLength === undefined) return false;

  const length = Number(rawLength);
  if (!Number.isSafeInteger(length) || length < 0) {
    res.writeHead(400, { "content-type": "text/plain" });
    res.end("Invalid Content-Length");
    return true;
  }

  if (length > maxBytes) {
    res.writeHead(413, {
      "content-type": "text/plain",
      "connection": "close"
    });
    res.end("Request entity too large");
    return true;
  }

  return false;
}
