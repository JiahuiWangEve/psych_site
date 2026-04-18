import React, { useState, useEffect, useMemo } from 'react';

interface ResourceItem {
  标题: string;
  链接: string;
  标签: string;
  来源: string;
  创建时间: string;
}

interface ClassItem {
  一级分类?: string;
  二级分类?: string;
  三级分类?: string;
  子类别: string;
  关联?: string;
}

const ResourceHub: React.FC = () => {
  const [allData, setAllData] = useState<ResourceItem[]>([]);
  const [classData, setClassData] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  // 加载 JSON 数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const [videoRes, classRes] = await Promise.all([
          fetch('/data/资源数据集.json'),
          fetch('/data/分类库.json')
        ]);

        if (!videoRes.ok) throw new Error('无法加载资源数据集');
        if (!classRes.ok) throw new Error('无法加载分类库');

        const videos = await videoRes.json();
        const classes = await classRes.json();

        setAllData(videos);
        setClassData(classes);
        setLoading(false);
      } catch (err) {
        console.error('加载数据失败:', err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 获取所有分类选项
  const categories = useMemo(() => {
    const catSet = new Set<string>();
    classData.forEach(item => {
      if (item.一级分类) catSet.add(item.一级分类);
      if (item.子类别) catSet.add(item.子类别);
    });
    return Array.from(catSet).sort((a, b) => a.localeCompare(b, 'zh'));
  }, [classData]);

  // 获取所有来源选项
  const sources = useMemo(() => {
    const sourceSet = new Set<string>();
    allData.forEach(item => {
      if (item.来源) sourceSet.add(item.来源);
    });
    return Array.from(sourceSet).sort((a, b) => a.localeCompare(b, 'zh'));
  }, [allData]);

  // 筛选数据
  const filteredData = useMemo(() => {
    return allData.filter(item => {
      // 搜索关键词匹配
      const keyword = searchKeyword.toLowerCase().trim();
      const title = item.标题?.toLowerCase() || '';
      const tags = item.标签?.toLowerCase() || '';
      const matchSearch = !keyword || title.includes(keyword) || tags.includes(keyword);

      // 分类匹配
      if (!selectedCat) {
        // 没有选择分类，直接通过
      } else {
        // 收集该资源的所有分类层级
        let itemCategories: string[] = [];
        const rawTags = item.标签 || '';
        itemCategories = rawTags.split(',').map(t => t.trim()).filter(t => t);

        // 从分类库中添加上级分类
        classData.forEach(row => {
          if (row.子类别 && itemCategories.includes(row.子类别)) {
            Object.entries(row).forEach(([key, value]) => {
              if (key !== '关联' && value && typeof value === 'string' && value.trim()) {
                if (!itemCategories.includes(value.trim())) {
                  itemCategories.push(value.trim());
                }
              }
            });
          }
        });

        if (!itemCategories.includes(selectedCat)) {
          return false;
        }
      }

      // 来源匹配
      if (selectedSource && item.来源 !== selectedSource) {
        return false;
      }

      return matchSearch;
    });
  }, [allData, searchKeyword, selectedCat, selectedSource, classData]);

  // 重置筛选
  const resetFilters = () => {
    setSearchKeyword('');
    setSelectedCat('');
    setSelectedSource('');
  };

  // 处理标签颜色
  const getTagColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-green-100 text-green-700',
      'bg-purple-100 text-purple-700',
      'bg-yellow-100 text-yellow-700',
      'bg-pink-100 text-pink-700',
      'bg-indigo-100 text-indigo-700',
    ];
    return colors[index % colors.length];
  };

  // 处理链接跳转
  const openLink = (url: string) => {
    let fullUrl = url;
    if (!fullUrl.startsWith('http')) {
      if (fullUrl.startsWith('//')) {
        fullUrl = 'https:' + fullUrl;
      } else if (fullUrl.startsWith('www.')) {
        fullUrl = 'https://' + fullUrl;
      } else if (fullUrl.includes('bilibili.com')) {
        fullUrl = 'https://' + fullUrl;
      }
    }
    window.open(fullUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20 text-gray-500">
          📀 正在加载资源库，请稍后...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          🧠 心理学资源分享库
        </h1>
        <p className="text-gray-600 mb-6">
          收集整理了优质的心理学相关视频、文章和工具，点击卡片即可观看/访问
        </p>
      </div>

      {/* 筛选工具区 */}
      <div className="bg-white rounded-2xl p-5 mb-7 shadow-sm border border-gray-200 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="🔍 搜索标题或标签..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">📁 全部分类</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">📄 全部来源</option>
          {sources.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium"
        >
          🔄 重置
        </button>
      </div>

      {/* 资源卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredData.map((item, index) => {
          const tags = item.标签?.split(',').map(t => t.trim()).filter(t => t) || [];
          const sources = item.来源?.split(',').map(s => s.trim()).filter(s => s) || [];

          return (
            <div
              key={index}
              onClick={() => openLink(item.链接)}
              className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-relaxed">
                {item.标题}
              </h3>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(tagIndex)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {sources.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {sources.map((source, sourceIndex) => (
                    <span
                      key={sourceIndex}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-700"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center text-sm text-blue-600 font-medium pt-3 border-t border-gray-100">
                <span className="mr-2">▶</span>
                点击访问
              </div>
            </div>
          );
        })}
      </div>

      {/* 空状态 */}
      {filteredData.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl text-gray-500">
          ✨ 没有找到相关资源，试试调整筛选条件～
        </div>
      )}

      {/* 投稿按钮放在列表末尾，样式和跳转按钮保持一致，颜色稍灰 */}
      <div className="flex flex-wrap justify-center gap-4 mt-12">
        <a
          href="https://docs.qq.com/smartsheet/form/fgBoxDHhmGZF%2Ft00i2h%2FvBF3ya?tab=t00i2h"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors font-medium shadow-sm hover:shadow"
        >
          <span>➕</span>
          投稿分享你的心理学资源
        </a>
      </div>
    </div>
  );
};

export default ResourceHub;
