const AutoFormTooltip = ({ fieldConfigItem }: { fieldConfigItem: any }) => {
  const descriptionElement = fieldConfigItem?.description && (
    <p className="text-sm text-gray-500 dark:text-white">
      {fieldConfigItem.description}
    </p>
  );
  return descriptionElement;
};

export default AutoFormTooltip;
