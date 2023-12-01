import React from "react";

interface TSectionTitle {
  title: string;
}

const SectionTitle: React.FC<TSectionTitle> = ({ title }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold text-blue-800">{title}</h2>
      <div className="w-16 h-1 bg-blue-800 mx-auto mt-2 rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
