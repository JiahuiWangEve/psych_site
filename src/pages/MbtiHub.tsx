import React from 'react';
import mbtiList from '../data/mbtiList';
import { ExternalLink } from 'lucide-react';

const MbtiHub: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          MBTI 衍生测试集合
        </h1>
        <p className="text-gray-600">
          收集了各种流行的 MBTI 及其衍生人格测试，点击卡片即可跳转
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mbtiList.map((test) => (
          <a
            key={test.id}
            href={test.url}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                {test.name}
              </h3>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-gray-600">
              {test.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MbtiHub;
