import { useEffect, useState } from "react";
import "./index.css";

const sleep = async (ms) => {
    setTimeout(() => {
        console.log("test")
    }, ms);
}

export default function ComponentButton() {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    // Similar ao componentDidMount e componentDidUpdate:
    useEffect(() => {
      // Atualiza o título do documento usando a API do browser
      document.title = `Você clicou ${count} vezes`;
      console.log(`Você clicou ${count} vezes`)
    });
  
    return (
      <div>
        <p>Você clicou {count} vezes</p>
        <button onClick={() => setCount(count + 1)}>
          Clique aqui
        </button>

        <button onClick={() => setCount2(count2 + 1)}>
          Não clique aqui!
        </button>
      </div>
    );
}