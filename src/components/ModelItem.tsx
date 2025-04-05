
import React from "react";
import { FanModel } from "./ModelSelector";
import { getModelItemStyle } from "../utils/modelSelectorStyles";

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
  const { transform, className } = getModelItemStyle(index, activeIndex, itemCount);
  
  return (
    <div
      key={model.id}
      style={{ transform }}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {model.name}
    </div>
  );
};

export default ModelItem;
