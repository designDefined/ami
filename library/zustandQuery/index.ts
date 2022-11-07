// import create from "zustand";
// import axios from "axios";
//
// let baseURL: string = "";
//
// const baseQuery = {
//   setBaseURL: (url: string) => {
//     baseURL = url;
//   },
// };
//
// const createQuery = <ResponseType extends {}, RequestType extends {}>(
//   initialResponse: ResponseType,
//   initialRequest:RequestType,
//   endpoint:(body:)
// ) => {
//
//
//   const queryStore = create<StoreType>((set) => ({
//     ...initialState,
//   }));
//
//   const fetchQuery = async () => {
//     try {
//       const response = await axios["get"]<void, ResponseType>(baseURL);
//       queryStore.setState(response);
//     } catch (e) {}
//   };
//
//   interface MutateType {
//     post: (request: RequestType) => void;
//   }
//   const mutate: MutateType = {
//     post: async (request) => {
//       try {
//         const response = await axios["post"]<void, ResponseType>(baseURL, body);
//         queryStore.setState(response);
//       } catch (e) {}
//     },
//   };
//
//   const mutants:[RequestType, (input:RequestType)=>void]=[]
//
//   return queryStore;
// };
//
// const zustandQuery = { baseQuery, createQuery };
//
// export default zustandQuery;
//
// //()=>
