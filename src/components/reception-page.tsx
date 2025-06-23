"use client";
import { motion } from "framer-motion";

export default function FullPageRecetionView() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-200">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center rounded-xl shadow-xl bg-white/80 p-6 mt-8 mb-8 border border-yellow-200">
        {/* <div className="w-full border-b pb-2 mb-4 text-center text-3xl font-extrabold text-orange-700 tracking-wide drop-shadow">
          Design delicious recipes
        </div> */}
        <div className="flex items-center justify-center rounded-md p-2 mb-4">
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-72 max-w-xs"
            style={{ filter: "drop-shadow(0 4px 16px #fbbf24aa)" }}
          >
            <video
              src="/Delicipes.mp4" // Place your .mp4 in the public folder
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
          </motion.div>
        </div>
        <div className="mb-2 flex w-full flex-1 flex-col rounded-md border-t bg-yellow-50/80 text-orange-900 lg:w-3/4 lg:border-l lg:border-t-0 shadow-inner">
          <div className="p-4 text-lg font-semibold text-center">
            Adjust prices and ingredient quantities to your will and build your own recipes.
          </div>
          <div className="p-4 flex items-center justify-center text-orange-700 font-medium">
            Plan your week meals and get your groceries list with a budget!
          </div>
        </div>
      </div>
    </div>
  );
}
