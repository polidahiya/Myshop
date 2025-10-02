"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContextfn } from "@/app/Context";
import { motion, AnimatePresence } from "framer-motion";

export default function Qrcodescanner({ fps = 10, qrbox = 250 }) {
  const router = useRouter();
  const { scanqr, setscanqr } = AppContextfn();

  useEffect(() => {
    if (!scanqr) return;

    let scanner;

    (async () => {
      const { Html5QrcodeScanner } = await import("html5-qrcode");

      scanner = new Html5QrcodeScanner("reader", {
        fps,
        qrbox,
      });

      scanner.render(
        (decodedText) => {
          const decodedUrl = new URL(decodedText);
          const currentHost = window.location.host;
          if (decodedUrl.host !== currentHost) return;
          router.push(decodedText);
          setscanqr(false);
        },
        (error) => {
          // console.warn(error);
        }
      );
    })();

    return () => {
      if (scanner) {
        scanner.clear().catch(() => {});
      }
    };
  }, [scanqr]);

  return (
    <AnimatePresence>
      {scanqr && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-dvh bg-black/10 dark:bg-black/40 z-40 backdrop-blur-xs flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white p-5 rounded-3xl`}
          >
            <div className="w-full flex items-center justify-between">
              <div className="font-tenor text-3xl">Scan Qr code</div>
              <button
                className="bg-gray-200 rounded-full flex items-center justify-center w-8 h-8"
                onClick={() => setscanqr(false)}
              >
                X
              </button>
            </div>
            <div id="reader" style={{ width: "300px" }} className="mt-5" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
