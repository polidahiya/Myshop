"use client";
import QRCode from "react-qr-code";
import { AppContextfn } from "@/app/Context";
import { motion, AnimatePresence } from "framer-motion";

export default function Showqrcode() {
  const { showqr, setshowqr } = AppContextfn();
  return (
    <AnimatePresence>
      {showqr.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-dvh bg-black/10 dark:bg-black/40 z-40 backdrop-blur-xs flex items-center justify-center"
          onClick={() => setshowqr({ show: false, link: "" })}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white p-5 rounded-3xl`}
          >
            <div className="text-center font-tenor text-3xl">My Store</div>
            <div className="mt-5">
              <QRCode value={showqr?.link || ""} />
            </div>
            <p className="mt-5 text-center text-sm">Scan the QR code to visit store.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
