const API_URL = `${import.meta.env.VITE_H2LOOP_API_BASE_URL}/api/v1`;

console.log("STARTING_WITH: ", import.meta.env);

export const routes = {
  baseURL: import.meta.env.VITE_H2LOOP_API_BASE_URL,
  status: `${API_URL}/status`,

  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  profile: `${API_URL}/auth/me`,

  createWorkspaces: `${API_URL}/workspaces/`,
  getAllWorkspaces: `${API_URL}/workspaces/`,
  getWorkspace: (id) => `${API_URL}/workspaces/${id}`,
  updateWorkspace: (id) => `${API_URL}/workspaces/${id}`,
  deleteWorkspace: (id) => `${API_URL}/workspaces/${id}`,
  generateRepoDocumentation: (id) =>
    `${API_URL}/workspaces/${id}/generate_repo_documentation`,

  createTemplate: `${API_URL}/templates/`,
  getAllTemplates: `${API_URL}/templates/`,
  getTemplate: (id) => `${API_URL}/templates/${id}`,
  updateTemplate: (id) => `${API_URL}/templates/${id}`,
  updateTemplateWithFile: (id) => `${API_URL}/templates/${id}/file`,

  createDocuments: `${API_URL}/documents/`,
  getAllDocuments: `${API_URL}/documents/`,
  getADocument: (id) => `${API_URL}/documents/${id}`,
  editBlock: (docId, blockId) =>
    `${API_URL}/documents/${docId}/blocks/${blockId}`,
  updateADocument: (id) => `${API_URL}/documents/${id}`,
  deleteADocument: (id) => `${API_URL}/documents/${id}`,

  createDataSources: `${API_URL}/data-sources/`,
  getADataSource: (id) => `${API_URL}/data-sources/${id}`,
  getAllDataSources: (workspaceId) =>
    `${API_URL}/data-sources?workspaceId=${workspaceId}/`,
  updateADataSource: (id) => `${API_URL}/data-sources/${id}`,
  deleteADataSource: (id) => `${API_URL}/data-sources/${id}`,
  refetchTheLatestGitCommit: (id) => `${API_URL}/data-sources/${id}/fetch`,

  updateDataSourceWithFile: (id) => `${API_URL}/data-sources/${id}/file`,
};
