export const Card = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${
        hover ? 'hover:shadow-lg transition-shadow duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>;
};

export const CardBody = ({ children, className = '' }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return <div className={`p-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>;
};
