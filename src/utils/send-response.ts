import { Response } from "express";

const sendResponse = <T>(res: Response<T>, result: T) => {
  const response = {
    version: "1.0.0",
    timestamp: new Date(),
    result: result,
  };
  res.status(200).json(response as T);
};

export default sendResponse;
