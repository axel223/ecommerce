import CryptoJS from "crypto-js";

// TO CHECK for ENV variables
export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET ?? "").toString();
};

export const decrypt = (text: string) => {
  return CryptoJS.AES.decrypt(text, process.env.CRYPTO_SECRET ?? "").toString(
    CryptoJS.enc.Utf8,
  );
};
