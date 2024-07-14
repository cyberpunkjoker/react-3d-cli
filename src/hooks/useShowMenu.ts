import { useEffect, useState } from "react";

const useShowMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // 获取query string参数
    const query = new URLSearchParams(window.location.search);
    // 获取showMenu参数 
    const showMenuParam = query.get("showMenu");

    if (showMenuParam === "true") {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }

  }, [])

  return { showMenu, setShowMenu };
}

export default useShowMenu;