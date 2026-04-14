import React from 'react';
import { Calendar, MessageSquare, Heart, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="my-10 lg:my-16">
        <div className="card-glass p-8 lg:p-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-green-800 mb-6">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">欢迎加入我们</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
            心理社团
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            我们关注大学生的心理健康与精神世界，渴望搭建一个有温度有回应有趣的交流平台。
            把「内在探索」当成一种爱好，一起研究认知、情绪、思维本身，在交流中打破孤立，
            让思考不再是一个人的内耗。
          </p>
        </div>
      </section>

      {/* Introduction & Activities */}
      <section className="grid md:grid-cols-2 gap-6 my-10">
          {/* Introduction */}
          <div className="card-glass p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">关于我们</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              我们是由一群对心理学感兴趣的同学自发组织的社团。在这里，你可以：
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1"><Users className="w-5 h-5" /></span>
                <span>一起分享心理学相关书籍和资源</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1"><MessageSquare className="w-5 h-5" /></span>
                <span>参与读书会和主题讨论活动</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1"><Heart className="w-5 h-5" /></span>
                <span>互相陪伴，共同成长</span>
              </li>
            </ul>
          </div>

          {/* Activity Preview */}
          <div className="card-glass p-6 lg:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">近期活动</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">每周心理学读书会</h3>
                </div>
                <p className="text-gray-600 text-sm">每周五晚 7:00-9:00</p>
                <p className="text-gray-500 text-sm mt-1">学生活动中心 302 室</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">MBTI 人格茶话会</h3>
                </div>
                <p className="text-gray-600 text-sm">每月第一个周六下午</p>
                <p className="text-gray-500 text-sm mt-1">咖啡馆线下交流</p>
              </div>
            </div>
          </div>
      </section>

      {/* Contact Info */}
      <section className="my-10">
        <div className="card-glass p-6 lg:p-10 text-center">
            <h2 className="text-2xl font-bold mb-6">加入我们</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div>
              <p className="text-gray-600 mb-2">QQ 交流群</p>
              <p className="text-xl font-semibold text-primary">123456789</p>
            </div>
            <div className="w-40 h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              二维码位置
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
