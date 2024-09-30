import { FolderIcon } from '@heroicons/react/24/outline';

const Breadcrumb = ({ title }) => {
  return (
    <div className="flex items-center space-x-2 text-gray-700">
      {/* Folder Icon */}
      <FolderIcon className="h-6 w-6 text-gray-300" />

      {/* Breadcrumb Text */}
      <span className="text-gray-400">/</span>
      <h2 className="text-lg font-medium text-gray-500">{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
    </div>
  );
};

export default Breadcrumb;
