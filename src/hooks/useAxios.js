import axios from "axios";
import useAuth from "./useAuth";
import useConfig from "./useConfig";
function useAxios(baseUrl) {
  const { auth } = useAuth(); 
  const conf = useConfig();
  
  const X_USERNAME = (auth?.X_USERNAME) ? auth.X_USERNAME:"";
  const X_AGENT_ID = (auth?.X_AGENT_ID) ? auth.X_AGENT_ID:"";
  const X_API_SOURCE = (auth?.X_API_SOURCE) ? auth.X_API_SOURCE:"";
  const X_AUTH_KEY = (auth?.X_AUTH_KEY) ? auth.X_AUTH_KEY:"";

  return axios.create({
    baseURL: baseUrl ? baseUrl:conf.apiUrl,
    headers: {
      Accept: "application/json",
      "X-AUTH-KEY": X_AUTH_KEY,
      "X-AGENT-ID":X_AGENT_ID,
      "X-USERNAME": X_USERNAME,
      "X-API-SOURCE": X_API_SOURCE,
    },
  });
}

export default useAxios;