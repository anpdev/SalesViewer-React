function useConfig() {
  let domain = window.location.hostname;
  if (domain.includes("localhost") || domain.includes("10.37.69")) {
    domain = process.env.REACT_APP_DOMAIN;
  }
  return {
    apiUrl: `https://${domain}/rest/v2/`,
    appDomain: `https://${domain}`,
  };
}

export default useConfig;
