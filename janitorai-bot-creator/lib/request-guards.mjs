export function rejectOversizedRequest(req, res, maxBytes) {
  const rawLength = req.headers["content-length"];
  if (rawLength === undefined) {
    let bytes = 0;
    let rejected = false;
    const cleanup = () => {
      req.off("data", onData);
      req.off("end", cleanup);
      req.off("error", cleanup);
    };
    const onData = (chunk) => {
      if (rejected) return;
      bytes += chunk.length;
      if (bytes <= maxBytes) return;

      rejected = true;
      if (!res.headersSent) {
        res.writeHead(413, { "content-type": "text/plain" });
        res.end("Request entity too large");
      }
      cleanup();
      // Drain the upload after responding so clients that are still writing
      // the request do not receive a premature socket reset.
      req.resume?.();
    };

    // Chunked requests have no trustworthy length header, so count them while
    // the transport reads the same stream and abort once the cap is crossed.
    req.on("data", onData);
    req.once("end", cleanup);
    req.once("error", cleanup);
    return false;
  }

  const length = Number(rawLength);
  if (!Number.isSafeInteger(length) || length < 0) {
    res.writeHead(400, { "content-type": "text/plain" });
    res.end("Invalid Content-Length");
    return true;
  }

  if (length > maxBytes) {
    res.writeHead(413, { "content-type": "text/plain" });
    res.end("Request entity too large");
    // The server has rejected the request, but must still consume its body to
    // let the client finish writing without an EPIPE.
    req.resume?.();
    return true;
  }

  return false;
}
