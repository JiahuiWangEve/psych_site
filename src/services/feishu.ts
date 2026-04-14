import axios from 'axios';
import type { ResourceItem, FeishuTableRecord } from '../types';

const APP_TOKEN = import.meta.env.VITE_FEISHU_APP_TOKEN;
const TABLE_ID = import.meta.env.VITE_FEISHU_TABLE_ID;

// 获取飞书访问令牌（通过后端API获取）
async function getTenantAccessToken(): Promise<string> {
  const response = await fetch('/api/feishu/token');
  const data = await response.json();
  return data.tenant_access_token;
}

// 获取所有资源列表
export async function getResources(): Promise<ResourceItem[]> {
  const token = await getTenantAccessToken();
  
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`;
  
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    params: {
      page_size: 100,
    }
  });

  if (response.data.code !== 0) {
    throw new Error(response.data.msg);
  }

  const items: ResourceItem[] = response.data.data.items.map((item: FeishuTableRecord) => {
    const fields = item.fields;
    return {
      id: item.record_id,
      name: fields['资源名称'] || '',
      category: fields['分类'] || '其他',
      description: fields['简介描述'] || '',
      url: fields['资源链接'] || '',
      downloadCount: fields['下载次数'] || 0,
    };
  });

  return items;
}

// 更新下载次数
export async function incrementDownloadCount(recordId: string, currentCount: number): Promise<void> {
  const token = await getTenantAccessToken();
  
  const url = `https://open.feishu.cn/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records/${recordId}`;
  
  await axios.patch(url, {
    fields: {
      '下载次数': currentCount + 1,
    }
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}

// 按分类筛选资源
export async function getResourcesByCategory(category: string): Promise<ResourceItem[]> {
  const allResources = await getResources();
  if (!category || category === '全部') {
    return allResources;
  }
  return allResources.filter(r => r.category === category);
}
