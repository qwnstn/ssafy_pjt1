const getPayloadFromToken = (token) => {
  try {
    const [header, payload] = token.split(".");
    console.log(header[0])
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding JWT: ", error);
    return null;
  }
};

export default getPayloadFromToken;
