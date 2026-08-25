const API_URL =
"https://script.google.com/macros/s/ISI_URL_APPSCRIPT_ANDA/exec";

export async function searchPPM(keyword){
  const response = await fetch(
    `${API_URL}?action=search&keyword=${encodeURIComponent(keyword)}`
  );
  return await response.json();
}
