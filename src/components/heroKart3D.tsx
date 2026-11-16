export function HeroKart3D() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "320px",
        borderRadius: "24px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        border: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="3D kart visualization"
    >
      <div
        style={{
          width: "220px",
          height: "110px",
          borderRadius: "18px 22px 16px 20px",
          background:
            "linear-gradient(120deg, #f7f7f7 0%, #dfe7ee 30%, #b7c4d4 100%)",
          boxShadow: "0 18px 40px rgba(18, 25, 34, 0.35)",
          position: "relative",
          transform: "rotate(-8deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "#121a22",
            bottom: "-18px",
            left: "20px",
            boxShadow: "0 0 0 8px rgba(255,255,255,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "#121a22",
            bottom: "-18px",
            right: "20px",
            boxShadow: "0 0 0 8px rgba(255,255,255,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "18px",
            width: "56%",
            height: "10px",
            transform: "translateX(-50%)",
            borderRadius: "999px",
            background: "rgba(255, 75, 75, 0.9)",
          }}
        />
      </div>
    </div>
  );
}
