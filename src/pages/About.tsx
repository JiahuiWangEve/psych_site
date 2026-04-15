import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="card-glass p-8 lg:p-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
            关于我们
          </h1>
          
          <div className="prose prose-gray text-gray-600 leading-relaxed">
            <p className="mb-4">
              我们是一群热爱心理学的大学生，因为共同的兴趣走到了一起。
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              我们的宗旨
            </h2>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>推广心理学知识，让更多人了解心理学</li>
              <li>提供一个安全包容的交流环境，让大家可以自由探讨内心世界</li>
              <li>关注大学生心理健康，帮助更多人认识自己、接纳自己</li>
              <li>以兴趣为导向，让「内在探索」成为一种生活方式</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              活动形式
            </h2>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>读书会：一起读心理学经典书籍</li>
              <li>讨论会：探讨热门心理学话题</li>
              <li>观影会：观看心理学相关电影并分享感受</li>
              <li>茶话会：轻松交流人格测试、个人成长等话题</li>
              <li>更多活动方式正在探索中...欢迎提出建议！</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              联系方式
            </h2>
            
            <p className="mb-6">
              如果你也对心理学感兴趣，欢迎加入我们的 QQ 群交流：
              <strong className="text-primary">453440021</strong>
            </p>

            <div className="mt-6">
              <p className="mb-4 text-gray-600">扫码直接加入：</p>
              <img 
                src="/website_images/qrcode_1776231135790.jpg" 
                alt="QQ群二维码" 
                className="max-w-xs rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
