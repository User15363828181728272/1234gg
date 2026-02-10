
export async function fetchVideoData(url: string) {
  try {
    const response = await fetch(`https://api.apocalypse.web.id/download/youtube?url=${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    if (!data.status) throw new Error(data.message || "Gagal mengambil data video.");
    return data.result;
  } catch (e) {
    throw new Error("Layanan sedang sibuk atau URL tidak valid. Silakan coba lagi.");
  }
}
