import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../styles/interactionObserver.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Modal from "../components/common/Modal/Modal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer autoClose={1000} />
      <Modal />
    </>
  );
}

export default MyApp;
