
import React from "react";
import { FanModel } from "./LuxuryModelSelector";
import { motion } from "framer-motion";

interface ModelItemProps {
  model: FanModel;
  index: number;
  activeIndex: number;
  itemCount: number;
  onSelect: () => void;
}

const ModelItem: React.FC<ModelItemProps> = ({
  model,
  index,
  activeIndex,
  itemCount,
  onSelect
}) => {
  const isActive = index === activeIndex;
  
  // Only render the active model
  if (!isActive) return null;
  
  return (
    <motion.div
      key={model.id}
      className="absolute top-0 left-0 cursor-pointer"
      initial={{ x: 250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -250, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={onSelect}
    >
      <h2 className="font-serif text-3xl text-gray-800 tracking-wider">
        {model.name}
      </h2>
      {model.description && (
        <motion.p 
          className="text-sm text-gray-500 mt-1 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {model.description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ModelItem;
