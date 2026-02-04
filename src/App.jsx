import { useEffect, useState } from "react";

const QUESTION = {
  category: "रामायण क्विज",
  text: "श्रीराम का जन्म किस नगर में हुआ था?",
  options: [
    { id: "A", text: "अयोध्या" },
    { id: "B", text: "मिथिला" },
    { id: "C", text: "काशी" },
    { id: "D", text: "उज्जैन" },
  ],
  correctId: "A",
  explanation:
    "रामायण के अनुसार भगवान श्रीराम का जन्म अयोध्या में हुआ था, जो सरयू नदी के तट पर स्थित है।",
};

export default function App() {
  const [phase, setPhase] = useState("THINK");
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    if (phase !== "THINK") return;

    const t = setInterval(() => {
      setCounter((c) => {
        if (c === 1) {
          clearInterval(t);
          setPhase("ANSWER");
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "ANSWER") {
      const t = setTimeout(() => setPhase("EXPLAIN"), 2000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ padding: 12, textAlign: "center", color: "#FF9933" }}>
        {QUESTION.category} · प्रश्न 1/10
      </div>

      <div style={{ padding: 16, fontSize: 22, textAlign: "center" }}>
        {QUESTION.text}
      </div>

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          padding: 16,
        }}
      >
        {QUESTION.options.map((o) => {
          const isCorrect = o.id === QUESTION.correctId;
          const showAnswer = phase !== "THINK";

          return (
            <div
              key={o.id}
              style={{
                background: showAnswer && isCorrect ? "#1b5e20" : "#111",
                border: "1px solid #333",
                borderRadius: 12,
                padding: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: "#222",
                  borderRadius: 8,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#777",
                  fontSize: 12,
                }}
              >
                IMAGE
              </div>
              <div style={{ textAlign: "center", fontSize: 16 }}>
                {o.text}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          height: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {phase === "THINK" && (
          <>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: "4px solid #FF9933",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: "bold",
                color: "#FF9933",
              }}
            >
              {counter}
            </div>
            <div style={{ marginTop: 8, color: "#ccc" }}>
              सोचिए… सही उत्तर क्या है?
            </div>
          </>
        )}

        {phase === "ANSWER" && (
          <div style={{ color: "#FF9933", fontSize: 20 }}>
            सही उत्तर: अयोध्या
          </div>
        )}

        {phase === "EXPLAIN" && (
          <div style={{ padding: "0 16px", textAlign: "center", color: "#ddd" }}>
            {QUESTION.explanation}
          </div>
        )}
      </div>
    </div>
  );
}
