export const EmptyState = ({
  icon: Icon,
  title,
  titleAs = "h2",
  description,
  action,
  footer,
  className = "",
  iconWrapperClassName = "",
  iconClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}) => {
  const TitleTag = titleAs;

  return (
    <div className={`text-center ${className}`}>
      {Icon && (
        <div
          className={`mx-auto mb-6 flex items-center justify-center ${iconWrapperClassName}`}
        >
          <Icon className={iconClassName} />
        </div>
      )}
      {title && (
        <TitleTag
          className={`font-serif text-2xl md:text-[32px] font-bold text-slate-900 mb-4 ${titleClassName}`}
        >
          {title}
        </TitleTag>
      )}
      {description && (
        <p
          className={`text-slate-500 max-w-[360px] mx-auto mb-10 ${descriptionClassName}`}
        >
          {description}
        </p>
      )}
      {action}
      {footer}
    </div>
  );
};
