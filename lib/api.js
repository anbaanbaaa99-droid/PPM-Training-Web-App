const API_URL =
"https://script.google.com/macros/s/AKfycbxbaop9HbasKeMj1d9CqG9jjTqJRq68Gv3f-8zaVobcbv6pDW3LRu4IJpFezpO2nFRi/exec";

export async function searchPPM(keyword){
  const response = await fetch(
    `${API_URL}?action=search&keyword=${encodeURIComponent(keyword)}`
  );
  return await response.json();
}
