
import Link from "next/link"; 

export default function LanguageToggle({
  currentLng,
}: {
  currentLng: string;
}) {

  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      <Link href={`/en`}>English</Link>
      <Link href={`/gu`}>ગુજરાતી</Link>
    </div>
  );
}