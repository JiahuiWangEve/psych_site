import React, { useState, useMemo } from 'react';
import mbtiList from '../data/mbtiList';
import { ExternalLink } from 'lucide-react';

const MbtiHub: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');

  // 获取所有不重复的 type
  const types = useMemo(() => {
    const typeSet = new Set<string>();
    mbtiList.forEach(test => typeSet.add(test.type));
    return ['all', ...Array.from(typeSet)];
  }, []);

  // 根据 type 筛选
  const filteredList = useMemo(() => {
    if (selectedType === 'all') {
      return mbtiList;
    }
    return mbtiList.filter(test => test.type === selectedType);
  }, [selectedType]);

  // 给不同 type 设置不同的颜色
  const getTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      '总体人格': 'bg-blue-100 text-blue-700',
      '娱乐玩梗': 'bg-pink-100 text-pink-700',
      '细分领域': 'bg-green-100 text-green-700',
    };
    return colorMap[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          MBTI 衍生测试集合
        </h1>
        <p className="text-gray-600 mb-6">
          收集了各种流行的 MBTI 及其衍生人格测试，点击卡片即可跳转
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href="https://docs.qq.com/form/page/DZnNDVkN4UExEYnNF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium shadow-sm hover:shadow"
          >
            <span>➕</span>
            投稿新的 MBTI 变体测试
          </a>
        </div>

        {/* 筛选器 */}
        <div className="inline-flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
          <label htmlFor="type-filter" className="text-gray-700 font-medium">
            按类型筛选：
          </label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">全部 ({mbtiList.length})</option>
            {types.filter(t => t !== 'all').map(type => (
              <option key={type} value={type}>
                {type} ({mbtiList.filter(t => t.type === type).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((test) => (
          <a
            key={test.id}
            href={test.url}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                {test.name}
              </h3>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
            <p className="text-gray-600 mb-4">
              {test.description}
            </p>
            {/* 显示 type 标签 */}
            <div className="flex items-center">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(test.type)}`}>
                {test.type}
              </span>
            </div>
          </a>
        ))}
      </div>

      {filteredList.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          没有找到该类型的测试 😕
        </div>
      )}
    </div>
  );
};

export default MbtiHub;
