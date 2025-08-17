import https from "https"


export const tmdbCall = async (url: string) => {

    const agent = new https.Agent({ keepAlive: true });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
    agent
  };

  try{
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.statusText}`);
    }

    const data = await response.json()

    return data;

  }catch(e){
    console.log(e)
    return null;
  }

};
