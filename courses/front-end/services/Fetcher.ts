class Fetcher {

    static async fetchGetUrl(url:string) {
      const token = sessionStorage.getItem("token")
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
                  },
        });
        return response;
    }
}
export default Fetcher;