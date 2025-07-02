import React, { useEffect } from 'react';
import SharePage from './components/sharePage';
import pyScript from "@/scripts/python/test.py"

const Home: React.FC = () => {

  async function main() {
    let pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
    });
    await pyodide.runPythonAsync(pyScript);
    const add = pyodide.globals.get('add');
    const result = add(1, 4);
    console.log(result);
  }

  useEffect(() => {
    main();
  }, [])

  return (
    <>
      <div>Home Page</div>
      <SharePage></SharePage>
    </>
  )
}

export default Home;