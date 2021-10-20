import axios from "axios";
import { INSERT_BOARD } from "./types";
export function insertBoard(dataToSubmit) {
  const resultState = axios
    .post("/server/board/insert", dataToSubmit)
    .then(response => response.data);

  return {
    type: INSERT_BOARD,
    payload: resultState
  };
}
