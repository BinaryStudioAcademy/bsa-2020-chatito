export async function makeRequest(name: string) {
  const response = await fetch('https://',{
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(name)
    });
}