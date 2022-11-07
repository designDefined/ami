import zustandQuery from "./index";

export interface IQueryStore<ResponseType> {
  fetch: (response: ResponseType) => void;
}
