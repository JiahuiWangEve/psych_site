export interface ResourceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  downloadCount: number;
}

export interface MbtiTest {
  id: string;
  name: string;
  type:string;
  description: string;
  url: string;
}

export interface FeishuResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface FeishuTableRecord {
  record_id: string;
  fields: Record<string, any>;
}
