import { useEffect, useState } from "react";

const useShowMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const queryParams = getQueryParams(window.location.hash) as Dict;

    if (queryParams?.showMenu === "true") {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [])

  const getQueryParams = (hash: string) => {
    let queryParams = {};
    let queryString = hash.split('?')[1];
    if (queryString) {
        queryString.split('&').forEach(param => {
            let [key, value] = param.split('=');
            queryParams[key] = decodeURIComponent(value);
        });
    }
    return queryParams;
  }

  return { showMenu, setShowMenu };
}

export default useShowMenu;