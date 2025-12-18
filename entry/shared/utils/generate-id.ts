import crypto from "crypto";

export const geterateId = (target: string) => {
  return crypto.createHash("sha1").update(target).digest("hex");
};
