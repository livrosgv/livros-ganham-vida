// src/components/PreviewMidia.tsx
type MidiaProps = {
  tipo: string;
  link_direto: string;
  link_original: string;
};

export default function PreviewMidia({ tipo, link_direto, link_original }: MidiaProps) {
  return (
    <div className="bg-[#f5f6f8] rounded-lg p-4 w-full max-w-sm">
      <p className="text-sm text-gray-800 mb-2">Tipo: {tipo}</p>

      {tipo === "photo" && (
        <img src={link_direto} alt="imagem" className="w-full rounded-md mb-2" />
      )}

      {tipo === "video" && (
        <video src={link_direto} controls className="w-full rounded-md mb-2" />
      )}

      {tipo === "audio" && (
        <audio src={link_direto} controls className="w-full mb-2" />
      )}

      {tipo === "document" && (
        <a href={link_direto} target="_blank" className="text-blue-600 underline mb-2 block">
          Abrir documento
        </a>
      )}

      <a href={link_original} target="_blank" className="text-xs text-gray-500 underline">
        Ver no Telegram
      </a>
    </div>
  );
}
