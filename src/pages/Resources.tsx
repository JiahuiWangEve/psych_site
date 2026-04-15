import React, { useEffect, useState } from 'react';
import { getResourcesByCategory, incrementDownloadCount } from '../services/feishu';
import type { ResourceItem } from '../types';
import { Download, BookOpen, Film, FileText, Link } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  '书籍': <BookOpen className="w-5 h-5" />,
  '视频': <Film className="w-5 h-5" />,
  '文章': <FileText className="w-5 h-5" />,
};

const Resources: React.FC = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['全部']);
  const [currentCategory, setCurrentCategory] = useState<string>('全部');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      const data = await getResourcesByCategory(currentCategory === '全部' ? '' : currentCategory);
      setResources(data);
      
      // Extract unique categories
      const allResources = await getResourcesByCategory('');
      const uniqueCategories = ['全部', ...Array.from(new Set(allResources.map(r => r.category)))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('加载资源失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, [currentCategory]);

  const handleDownload = async (resource: ResourceItem) => {
    // 打开链接
    window.open(resource.url, '_blank');
    
    try {
      // 增加下载计数
      await incrementDownloadCount(resource.id, resource.downloadCount);
      // 更新本地状态
      setResources(resources.map(r => 
        r.id === resource.id 
          ? { ...r, downloadCount: r.downloadCount + 1 } 
          : r
      ));
    } catch (error) {
      console.error('更新下载次数失败:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || <Link className="w-5 h-5" />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          心理学资源分享
        </h1>
        <p className="text-gray-600">
          这里收集了我们整理的心理学相关资源，欢迎下载学习
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCurrentCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentCategory === category
                ? 'bg-primary text-white shadow-sm'
                : 'bg-muted text-gray-600 hover:bg-secondary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20 text-gray-500">
          加载中...
        </div>
      )}

      {/* Resource Grid (Masonry-like) */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max gap-6">
          {resources.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-500">
              暂无资源数据，请先在飞书多维表格中添加
            </div>
          ) : (
            resources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-muted rounded-lg text-primary">
                      {getCategoryIcon(resource.category)}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 bg-secondary/50 rounded-full text-green-700">
                      {resource.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {resource.name}
                </h3>
                <p className="text-gray-600 text-sm mb-5 min-h-[3rem]">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {resource.downloadCount} 次下载
                  </span>
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    下载/查看
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Resources;
