export interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: { [key: string]: string };
}

export interface GitHubPayload {
  total_count: number;
  incompelete_results: boolean;
  items: GitHubRepo[];
}

export type Hub = 'gitlab' | 'github';

export interface GitLabRepo {
  id: string;
  name: string;
  description: string;
}
