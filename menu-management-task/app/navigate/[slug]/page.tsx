"use client";
import { useParams } from "next/navigation";
import { Squares2X2Icon, FolderIcon } from "@heroicons/react/24/solid";
import DynamicMenu from "../../../components/DynamicMenu";
import BreadCrumb from "../../../components/BreadCrumb";

export default function MenuItem() {
  const params = useParams();
  const { slug } = params;
  
  const pages = {
    menus: {
      title: "Menus",
      description: "",
      icon: <Squares2X2Icon className="h-10 w-10 text-blue-500" />,
    },
    systems: {
      title: "Systems",
      description: "Manage system configurations here",
      icon: <FolderIcon className="h-10 w-10 text-gray-500" />,
    },
    properties: {
      title: "Properties",
      description: "Manage system configurations here",
      icon: <FolderIcon className="h-10 w-10 text-gray-500" />,
    },
    systemscode: {
      title: "Systems Code",
      description: "Manage system configurations here",
      icon: <FolderIcon className="h-10 w-10 text-gray-500" />,
    },
    apilist: {
      title: "API List",
      description: "Manage system configurations here",
      icon: <FolderIcon className="h-10 w-10 text-gray-500" />,
    },
    usersgroup: {
      title: "Users and Group",
      description: "Manage system configurations here",
      icon: <FolderIcon className="h-10 w-10 text-gray-500" />,
    },
    competition: {
      title: "Competition",
      description: "Manage system configurations here",
      icon: <FolderIcon className="h-10 w-10 text-gray-500" />,
    },
  };

  // Fallback for unknown pages
  const pageData = pages[slug as keyof typeof pages] || {
    title: "Not Found",
    description: "This page does not exist",
    icon: <FolderIcon className="h-10 w-10 text-red-500" />,
  };

  return (
    <div>
      <BreadCrumb title={slug}/>      
    <div className="pt-6">
      <div className="flex items-center space-x-4">
        {pageData.icon }
        <h1 className="text-3xl font-bold">{pageData.title}</h1>
      </div>
      <p className="mt-10 text-gray-600">{pageData.description}</p>
      {slug === "menus" && <DynamicMenu />}
    </div>
    </div>
  );
}
