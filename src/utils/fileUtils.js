// Cache de requisições
const cache = {};

/**
 * Função para buscar dados da API com cache e atualizar a cada 1 hora.
 * @param {string} url O URL da API.
 * @returns {Promise<any>} Uma Promise que resolve com os dados da API.
 */
export async function fetchDataFromApi(url) {
  const now = new Date().getTime();
  // Se os dados estiverem no cache e a última atualização for menos de 1 hora atrás, retorna do cache.
  if (cache[url] && (now - cache[url].timestamp) < 60 * 60 * 1000) {
    return cache[url].data;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
    }

    const data = await response.json();
    // Atualiza o cache com os novos dados e o timestamp atual.
    cache[url] = {
      data: data,
      timestamp: now
    };
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
  }
}

/**
 * Função para encontrar um arquivo relacionado com base no nome.
 * @param {string} fileName O nome do arquivo.
 * @param {Array<Object>} fileList A lista de arquivos.
 * @returns {string} O caminho completo do arquivo.
 */
export function findRelatedFile(fileName, fileList) {
  const relatedFile = fileList.find(file => file.name === fileName);
  return relatedFile ? relatedFile.fullPath : '';
}

/**
 * Função para carregar conteúdo de um arquivo remoto com cache.
 * @param {string} containerName O nome do contêiner de onde buscar o conteúdo.
 * @returns {Promise<Array<Object>>} Uma Promise que resolve com uma lista de objetos representando o conteúdo.
 * @throws {Error} Se ocorrer um erro ao buscar o conteúdo.
 */
export async function fetchContent(containerName) {
  const endpoint = `https://apiserverfile.azurewebsites.net/${containerName}`;
  try {
    const contentData = await fetchDataFromApi(endpoint);
    return contentData.map(item => ({
      name: item.name,
      fullPath: item.path
    }));
  } catch (error) {
    throw new Error(`Failed to fetch content from ${containerName}: ${error.message}`);
  }
}
