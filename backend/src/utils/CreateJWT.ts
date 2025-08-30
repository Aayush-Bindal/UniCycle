import jwt from "jsonwebtoken";

interface payloadType {
  uid: number;
}

const JWT_SECRET = "gbtw4hukfvhjksbfcjvkwbjq32knravewdqnlJEKCHVBFEIDNJFKV";

export default function CreateJWT(userid: number) {
  let payload: payloadType = { uid: userid };
  console.log(payload);
  let genrated_token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });

  return genrated_token;
}
