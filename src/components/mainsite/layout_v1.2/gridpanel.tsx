// GridPanel.tsx
export default function GridPanel({ title, value, children }: {
  title: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full h-full border rounded-lg p-2 flex flex-col
      bg-[#0f1b2d]
      border border-cyan-400/40
      shadow-[0_0_12px_rgba(56,189,248,0.35)]">
      <div className="text-xs font-semibold text-white border-b border-cyan-400/30 pb-1 mb-2">
        {title}
      </div>

      {/* 内容部分は縦いっぱいに広げる */}
      <div className="text-white flex-1 flex items-center justify-center">
        {value ?? children}
      </div>
    </div>
  );
}
